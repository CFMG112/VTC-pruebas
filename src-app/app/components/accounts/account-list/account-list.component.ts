import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { PreferencesService } from '@services/preferences.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  displayAccounts: any[];
  display: boolean;
  confirm: string;
  account: any;
  filter: any;
  total: number;
  rows: number;
  page: number;
  expiration: number;
  expirationFilters = [
    { label: 'All accounts', value: null },
    { label: 'Expired Accounts', value: 3 },
    { label: 'Next to Expire', value: 2 },
    { label: 'Not Next to Expire', value: 1 }
  ]
  searchFilterDelay: any;
  lang: any;

  constructor(
    private dataService: DataService,
    private preferencesService: PreferencesService
  ) { }

  ngOnInit() {

    this.lang = this.preferencesService.getLanguage() || {};

    if (this.lang.locale == 'es') {
      this.expirationFilters = [
        { label: 'Todas las Cuentas', value: null },
        { label: 'Cuentas Expiradas', value: 3 },
        { label: 'Cuentas por Expirar', value: 2 },
        { label: 'Cuentas sin Expirar', value: 1 }
      ]
    } else {
      this.expirationFilters = [
        { label: 'All Accounts', value: null },
        { label: 'Expired Accounts', value: 3 },
        { label: 'Next to Expire', value: 2 },
        { label: 'Not Next to Expire', value: 1 }
      ]
    }

    this.rows = 20;
    this.page = 0;
    this.onFindAccounts({
      skip: 0,
      limit: this.rows
    });
  }

  onRefresh() {
    this.onFilter();
  }

  onFindAccounts(params: Object) {
    this.dataService.findByFilter('/accounts/action/filter/', params).then(res => {
      this.total = res.total;
      this.displayAccounts = res.data;
    });
  }

  onDeleteDialog(account: any) {
    this.account = account;
    this.display = true;
  }

  delete(id: String) {
    this.dataService.deleteOne('/accounts', id).then(data => {
      this.onFindAccounts({})
      this.display = false;
    });
  }

  onFilter() {
    clearTimeout(this.searchFilterDelay);
    this.searchFilterDelay = setTimeout(() => {
      this.onFindAccounts({
        expiration: this.expiration,
        name: this.filter,
        sector: this.filter,
        country: this.filter,
        countryCode: this.filter,
        skip: this.page,
        limit: this.rows
      });
    }, 500);
  }

  onPaginate(event) {
    this.page = event.page;
    this.rows = event.rows;
    this.onFindAccounts({
      expiration: this.expiration,
      name: this.filter,
      sector: this.filter,
      country: this.filter,
      countryCode: this.filter,
      skip: event.first,
      limit: this.rows
    });
  }

  getPaginatorTitle() {
    return this.lang && this.lang.locale == 'es' ? `${this.displayAccounts.length} de ${this.total} entradas` : `${this.displayAccounts.length} of ${this.total} entries`
  }
}
