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
  constructor(private user:User,
              private loginService:LoginService,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit() {
  }

  private logout():void {
    this.loginService.logout(this.user).subscribe(
      res=>{
        this.router.navigateByUrl('/index');
      },
      error=>{
        
      }
    )
  }

  private goToUserDetails() {
    this.router.navigate(['./user/details', this.user.id], {relativeTo: this.route});

  }

}
