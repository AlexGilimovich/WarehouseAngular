import { Component, OnInit } from '@angular/core';
import {TransportCompany} from "../tr-company";
import {TransportCompanyService} from "../tr-company.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

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
              private formBuilder: FormBuilder) {
    this.companyForm = formBuilder.group({
      'isTrusted': '',
      'name': ['']
    });
    this.companyForm.controls['isTrusted'].setValue(false);
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    const company = this.transportService.mapCompanyFromForm(form);
    console.log(company);
    this.transportService.save(company).subscribe(data => {
      this.router.navigateByUrl('tr-company');
    });
  }

}
