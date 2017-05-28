import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {LoginService} from "./login.service";
import {Role} from "../user/role";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginName:string;
  private password:string;
  private rememberMe:boolean = false;
  private showError:boolean = false;

  constructor(private loginService:LoginService,
              private router:Router,
              private route:ActivatedRoute) {
  }


  private logIn() {
    this.loginService.login(this.loginName, this.password, this.rememberMe).subscribe(
      res=> {
        this.navigate(res.role);
        // this.navigate('ROLE_MANAGER');

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
      case "ROLE_OWNER":
        this.router.navigate(['../owner'], {
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
    let role:Role = this.loginService.checkLocalStorage();
    if (role) {
      this.navigate(role.role);
    }
  }

  private resetError() {
    this.showError = false;
  }

  private goBack() {
    this.router.navigate(['../index'], {
      relativeTo: this.route
    });
  }

}
