import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  goToDesktop(): void {
    this.router.navigate(['../desktop'], {
      relativeTo: this.route
    });
  }

  ngOnInit() {
  }

}
