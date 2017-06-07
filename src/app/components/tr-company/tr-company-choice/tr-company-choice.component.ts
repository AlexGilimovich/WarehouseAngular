import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TransportCompany} from "../tr-company";
import {TransportCompanyService} from "../tr-company.service";

@Component({
  selector: 'app-tr-company-choice',
  templateUrl: './tr-company-choice.component.html',
  styleUrls: ['./tr-company-choice.component.scss'],
  providers: [TransportCompanyService]
})
export class TransportCompanyChoiceComponent implements OnInit {
  companies: TransportCompany[];
  chosenCompany: TransportCompany;
  maySearch: boolean;
  @Output('company') company = new EventEmitter<TransportCompany>();

  constructor(private transportService: TransportCompanyService) {
    this.maySearch = true;
  }

  ngOnInit() {
    this.transportService.getAll().subscribe(data => {
      this.companies = data;
    });
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
    this.company.emit(this.chosenCompany);
  }

  private forbidSearching() {
    this.maySearch = false;
    setTimeout(() => {
      this.maySearch = true;
    }, 1000);
  }

}
