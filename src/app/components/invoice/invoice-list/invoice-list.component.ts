import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  currentPage: string;

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.currentPage = 'incoming';
    this.navigateToPage(this.currentPage);
  }

  ngOnInit() {
  }

  navigateToPage(page: string) {
    switch (page) {
      case 'incoming':
        this.navigateToIncoming();
        break;
      case 'outgoing':
        this.navigateToOutgoing();
        break;
      default:
        this.navigateToIncoming();
        break;
    }
  }

  private navigateToIncoming() {
    this.router.navigate(['./incoming'], {
      relativeTo: this.route
    });
    this.currentPage = 'incoming';
  }

  private navigateToOutgoing() {
    this.router.navigate(['./outgoing'], {
      relativeTo: this.route
    });
    this.currentPage = 'outgoing';
  }

}
