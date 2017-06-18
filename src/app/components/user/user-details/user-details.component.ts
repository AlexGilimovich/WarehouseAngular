import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { Warehouse } from '../../warehouse/warehouse';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UserService } from '../user-service.service';
import { User } from '../user';
import { rolesMessages } from '../user.module';
import { WarehouseService } from '../../warehouse/warehouse.service';
import { LoginService } from '../../login/login.service';
import { Observable } from 'rxjs/Rx';
import { Roles } from '../roles';

const ROLE_ADMIN = 'ROLE_ADMIN';
const ROLE_OWNER = 'ROLE_OWNER';
const ROLE_SUPERVISOR = 'ROLE_SUPERVISOR';
const RESPONSE_LOGIN_OCCUPIED = 'LOGIN_OCCUPIED';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private currentUser: User;
  private id: number;
  private rolesMessages = rolesMessages;
  private roles: any[];
  private userForm: FormGroup;
  private warehouseList: Warehouse[];
  private hasRights = true;
  private isLoginCheckRequest = false;
  private showCredentials = true;
  private authenticatedUser: User;

  constructor(private warehouseService: WarehouseService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private location: Location,
              private loginService: LoginService) {
    this.authenticatedUser = this.loginService.getLoggedUser();
    route.params.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    const authenticatedUser: User = this.loginService.getLoggedUser();

    this.createUserForm();

    if (this.id) {
      this.showCredentials = this.id == authenticatedUser.id;

      this.userService.get(this.id).subscribe((currentUser: User) => {
          this.currentUser = currentUser;
          this.getRolesFromServer();


          if (this.authenticatedUser.hasRole(Roles.ROLE_OWNER())) {
            this.getWarehousesOfCompanyFromServer(this.authenticatedUser.warehouseCompany.idWarehouseCompany);
          } else {
            this.getWarehouseFromServer(this.authenticatedUser.warehouse.idWarehouse);
          }
          this.fillForm();
        }, (err: any) => {
          console.error(err);
        }
      );
    } else {
      this.userForm.controls['login'].setValidators([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я0-9]*$/)]);
      this.userForm.controls['login'].setAsyncValidators([this.validateLogin.bind(this)]);
      this.userForm.controls['password'].setValidators([Validators.compose([Validators.required, Validators.minLength(4)])]);
      if (this.authenticatedUser.hasRole(Roles.ROLE_OWNER())) {
        this.getWarehousesOfCompanyFromServer(this.authenticatedUser.warehouseCompany.idWarehouseCompany);
      } else {
        this.getWarehouseFromServer(this.authenticatedUser.warehouse.idWarehouse);
      }
      if (!this.authenticatedUser.hasRole(Roles.ROLE_OWNER()) && this.authenticatedUser.hasRole(Roles.ROLE_SUPERVISOR())) {
        this.userForm.controls['warehouse'].setValue(this.authenticatedUser.warehouse.idWarehouse);
      }
      this.getRolesFromServer();
    }
  }

  private getWarehousesOfCompanyFromServer(warehouseCompanyId: number): void {
    this.warehouseService.getWarehouse(warehouseCompanyId, -1, -1).subscribe(
      (warehouseList: Warehouse[]) => {
        this.warehouseList = warehouseList;
      }, (err: any) => {
        console.error(err);
      }
    );
  }

  private getWarehouseFromServer(warehouseId: number): void {
    this.warehouseService.getWarehouseById(warehouseId).subscribe(
      (warehouseList: Warehouse[]) => {
        this.warehouseList = warehouseList;
      }, (err: any) => {
        console.error(err);
      }
    );
  }


  private createUserForm(): void {
    this.userForm = this.fb.group({
      'lastName': [{
        value: '',
        disabled: !this.hasRights
      }, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я]*$/)])],
      'login': [
        {value: '', disabled: !this.hasRights},
        Validators.compose([Validators.pattern(/^[a-zA-Zа-яА-Я0-9]*$/)]),
        Validators.composeAsync([this.validateLogin.bind(this)])
      ],
      'password': [{value: '', disabled: !this.hasRights}, Validators.compose([Validators.minLength(4)])],
      'firstName': [{
        value: '',
        disabled: !this.hasRights
      }, Validators.compose([Validators.pattern(/^[a-zA-Zа-яА-Я]*$/)])],
      'patronymic': [{
        value: '',
        disabled: !this.hasRights
      }, Validators.compose([Validators.pattern(/^[a-zA-Zа-яА-Я]*$/)])],
      'dateOfBirth': [{value: '', disabled: !this.hasRights}, Validators.compose([dateValidator])],
      'email': [{value: '', disabled: !this.hasRights}, Validators.compose([emailValidator])],
      'city': [{value: '', disabled: !this.hasRights}],
      'street': [{value: '', disabled: !this.hasRights}],
      'house': [{value: '', disabled: !this.hasRights}],
      'apartment': [{value: '', disabled: !this.hasRights}],
      'warehouse': [{value: '', disabled: !this.isOwner()}],
      'roles': new FormArray([], Validators.compose([rolesValidator])),
    });
  }

  private getRolesFromServer(): void {
    this.userService.getRoles().subscribe((res) => {
        this.roles = new Array();
        res.forEach(role => {
            if (this.currentUser && this.currentUser.hasRole(role.role)) {
              this.roles.push({role: role, checked: true});
            } else {
              if (role.role === Roles.ROLE_ADMIN()) {
                if (this.loginService.getLoggedUser().hasRole(Roles.ROLE_ADMIN())) {
                  this.roles.push({role: role, checked: false});
                }
              } else {
                if (role.role === Roles.ROLE_OWNER()) {
                  if (this.loginService.getLoggedUser().hasRole(Roles.ROLE_OWNER())) {
                    this.roles.push({role: role, checked: false});
                  }
                } else {
                  this.roles.push({role: role, checked: false});
                }
              }
            }
          }
        )
        this.addRoleControls();
      },
      err => {
        console.error(err);
      }
    );
  }

  private isSupervisor() {
    const authenticatedUser: User = this.loginService.getLoggedUser();
    return authenticatedUser.hasRole(Roles.ROLE_SUPERVISOR());
  }

  private isOwner() {
    const authenticatedUser: User = this.loginService.getLoggedUser();
    return authenticatedUser.hasRole(Roles.ROLE_OWNER());
  }

  private fillForm(): void {
    this.userForm.controls['lastName'].setValue(this.currentUser.lastName);
    this.userForm.controls['login'].setValue(this.currentUser.login);
    this.userForm.controls['password'].setValue(this.currentUser.password);
    this.userForm.controls['firstName'].setValue(this.currentUser.firstName);
    this.userForm.controls['patronymic'].setValue(this.currentUser.patronymic);
    this.userForm.controls['dateOfBirth'].setValue(this.datePipe.transform(this.currentUser.dateOfBirth, 'dd.MM.yyyy'));
    this.userForm.controls['email'].setValue(this.currentUser.email);
    this.userForm.controls['city'].setValue(this.currentUser.city);
    this.userForm.controls['street'].setValue(this.currentUser.street);
    this.userForm.controls['house'].setValue(this.currentUser.house);
    this.userForm.controls['apartment'].setValue(this.currentUser.apartment);
    if (this.currentUser.warehouse) {
      this.userForm.controls['warehouse'].setValue(this.currentUser.warehouse.idWarehouse);
    }
  }

  private addRoleControls(): void {
    this.roles.forEach((res, index) => {
        (<FormArray>this.userForm.controls['roles']).insert(index, new FormControl({
          value: res.checked, disabled: !this.isSupervisor() && !this.isOwner()
        }));
      }
    )
    ;
  }


  private updateRole(role, event): void {
    role.checked = event.target.checked;
  }


  private save(userForm: FormGroup): void {
    const user: User = new User();
    user.id = this.id;
    user.lastName = userForm.controls['lastName'].value;
    user.login = userForm.controls['login'].value;
    user.password = userForm.controls['password'].value;
    user.firstName = userForm.controls['firstName'].value;
    user.patronymic = userForm.controls['patronymic'].value;
    user.dateOfBirth = userForm.controls['dateOfBirth'].value;
    user.email = userForm.controls['email'].value;
    user.city = userForm.controls['city'].value;
    user.street = userForm.controls['street'].value;
    user.house = userForm.controls['house'].value;
    user.apartment = userForm.controls['apartment'].value;
    user.roles = this.roles.map(
      role => {
        if (role.checked) {
          return role.role;
        }
      }
    ).filter(
      role => {
        return role !== undefined;
      }
    );
    user.warehouse = this.findWarehouseById(userForm.controls['warehouse'].value);
    this.userService.save(user).subscribe(res => {
        if (this.id != undefined) {
          this.router.navigate(['../../list'], {relativeTo: this.route});
        } else {
          this.router.navigate(['../list'], {relativeTo: this.route});
        }
      },
      error => {
        console.error(error);
      }
    );

  }

  private close(): void {
    this.location.back();
  }

  //find warehouse in loaded warehouseList by id
  private findWarehouseById(id: string): Warehouse {
    let warehouse: Warehouse;
    this.warehouseList.forEach(
      (result: Warehouse) => {
        if (id == result.idWarehouse.toString()) {
          warehouse = result;
        }
      })
    return warehouse;
  }


  public validateLogin(c: FormControl) {
    if (!c.value) {
      return Observable.create(
        observer => {
          observer.next();
          observer.complete();
        }
      );
    }
    this.isLoginCheckRequest = true;
    if (this.currentUser) {
      if (this.currentUser.login == c.value) {
        return Observable.create(
          observer => {
            observer.next();
            observer.complete();
          }
        );
      }
    }
    return this.userService.checkLoginNameExists(c.value).map(
      res => {
        this.isLoginCheckRequest = false;
        if (res == RESPONSE_LOGIN_OCCUPIED) {
          return {isOccupied: true};
        } else {
          return;
        }
      }
    );

  }

}

