import { Component, OnInit } from '@angular/core';
import { SecurityService } from '@app/services/security.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private securityService: SecurityService,
    private router: Router, private toast: MessageService, ) { }

  username: string;


  errorMessage: string;

  ngOnInit() {
  }


  onSend() {
    this.errorMessage = null;
    console.log('[ForgotPasswordComponent][onLogin]');
    this.errorMessage = '';
    this.securityService.changePassword({
      username: this.username,
    }).then((res) => {
      console.log(res);
      this.toast.add({ severity: 'success', summary: 'Password sent', detail: 'We have sent you an email with a recovery password' })
      this.router.navigate(['/login']);
    },
      error => {
        console.log(error);
        this.toast.add({ severity: 'error', summary: 'Error', detail: error.error.message })
      })
  }

}


