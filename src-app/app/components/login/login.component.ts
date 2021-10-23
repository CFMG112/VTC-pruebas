import { Component, OnInit, NgZone } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from '@app/services/data.service';


@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  account: any;
  accountId: string;
  isValidAccount: boolean;
  errorMessage: string;

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private toast: MessageService,
    private ngZone: NgZone,
    private dataService: DataService


  ) { }

  ngOnInit() {
    this.account = {}
    this.securityService.getAccount().then(data => {
      console.log(data)
      if (data) {
        this.isValidAccount = true
      } else {
        this.isValidAccount = false
      }
    }).catch(e => {
      console.log(e.message)
    })



    if (localStorage.getItem('username') != 'undefined') {
      this.username = localStorage.getItem('username');
    }


  }

  onLogin() {
    this.errorMessage = null;
    console.log('[LoginComponent][onLogin]');
    this.errorMessage = '';
    this.securityService.login({
      username: this.username,
      password: this.password
    }).subscribe((res) => {
      this.ngZone.run(() => {
        this.router.navigate(['/dashboard']);
      })
    },
      error => {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Usuario y/o contraseña no válido' })
      })
  }

  showMessage(error: string) {
  }

  onSaveAccount() {
    console.log(this.account);

    this.dataService.insertOne('/accounts', this.account).then(() => {
      this.router.navigate(['/signup']);
    });
  }
}