function dateValidator(c: FormControl) {
  if (!c.value) {
    return true;
  }
  const errors: any = {};
  if (!isValidDate(c.value)) {
    errors.invalidFormat = true;
  } else {
    if (inFuture(c.value)) {
      errors.inFuture = true;
    }
  }
  return errors;
}

function inFuture(strDate) {
  let dateParts = strDate.split(".");
  let composedDate = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
  composedDate.getDate() == dateParts[0] &&
  composedDate.getMonth() == (dateParts[1] - 1) &&
  composedDate.getFullYear() == dateParts[2];
  return composedDate > new Date();
}

function isValidDate(strDate) {
  if (!strDate.match(/^\d{2}.\d{2}.\d{4}$/)) return false;
  var dateParts = strDate.split(".");
  var composedDate = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
  return composedDate.getDate() == dateParts[0] &&
    composedDate.getMonth() == (dateParts[1] - 1) &&
    composedDate.getFullYear() == dateParts[2];
}

function emailValidator(c: FormControl) {
  if (!c.value) {
    return true;
  }
  const errors: any = {};
  if (!c.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errors.invalid = true;
  }
  return errors;
}


function rolesValidator(array: FormArray) {
  const errors: any = {};
  let hasRole = false;

  array.controls.forEach(
    item => {
      if (item.value) {
        hasRole = true;
      }
    }
  )
  if (!hasRole) {
    errors.noRole = true;
  }
  return errors;
}







