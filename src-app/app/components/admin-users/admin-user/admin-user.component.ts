import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';
import { MessageService } from 'primeng/api';
import { SecurityService } from '@app/services/security.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  user: any;
  userId: string;
  accountId: string;
  action: string;
  passwordConfirmation: any;
  matchingError: boolean = false;
  errorMessage: string;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: MessageService,
    private securityService: SecurityService,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.securityService.getAccount().then(data => {
      if (data) {
        this.accountId = data.id
      } else {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: "Missing The account Id"
        });
      }
    }).catch(e => {
      console.log(e.message)
    })

    if (this.userId) {
      this.action = 'edit';
      this.findUser();
    } else {
      this.action = 'create';
      this.user = {};
    }
  }

  findUser() {
    this.dataService.findById('/users/id', this.userId).then(data => {
      this.user = data;
      console.log(this.user)
    }, (err) => {
      console.error(err);
    })
  }

  save() {


    if (this.action == 'edit') {

      this.dataService.updateOne('/users', this.user.id, this.user).then(() => {
        this.router.navigate(['/users'], { relativeTo: this.route })
      });
    }
    if (this.action == 'create') {
      this.errorMessage = null;
      this.matchingError = false;
      if (this.user.password !== this.passwordConfirmation) {
        this.matchingError = true;
      } else {
        this.securityService.signup({
          accountId: this.accountId,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          username: this.user.username,
          password: this.user.password
        }).subscribe((res) => {
          console.log(res);
          this.router.navigate(['/users'], { relativeTo: this.route })
        }, (e: any) => {
          console.log(e);
          if (e.error && e.error.message) {
            this.errorMessage = e.error.message;
          }
        });
      }

    }
  }






}
