import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { SecurityService } from '@app/services/security.service';
import { Router } from '@angular/router';
import { PreferencesService } from '@app/services/preferences.service';

@Component({
  selector: 'app-next-maintences',
  templateUrl: './next-maintences.component.html',
  styleUrls: ['./next-maintences.component.css']
})
export class NextMaintencesComponent implements OnInit {

  constructor(private dataService: DataService, private securityService: SecurityService, private router: Router, private preferencesService: PreferencesService) { }

  display: boolean;
  confirm: string;
  maintence: any;
  maintences: any[];
  filter: any;
  total: number;
  rows: number;
  page: number;
  accounts: any[];
  selectedAccount: any;
  isAdmin = false;
  accountId: any;
  lang: any;
  acountsFilterTitle: any;
  searchFilterDelay: any;

  ngOnInit() {
    this.lang = this.preferencesService.getLanguage();

    if (this.lang && this.lang.locale == 'es')
      this.acountsFilterTitle = "Todas las cuentas"

    else
      this.acountsFilterTitle = "All Accounts"

    if (this.securityService.getCurrentUserRoles() === 'admin' || this.securityService.getCurrentUserRoles() === 'vtc') {
      this.isAdmin = true;
    }
    this.accountId = this.securityService.getAccountId();
    this.rows = 20;
    this.page = 0;
    this.onFindMaintences({
      skip: 0,
      limit: this.rows
    });

  }

  onFindMaintences(params?: any) {

    this.dataService.find('maintences/transformers-maintences/catalog', {}).then(res => {
      this.total = res.length;
      console.log(res);
      let offsetWithEST = -5-this.getTimezoneOffsetInHours();
      res.sort((a: any, b: any) => {
        return a.expirationDate.getTime() - b.expirationDate.getTime();

      });
      res.forEach(m => {
        m.expirationDate = new Date(
          new Date(m.expirationDate).valueOf() + offsetWithEST * 3600000)
          .toISOString() // To EST
      });
      this.maintences = res;
      console.log(this.maintences);
    });

  }

  onFindAccounts(params?: any) {
    this.dataService.findByFilter('/accounts/action/filter/', params).then(res => {
      this.accounts = res.data.map(item => {
        return { label: item.name, value: item._id };
      });
      this.accounts.unshift({ label: this.acountsFilterTitle });
    });
  }

  onFilter() {
    clearTimeout(this.searchFilterDelay);
    this.searchFilterDelay = setTimeout(() => {
      this.onFindMaintences({
        accountId: this.selectedAccount,
        skip: this.page,
        limit: this.rows
      });
    }, 500);
  }

  onPaginate(event) {
    this.page = event.page;
    this.rows = event.rows;
    this.onFindMaintences({
      skip: event.first,
      limit: this.rows
    });

  }

  onChange(maintence) {
    console.log(maintence);

    this.dataService.updateOne('maintences/transformers-maintences', maintence.id, maintence).then(res => {
      
    });
  }


  navigate(accountId, transformerId) {
    this.router.navigateByUrl('/accounts/detail/' + accountId + '/transformers/transformer/' + transformerId);
  }
  
  getTimezoneOffsetInHours() {
    return -(new Date().getTimezoneOffset()) / 60;
  }

  getPaginatorTitle() {
    return this.lang && this.lang.locale == 'es' ? `${this.maintences.length} de ${this.total} entradas` : `${this.maintences.length} of ${this.total} entries`
  }


}
