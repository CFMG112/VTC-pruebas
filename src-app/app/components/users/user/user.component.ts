import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';
import { MessageService } from 'primeng/api';
import { SecurityService } from '@app/services/security.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any;
  userId: string;
  accountId: string;
  action: string;
  adminPermissions: boolean;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: MessageService,
    private auth: SecurityService,
  ) { }

  ngOnInit() {
    this.adminPermissions = this.auth.hasPermisions(['admin']);

    this.auth.getAccount().then(data => {

      if (data) {
        this.accountId = data.id
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(e => {
      console.log(e.message)
    })

    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.action = 'edit';
      this.findUser();
    } else {
      this.action = 'create';
      this.user = {};
    }
  }

  findUser() {
    this.dataService.findById('/users', this.userId).then(data => {
      this.user = data;
    }, (err) => {
      console.error(err);
    })
  }

  save() {
    this.trimFieldWhiteSpaces();
    this.user.accountId = this.accountId;

    if (this.action == 'edit') {
      this.dataService.updateOne('/users/create', this.user).then(() => {
        this.router.navigate(['../../user-list'], { relativeTo: this.route })
      });
    }
    if (this.action == 'create') {
      this.dataService.insertOne('/users/create', this.user).then(() => {
        this.router.navigate(['../../user-list'], { relativeTo: this.route })
      }, (ex) => {
        this.toast.add({
          severity: 'error',
          detail: ex.error.message
        });
      });
    }
  }

  trimFieldWhiteSpaces() {
    this.user.firstName = this.user.firstName.trim();
    this.user.lastName = this.user.lastName.trim();
    this.user.username = this.user.username.trim();
  }

}
