import { Component, OnInit } from '@angular/core';
import {TransportCompany} from "../tr-company";
import {TransportCompanyService} from "../tr-company.service";

@Component({
  selector: 'app-tr-company-create',
  templateUrl: './tr-company-create.component.html',
  styleUrls: ['./tr-company-create.component.scss'],
  providers: [TransportCompanyService]
})
export class TransportCompanyCreateComponent implements OnInit {
  company = new TransportCompany;

  constructor(private transportService: TransportCompanyService) {
    this.company.isTrusted = false;
  }

  ngOnInit() {
  }

  onSubmit(company: TransportCompany) {
    this.transportService.save(company).subscribe(data => {
      console.log(data);
    });
  }

}
