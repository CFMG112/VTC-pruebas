import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  display: boolean;
  confirm: string;
  user: any;
  accountId: string;
  users: any[];
  filter: any;
  searchFilterDelay: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.accountId = this.route.snapshot.parent.parent.paramMap.get('id');
    this.onFind();
  }

  onFind() {
    this.onFindUsers({
      'accountId': this.accountId
    });
  }

  onFindUsers(params?: any) {
    this.dataService.findByFilter('/users/action/filter/', params).then(res => {
      this.users = res.data;
    });
  }

  onDeleteDialog(user: any) {
    this.user = user;
    this.display = true;
  }
  
  delete(id: String) {
    this.dataService.deleteOne('/users', id).then(data => {
      this.onFind();
      this.display = false;
    });
  }

  onFilter() {
    clearTimeout(this.searchFilterDelay);
    this.searchFilterDelay = setTimeout(() => {
      this.onFindUsers({
        accountId: this.accountId,
        name: this.filter,
        username: this.filter,
        firstName: this.filter,
        lastName: this.filter,
      });
    }, 500);
  }

}
