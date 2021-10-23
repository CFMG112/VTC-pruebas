import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  @Input('isMenuCollapsed') isMenuCollapsed;

  constructor(
    private securityService: SecurityService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogout() {
    this.securityService.logout().subscribe(_ => {
      this.router.navigate(['/login']);
    });
  }

}
