import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TransportCompany} from "../tr-company";
import {TransportCompanyService} from "../tr-company.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tr-company-choice',
  templateUrl: './tr-company-choice.component.html',
  styleUrls: ['./tr-company-choice.component.scss'],
  providers: [TransportCompanyService]
})
export class TransportCompanyChoiceComponent implements OnInit, OnDestroy{
  companies: TransportCompany[];
  chosenCompany: TransportCompany;
  maySearch: boolean;
  @Output('company') company = new EventEmitter<TransportCompany>();
  @Output('close') closingEvent = new EventEmitter<void>();

  constructor(private transportService: TransportCompanyService,
              private router: Router,
              private route: ActivatedRoute) {
    this.maySearch = true;
  }

  ngOnInit() {
    this.transportService.getAll().subscribe(data => {
      this.companies = data;
    });
  }

  ngOnDestroy() {
    this.companies = [];
  }

  refreshCompanies(searchParams: string) {
    if (this.maySearch) {
      this.forbidSearching();
      this.transportService.search(searchParams).subscribe(data => {
        this.companies = data;
      });
    }
  }

  onCompanyChosen(company: TransportCompany) {
    this.chosenCompany = company;
  }

  saveCompany() {
    if (this.chosenCompany != null) {
      this.company.emit(this.chosenCompany);
      this.chosenCompany = null;
    }
  }

  createCompany() {
    this.closingEvent.emit();
    this.router.navigate(['../../../transportCompanies/new'], {relativeTo: this.route});
  }

  private forbidSearching() {
    this.maySearch = false;
    setTimeout(() => {
      this.maySearch = true;
    }, 1000);
  }

}
