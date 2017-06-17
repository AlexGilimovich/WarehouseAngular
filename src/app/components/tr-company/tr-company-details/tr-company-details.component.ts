import { Component, OnInit } from '@angular/core';
import {TransportCompanyService} from "../tr-company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-tr-company-details',
  templateUrl: './tr-company-details.component.html',
  styleUrls: ['./tr-company-details.component.scss'],
  providers: [TransportCompanyService]
})
export class TransportCompanyDetailsComponent implements OnInit {
  companyForm: FormGroup;
  id: number;

  constructor(private transportService: TransportCompanyService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private location: Location) {
    this.companyForm = this.formBuilder.group({
      'isTrusted': '',
      'name': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.id = this.transportService.parseIdParam(this.route);
    let company;
    this.transportService.getById(this.id).subscribe(data => {
      company = data;
      this.companyForm.controls['name'].setValue(company.name);
      this.companyForm.controls['isTrusted'].setValue(company.isTrusted);
    });
  }

  onSubmit(companyForm: FormGroup) {
    const company = this.transportService.mapCompanyFromForm(companyForm, this.id);
    this.transportService.update(company).subscribe(success => {
      this.location.back();
    });
  }

}
