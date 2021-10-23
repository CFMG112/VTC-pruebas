import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DataService {

  refreshTransformers:  EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private electronService: ElectronService
  ) { }

  find(collection: string, params?: any): Promise<any> {
      return this.electronService.ipcRenderer.invoke(collection, params);
  }

  findByParams(collection: string, params: any) {
    return this.electronService.ipcRenderer.invoke(collection, params);
  }

  findByFilter(collection: string, params: any) {
    return this.electronService.ipcRenderer.invoke(collection, params);
  }

  findBy(collection: string, query: URLSearchParams) {
    return this.electronService.ipcRenderer.invoke(collection, query);
  }

  findById(collection: string, id: String) {
    return this.electronService.ipcRenderer.invoke(collection, id);
  }

  insertOne(collection: string, obj: any) {
    return this.electronService.ipcRenderer.invoke(collection + "/create", obj);
  }

  updateOne(collection: string, id:any, obj?: any) {
    return this.electronService.ipcRenderer.invoke(collection + "/update", {id:id, obj:obj});
  }

  deleteOne(collection: string, id: String) {
    return this.electronService.ipcRenderer.invoke(collection + "/delete", id);
  }

  insertOneFile(collection, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(environment.serverBaseURL + environment.api + collection + "/", formData);
  }

  uploadFile(collection, formData) {
    return this.http.post(environment.serverBaseURL + environment.api + collection + "/", formData);
  }

  count(collection: String) {
    return this.http.get<any>(environment.serverBaseURL + environment.api + collection + "/");
  }

  countWithParams(collection: String, params: String) {
    return this.http.get<any>(environment.serverBaseURL + environment.api + collection + "?" + params);
  }

  getNamePlate(jobId: string) {
    const requestUrl = `${environment.nameplate.url}/?id=${jobId}`;
    return this.http.get<any>(requestUrl, { responseType: 'text' } as any).toPromise();
  }

}
