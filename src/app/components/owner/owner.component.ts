import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {LoginService} from "../login/login.service";
declare var $:any;

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OwnerComponent implements OnInit {

  private currentPage:string = 'company';

  constructor(private router:Router,
              private route:ActivatedRoute,
              private loginService:LoginService) {

  }

  ngOnInit() {
    $("body").foundation();
  }

  private navigateToPage(page:string) {
    switch (page) {
      case 'company':
        this.router.navigate(['./company'], {
          relativeTo: this.route
        });
        this.currentPage = 'company';
        break;
      case 'report':
        this.router.navigate(['./report'], {
          relativeTo: this.route
        });
        this.currentPage = 'report';
        break;
      default:
        break;
    }

  }

}
