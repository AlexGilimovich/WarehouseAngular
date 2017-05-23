import {Component, OnInit} from '@angular/core';
import {User} from "../user/user";
import {LoginService} from "../login/login.service";
import {Router, ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private user:User;

  constructor(private loginService:LoginService,
              private router:Router,
              private route:ActivatedRoute) {
    this.user = this.loginService.getLoggedUser();
  }

  ngOnInit() {
  }

  private logout():void {
    this.loginService.logout(this.loginService.getLoggedUser()).subscribe(
      res=> {
        this.router.navigateByUrl('/index');
      },
      error=> {

      }
    )
  }

  private goToUserDetails() {
    this.router.navigate(['./user/details', this.loginService.getLoggedUser().id], {relativeTo: this.route});

  }

}
