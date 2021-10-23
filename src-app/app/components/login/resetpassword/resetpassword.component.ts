import { Component, OnInit } from '@angular/core';
import { SecurityService } from '@app/services/security.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private securityService: SecurityService,
    private router: Router, private toast: MessageService, ) { }

  errorMessage: string;
  matchingError: boolean = false;

  userInfo;

  ngOnInit() {
    this.userInfo = {}
  }

  onUpdate() {
    this.matchingError = false;

    if (this.userInfo.newpassword !== this.userInfo.newpassword2) {
      this.matchingError = true;
    } else {
      this.securityService.setPassword(this.userInfo).then((res) => {
        console.log(res);
        this.toast.add({ severity: 'success', summary: 'Password Updated', detail: 'Now you can use the new password' })
        this.router.navigate(['/login']);

      },
        error => {
          console.log(error);
          this.toast.add({ severity: 'error', summary: 'Error', detail: error.error.message })
        })
    }
  }


}
