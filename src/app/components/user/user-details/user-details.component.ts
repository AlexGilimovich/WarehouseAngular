import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Warehouse} from "../../warehouse/warehouse";
import {ActivatedRoute, Router} from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import {UserService} from "../user-service.service";
import {User} from "../user";
import {rolesMessages} from "../user.module";
import {WarehouseService} from "../../warehouse/warehouse.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private currentUser:User;
  private id:number;
  private rolesMessages = rolesMessages;
  private roles:any[];
  private userForm:FormGroup;
  private warehouseList:Warehouse[];

  constructor(private warehouseService:WarehouseService,
              private userService:UserService,
              private router:Router,
              private route:ActivatedRoute,
              private fb:FormBuilder,
              private datePipe:DatePipe,
              private user:User) {
    route.params.subscribe(params => {
      this.id = params['id'];
    });

  }


  ngOnInit() {
    this.userForm = this.fb.group({
      "lastName": ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я]*$/)])],
      "login": ['', Validators.compose([Validators.pattern(/^[a-zA-Zа-я0-9]*$/)])],
      "password": ['', Validators.compose([Validators.minLength(5)])],
      "firstName": ['', Validators.compose([Validators.pattern(/^[a-zA-Zа-яА-Я]*$/)])],
      "patronymic": ['', Validators.compose([Validators.pattern(/^[a-zA-Zа-яА-Я]*$/)])],
      "dateOfBirth": ['', Validators.compose([dateValidator])],
      "email": ['', Validators.compose([emailValidator])],
      "city": [''],
      "street": [''],
      "house": [''],
      "apartment": [''],
      "warehouse": [''],
      "roles":new FormArray([],Validators.compose([rolesValidator]))
    });

    if (this.id != undefined) {
      this.userService.get(this.id).subscribe(
        (currentUser:User) => {
          this.currentUser = currentUser;
          this.userService.getRoles().subscribe(
            //check roles on form
            (res) => {
              this.roles = new Array();
              res.forEach(
                role=> {
                  if (this.currentUser.hasRole(role)) {
                    this.roles.push({role: role, checked: true});
                  } else {
                    this.roles.push({role: role, checked: false});
                  }
                }
              )
              this.addRoleControls();
            },
            (err)=> {
              console.error(err);
            }
          );
          //list warehouses on form
          this.warehouseService.getWarehouse(this.user.warehouse.warehouseCompany.idWarehouseCompany).subscribe(
            (warehouseList:Warehouse[]) => {
              this.warehouseList = warehouseList;
              this.userForm.controls['warehouse'].setValue(this.currentUser.warehouse.idWarehouse.toString());
            },
            (err:any) => {
              console.log(err);
            }
          );
          this.fillForm();
        },
        (err:any) => {
          console.log(err);
        }
      );
    } else {
      this.userForm.controls['login'].setValidators([Validators.compose([Validators.required]), Validators.pattern(/^[a-zA-Zа-яА-Я0-9]*$/)]);
      this.userForm.controls['password'].setValidators([Validators.compose([Validators.required, Validators.minLength(5)])]);
      this.warehouseService.getWarehouse(this.user.warehouse.warehouseCompany.idWarehouseCompany).subscribe(
        (warehouseList:Warehouse[]) => {
          this.warehouseList = warehouseList;
        },
        (err:any) => {
          console.log(err);
        }
      );
      this.userService.getRoles().subscribe(
        (res) => {
          this.roles = new Array();
          res.forEach(
            role=> {
              this.roles.push({role: role, checked: false});
            }
          )
          this.addRoleControls();
        },
        (err)=> {
          console.error(err);
        }
      );
    }
  }


  private fillForm():void {
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
  }

  private addRoleControls():void {
    this.roles.forEach(
      (res,index)=>{
        (<FormArray>this.userForm.controls['roles']).insert(index, new FormControl(res.checked));
      }
    )
  }


  private updateRole(role, event):void {
    role.checked = event.target.checked;
  }


  private save(userForm:FormGroup):void {
    let user:User = new User();
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
      role=> {
        if (role.checked)
          return role.role;
      }
    ).filter(
      role=> {
        return role !== undefined;
      }
    );
    user.warehouse = this.findWarehouseById(userForm.controls['warehouse'].value);
    this.userService.save(user).subscribe(res=>{
        if (this.id != undefined)
          this.router.navigate(['../../list'], {relativeTo: this.route});//todo refresh page
        else
          this.router.navigate(['../list'], {relativeTo: this.route});
    }
    )

  }

  private close():void {
    if (this.id != undefined)
      this.router.navigate(['../../list'], {relativeTo: this.route});
    else
      this.router.navigate(['../list'], {relativeTo: this.route});
  }

  //find warehouse in loaded warehouseList by id
  private findWarehouseById(id:string):Warehouse {
    let warehouse:Warehouse;
    this.warehouseList.forEach(
      (result:Warehouse)=> {
        if (id == result.idWarehouse.toString())
          warehouse = result;
      })
    return warehouse;
  }
}

function dateValidator(c:FormControl) {
  if (!c.value) {
    return true;
  }
  let errors:any = {};
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
  var dateParts = strDate.split(".");
  var composedDate = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
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

function emailValidator(c:FormControl) {
  if (!c.value) {
    return true;
  }
  let errors:any = {};
  if (!c.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errors.invalid = true;
  }
  return errors;
}


function rolesValidator(array:FormArray) {
  let errors:any = {};
  let hasRole:boolean = false;

  array.controls.forEach(
    item=> {
      if (item.value)
        hasRole = true;
    }
  )
  if (!hasRole) {
    errors.noRole = true;
  }
  return errors;
}
