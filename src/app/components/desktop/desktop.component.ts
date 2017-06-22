import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { User } from '../user/user';
import { Presets } from '../settings/PRESETS';
import { Preset } from '../settings/preset';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

declare var $: any;

const ROLE_ADMIN = 'ROLE_ADMIN';
const ROLE_OWNER = 'ROLE_OWNER';
const ROLE_SUPERVISOR = 'ROLE_SUPERVISOR';
const ROLE_MANAGER = 'ROLE_MANAGER';
const ROLE_DISPATCHER = 'ROLE_DISPATCHER';
const ROLE_CONTROLLER = 'ROLE_CONTROLLER';
const PRESET_LIGHT = 'preset-light';
const PRESET_DARK = 'preset-dark';


@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesktopComponent implements OnInit {

  private currentPage = 'users';
  private user: User;
  private selectedPresetId: number;
  private presets: Preset[] = Presets.list();
  private presetSubscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private settingsService: SettingsService,
              private loginService: LoginService) {

    this.user = loginService.getLoggedUser();
    this.currentPage = this.getHomePage();
    this.navigateToPage(this.currentPage);
    this.presetSubscription = this.settingsService.selectedPresetId$.subscribe((presetId: number) => {
      this.updatePreset(presetId);
    });
  }

  ngOnInit() {
    const authenticatedUser: User = this.loginService.getLoggedUser();
    this.selectedPresetId = authenticatedUser.presetId;
  }

  private updatePreset(presetId: number): void {
    this.selectedPresetId = presetId;
  }

  private getHomePage(): string {
    if (this.user.hasRole(ROLE_ADMIN)) {
      return 'serviceUsers';
    }
    if (this.user.hasRole(ROLE_OWNER)) {
      return 'warehouses';
    }
    if (this.user.hasRole(ROLE_SUPERVISOR)) {
      return 'warehouse';
    }
    if (this.user.hasRole(ROLE_MANAGER)) {
      return 'warehouse';
    }
    if (this.user.hasRole(ROLE_CONTROLLER)) {
      return 'invoices';
    }
    if (this.user.hasRole(ROLE_DISPATCHER)) {
      return 'invoices';
    }
  }


  private hasAnyRole(...roles: string[]): boolean {
    let hasRole = false;
    roles.forEach(
      item => {
        if (this.user.hasRole(item)) {
          hasRole = true;
        }
      }
    );
    return hasRole;
  }


  private navigateToPage(page: string) {
    switch (page) {
      case 'users':
        this.router.navigate(['./users'], {relativeTo: this.route});
        this.currentPage = 'users';
        break;
      case 'companiesPrices':
        this.router.navigate(['./companiesPrices'], {relativeTo: this.route});
        this.currentPage = 'companiesPrices';
        break;
      case 'goods':
        this.router.navigate(['./goods'], {relativeTo: this.route});
        this.currentPage = 'goods';
        break;
      case 'acts':
        this.router.navigate(['./acts'], {relativeTo: this.route});
        this.currentPage = 'acts';
        break;
      case 'invoices':
        this.router.navigate(['./invoices'], {relativeTo: this.route});
        this.currentPage = 'invoices';
        break;
      case 'warehouses':
        this.router.navigate(['./warehousecompany', this.loginService.getLoggedUser().warehouseCompany.idWarehouseCompany, 'warehouse'], {
          relativeTo: this.route
        });
        this.currentPage = 'warehouses';
        break;
      case 'customers':
        this.router.navigate(['./customers'], {relativeTo: this.route});
        this.currentPage = 'customers';
        break;
      case 'reports':
        this.router.navigate(['./reports'], {relativeTo: this.route});
        this.currentPage = 'reports';
        break;
      case 'finances':
        this.router.navigate(['./finances'], {relativeTo: this.route});
        this.currentPage = 'finances';
        break;
      case 'warehouse':
        this.router.navigate(['./warehousecompany', this.loginService.getLoggedUser().warehouse.warehouseCompany.idWarehouseCompany, 'warehouse', this.loginService.getLoggedUser().warehouse.idWarehouse, 'scheme'], {relativeTo: this.route});
        this.currentPage = 'warehouse';
        break;
      case 'adminReports':
        this.router.navigate(['./adminReports'], {relativeTo: this.route});
        this.currentPage = 'adminReports';
        break;
      case 'serviceUsers':
        this.router.navigate(['./serviceUsers'], {relativeTo: this.route});
        this.currentPage = 'serviceUsers';
        break;
      case 'transportCompanies':
        this.router.navigate(['./transportCompanies'], {relativeTo: this.route});
        this.currentPage = 'transportCompanies';
        break;
      case 'emails':
        this.router.navigate(['./emails'], {relativeTo: this.route});
        this.currentPage = 'emails';
        break;
      case 'settings':
        this.router.navigate(['./settings'], {relativeTo: this.route});
        this.currentPage = 'settings';
        break;
      default:
        break;
    }

  }
}
