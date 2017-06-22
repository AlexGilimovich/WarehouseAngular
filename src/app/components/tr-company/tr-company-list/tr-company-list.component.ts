import { Component, OnInit } from '@angular/core';
import {TransportCompanyService} from "../tr-company.service";
import {TransportCompany} from "../tr-company";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tr-company-list',
  templateUrl: './tr-company-list.component.html',
  styleUrls: ['./tr-company-list.component.scss'],
  providers: [TransportCompanyService]
})
export class TransportCompanyListComponent implements OnInit {
  companies: TransportCompany[] = [];

  constructor(private transportService: TransportCompanyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.transportService.getAll().subscribe(data => {
      this.companies = data;
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['../', id], {relativeTo: this.route});
  }

  createCompany() {
    this.router.navigate(['../new'], {relativeTo: this.route});
  }

  delete(company: TransportCompany) {
    this.transportService.delete(company.id).subscribe(success => {
      this.companies = this.transportService.removeCompanyFromArray(this.companies, company);
    });
  }

}
