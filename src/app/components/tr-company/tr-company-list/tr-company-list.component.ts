import { Component, OnInit } from '@angular/core';
import {TransportCompanyService} from "../tr-company.service";
import {TransportCompany} from "../tr-company";

@Component({
  selector: 'app-tr-company-list',
  templateUrl: './tr-company-list.component.html',
  styleUrls: ['./tr-company-list.component.scss'],
  providers: [TransportCompanyService]
})
export class TransportCompanyListComponent implements OnInit {
  companies: TransportCompany[] = [];

  constructor(private transportService: TransportCompanyService) { }

  ngOnInit() {
    this.transportService.getAll().subscribe(data => {
      this.companies = data;
    });
  }

  delete(company: TransportCompany) {
    this.transportService.delete(company.id).subscribe(success => {
      this.companies = this.transportService.removeCompanyFromArray(this.companies, company);
    });
  }

}
