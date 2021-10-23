import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SecurityService } from '@services/security.service';
import { PreferencesService } from '@app/services/preferences.service';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  awaitingNotifications: any[] = [];
  showNotificacions: boolean = false;
  showUserInfo: boolean = false;
  isMenuCollapsed: boolean = false

  style = "transform: translate3d(-135px, 32px, 0px)";
  items: MenuItem[];

  constructor(
    private securityService: SecurityService,
    private electronService: ElectronService,
    private router: Router,
  ) { }

    ngOnInit() {
        this.items = [
          {label: 'Dashboard', routerLink:['/dashboard']},
          {label: 'My Account', routerLink:['/my-account']},
          {label: 'Users', routerLink:['/users']},
          {label: 'Catalogs', routerLink:['/catalogs']},
          {label: 'Maintenances', routerLink:['/next-maintenance']},
          {label: 'Settings', routerLink:['/settings']},
          {label: 'Logout', command: () =>{ this.onLogout() }}
      ];
    }

    onLogout() {
      this.securityService.logout().subscribe(_ => {
        this.router.navigate(['/login']);
      });
    }

    onMinimize(){

      var window = this.electronService.remote.BrowserWindow.getFocusedWindow();
      window.minimize(); 
    }

}
