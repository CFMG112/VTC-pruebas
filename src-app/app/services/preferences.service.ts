import { Injectable } from '@angular/core';
import { DataService } from '@services/data.service';
import { SecurityService } from '@services/security.service';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  DEFAULT_LANGUAGE = { id: 1, name: 'english', locale: "en" };

  constructor(
    private data: DataService,
    private auth: SecurityService
  ) { }

  getLanguage(): any {
    const language = localStorage.getItem('language');
    return JSON.parse(language) || this.DEFAULT_LANGUAGE;
  }

  getMeasurementSystem(): any {
    return JSON.parse(localStorage.getItem('mSystem'));
  }

  async getPeriodicity(): Promise<number> {
    const accountId = this.auth.getAccountId();
    return this.data.findById('/accounts', accountId).then(res => {
      return res.periodicity || 2;
    })
  }

  setLanguage(obj: any) {
    localStorage.setItem('language', JSON.stringify(obj));
    return this.data.find('/refresh').then(res => {
      
    })
  }

  setMeasurementSystem(obj: any) {
    localStorage.setItem('mSystem', JSON.stringify(obj));
  }

  setPeriodicity(obj: any) {
    const accountId = this.auth.getAccountId();
    const data: any = { id: accountId, periodicity: obj };
    this.data.updateOne('/accounts', data).then((res) => {
      console.log(res);
    });
  }
}
