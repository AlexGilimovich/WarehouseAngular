import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {LoginService} from "./login.service";
import {Role} from "../user/role";
import {User} from "../user/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginName:string;
  private password:string;
  private rememberMe:boolean = false;
  private errors = {serverNotAvailableError: false, invalidCredentialsError: false};
  private requestInProgress = false;

  constructor(private loginService:LoginService,
              private router:Router,
              private route:ActivatedRoute) {
  }


  private logIn() {
    this.requestInProgress = true;
    this.loginService.login(this.loginName, this.password, this.rememberMe).subscribe(
      res=> {
        this.requestInProgress = false;
        this.navigate(res);
      },
      error=> {
        this.requestInProgress = false;
        if (error.status == 401)
          this.errors = {serverNotAvailableError: false, invalidCredentialsError: true};
        else if (error.status == 0)
          this.errors = {serverNotAvailableError: true, invalidCredentialsError: false};
      }
    );

  }

  private navigate(roles:Role[]):void {
    this.router.navigate(['../desktop'], {
      relativeTo: this.route
    });

  }

  ngOnInit() {
    let user:User = this.loginService.checkLocalStorage();
    if (user) {
      this.requestInProgress = true;
      this.loginService.login(user.login, user.password, true).subscribe(
        res=> {
          this.requestInProgress = false;
          this.navigate(user.roles);

        },
        error=> {
          this.requestInProgress = false;
          if (error.status == 401)
            this.errors = {serverNotAvailableError: false, invalidCredentialsError: true};
          else if (error.status == 0)
            this.errors = {serverNotAvailableError: true, invalidCredentialsError: false};
        }
      );


    }
  }

  private resetError() {
    this.errors = {serverNotAvailableError: false, invalidCredentialsError: false};
  }

  private goBack() {
    this.router.navigate(['../index'], {
      relativeTo: this.route
    });
  }

}
