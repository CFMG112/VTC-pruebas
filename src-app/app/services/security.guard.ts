import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({ providedIn: 'root' })
export class SecurityGuard implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.securityService.isAuthenticated && !this.securityService.isTokenExpired()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
