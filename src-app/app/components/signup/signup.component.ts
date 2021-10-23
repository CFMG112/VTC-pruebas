import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  accountId: any;
  passwordConfirmation: string;
  matchingError: boolean = false;

  errorMessage: string;

  constructor(
    private securityService: SecurityService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.securityService.getAccount().then(data => {

      if (data) {
        this.accountId = data.id
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(e => {
      console.log(e.message)
    })
  }

  onSignUp() {
    this.errorMessage = null;
    this.matchingError = false;
    if (this.password !== this.passwordConfirmation) {
      this.matchingError = true;
    } else {
      this.securityService.signup({
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.email,
        password: this.password,
        accountId: this.accountId
      }).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/login']);
      }, (e: any) => {
        console.log(e);
        if (e.error && e.error.message) {
          this.errorMessage = e.error.message;
        }
      });
    }

  }

}
