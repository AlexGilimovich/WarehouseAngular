import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../user/user";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginName:string;
  private password:string;
  private rememberMe:boolean=false;
  private showError:boolean = false;

  constructor(private loginService:LoginService,
              private router:Router,
              private route:ActivatedRoute) {
  }


  private logIn() {
    this.loginService.login(this.loginName, this.password, this.rememberMe).subscribe(
      res=> {
        this.navigate(res.role);
      },
      error=> {
        this.showError = true;
      }
    );

  }

  private navigate(role:string):void {
    switch (role) {
      case "ROLE_MANAGER":
        this.router.navigate(['../manager'], {
          relativeTo: this.route
        });
        break;
      //todo
      default:
        this.router.navigate(['../manager'], {
          relativeTo: this.route
        });
        break;
    }
  }

  ngOnInit() {
  }

  private resetError() {
    this.showError = false;
  }

}
