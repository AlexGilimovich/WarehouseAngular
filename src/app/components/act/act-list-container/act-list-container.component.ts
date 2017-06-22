import { Component, OnInit } from '@angular/core';
import { ActTypeName } from '../actTypeName';
import { ActService } from '../act.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { Roles } from '../../user/roles';
import { User } from '../../user/user';

declare var $;

@Component({
  selector: 'app-act-list-container',
  templateUrl: './act-list-container.component.html',
  styleUrls: ['./act-list-container.component.scss']
})
export class ActListContainerComponent implements OnInit {
  private actTypeNames: ActTypeName[];
  private showCreateButton = true;
  private authenticatedUser: User;

  constructor(private actService: ActService,
              private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute) {
    this.authenticatedUser = loginService.getLoggedUser();
    if (this.authenticatedUser.hasRole(Roles.ROLE_SUPERVISOR())) {
      this.showCreateButton = false;
    }
  }

  ngOnInit() {
    this.initFoundation();
    this.actService.getActTypes().subscribe((res) => {
        this.actTypeNames = res;
      }, (err) => {
        console.error(err);
      }
    );
  }

  private goToCreate() {
    this.router.navigate(['../create', this.loginService.getLoggedUser().warehouse.idWarehouse], {relativeTo: this.route});
  }

  private initFoundation(): void {
    $('#accordion').foundation();
  }

}
