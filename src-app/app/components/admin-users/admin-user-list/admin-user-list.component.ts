import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { PreferencesService } from '@app/services/preferences.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  display: boolean;
  confirm: string;
  user: any;
  users: any[];
  filter: any;
  total: number;
  rows: number;
  page: number;

  selectedAccount: any;
  selectedRole: any;
  searchFilterDelay: any;
  lang = {
    'id': 1,
    'name': "english",
    'locale': "en"
  }
  roles: any;
  acountsFilterTitle: any;
  constructor(
    private dataService: DataService,
    private preferencesService: PreferencesService
  ) { }

  ngOnInit() {
    this.lang = this.preferencesService.getLanguage();

    this.rows = 20;
    this.page = 0;
    this.onFindUsers();
  }



  onFindUsers(params?: any) {
    this.dataService.findByFilter('/users', params).then(res => {
      this.total = res.length;
      this.users = res;
    });
  }

  onDeleteDialog(user: any) {
    this.user = user;
    this.display = true;
  }

  delete(id: String) {
    this.dataService.deleteOne('/users', id).then(data => {
      this.onFindUsers();
      this.display = false;
      this.confirm = "";

    });
  }

  onFilter() {
    clearTimeout(this.searchFilterDelay);
    this.searchFilterDelay = setTimeout(() => {
      this.dataService.findByFilter('/users/filter', { fullname: this.filter, email: this.filter }).then(res => {
        this.total = res.length;
        this.users = res;
        console.log(res);
      });
    }, 500);
  }

  onPaginate(event) {
    this.page = event.page;
    this.rows = event.rows;
    this.onFindUsers({});
  }



  getPaginatorTitle() {
    return this.lang && this.lang.locale == 'es' ? `${this.users.length} de ${this.total} entradas` : `${this.users.length} of ${this.total} entries`
  }
}
