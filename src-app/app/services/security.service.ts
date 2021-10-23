import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ElectronService } from 'ngx-electron';
import { DataService } from '../services/data.service';

@Injectable({ providedIn: 'root' })
export class SecurityService {

  jwt: any;
  pictureProfile: any;
  constructor(
    private http: HttpClient,
    private electronService: ElectronService,
    private dataService: DataService

  ) {

    this.jwt = new JwtHelperService();
  }

  private authenticated: Boolean = false;
  private userChanges = new EventEmitter<any>();
  public userChangePictureProfile = new EventEmitter<any>();
  private currentUser: any;


  login(credentials: any): Observable<any> {
    return Observable.create((observer: any) => {
      this.dataService.findByParams("/users/login", credentials).then(data => {

        if (data['user'] && data['token']) {
          this.authenticated = true;
          this.userChanges.emit(data['user']);
          this.currentUser = data['user'];
          localStorage.setItem('username', this.currentUser['username']);
          localStorage.setItem('token', data['token']);
          observer.next(data);
        } else {
          observer.error();
        }
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  signup(user): Observable<any> {
    return Observable.create(observer => {
      this.dataService.findByParams("/users/register", user).then(data => {
        observer.next(data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  updateOne(collection: string, id: any, obj?: any) {
    return this.electronService.ipcRenderer.invoke(collection + "/update", { id: id, obj: obj });
  }

  changePassword(obj: any): Promise<any> {
    return this.electronService.ipcRenderer.invoke('/users/recoverpassword', obj);
  }

  setPassword(obj: any): Promise<any> {
    return this.electronService.ipcRenderer.invoke('/users/resetpassword', obj);
  }


  // setPassword(obj) {
  //   return this.http.put(environment.serverBaseURL + environment.api + '/users/resetpassword', obj);
  // }

  isTokenExpired() {
    return this.jwt.isTokenExpired(this.getToken());
  }

  logout(): Observable<any> {
    return Observable.create((observer: any) => {
      this.authenticated = false;
      this.currentUser = null;

      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('profilePicture');
      localStorage.removeItem('cookie');
      localStorage.removeItem('accountId');

      this.userChanges.emit();
      observer.next();
    });
  }

  getAccountId() {
    return localStorage.getItem('accountId');
  }

  async getAccount() {
    return await this.dataService.find('/accounts')
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getCookie() {
    return localStorage.getItem('cookie');
  }

  getCurrentUser() {
    if (this.currentUser) {
      return this.currentUser;
    }
    var obj = this.jwt.decodeToken(this.getToken());

    if (obj) {
      return obj;
    } else {
      return null;
    }
  }

  getUserChangesEmitter() {
    return this.userChanges;
  }

  getUserChangePictureProfile() {
    this.pictureProfile = localStorage.getItem('profilePicture');
    return this.pictureProfile;
  }

  UserChangePictureProfile(picture) {
    localStorage.setItem('profilePicture', picture);
    return this.userChangePictureProfile.emit(picture);
  }

  getCurrentUserRoles() {

    if (this.currentUser) {
      return this.currentUser.role;
    }

    var obj = this.jwt.decodeToken(this.getToken());
    if (obj && obj.role) {
      return obj.role;
    } else {
      return [];
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }

  hasPermisions(roles) {
    // let currentRoles = this.getCurrentUserRoles();

    return true;

    // if (roles && currentRoles) {
    //   return roles.some((role, index, x) => {
    //     if (currentRoles.indexOf(role) > -1) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });
    // } else {
    //   return false;
    // }
  }

}
