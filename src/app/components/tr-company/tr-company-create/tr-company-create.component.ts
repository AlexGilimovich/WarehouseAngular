import { Component, OnInit } from '@angular/core';
import {TransportCompany} from "../tr-company";
import {TransportCompanyService} from "../tr-company.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-tr-company-create',
  templateUrl: './tr-company-create.component.html',
  styleUrls: ['./tr-company-create.component.scss'],
  providers: [TransportCompanyService]
})
export class TransportCompanyCreateComponent implements OnInit {
  companyForm: FormGroup;

  constructor(private transportService: TransportCompanyService,
              private router: Router,
              private formBuilder: FormBuilder,
              private location: Location) {
    this.companyForm = formBuilder.group({
      'isTrusted': '',
      'name': ['', Validators.compose([Validators.required])]
    });
    this.companyForm.controls['isTrusted'].setValue(false);
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    const company = this.transportService.mapCompanyFromForm(form);
    this.transportService.save(company).subscribe(data => {
      this.location.back();
    });
  }

}
