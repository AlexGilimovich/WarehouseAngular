import { Component, OnInit } from '@angular/core';
import {TransportCompanyService} from "../tr-company.service";
import {TransportCompany} from "../tr-company";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tr-company-list',
  templateUrl: './tr-company-list.component.html',
  styleUrls: ['./tr-company-list.component.scss'],
  providers: [TransportCompanyService]
})
export class TransportCompanyListComponent implements OnInit {
  companies: TransportCompany[] = [];

  constructor(private transportService: TransportCompanyService,
              private router: Router) { }

  ngOnInit() {
    this.transportService.getAll().subscribe(data => {
      this.companies = data;
    });
  }

  goToDetails(id: number) {
    if (id != null) {
      this.router.navigateByUrl('tr-company/' + id);
    }
  }

  createCompany() {
    this.router.navigateByUrl('tr-company/new');
  }

  delete(company: TransportCompany) {
    this.transportService.delete(company.id).subscribe(success => {
      this.companies = this.transportService.removeCompanyFromArray(this.companies, company);
    });
  }

}
