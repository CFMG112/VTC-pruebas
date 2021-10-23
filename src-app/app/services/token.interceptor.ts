import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.securityService.getToken()}`,
      }
    });

    if (request.method === 'GET') {
      request = request.clone({
        setHeaders: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
    }
    
    return next.handle(request);
  }
}
