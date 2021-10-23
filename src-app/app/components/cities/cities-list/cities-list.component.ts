import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from '@app/services/security.service';
import { DataService } from '@app/services/data.service';
import { PreferencesService } from '@app/services/preferences.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private auth: SecurityService,
    private preferencesService: PreferencesService) { }

  displayCities: any[];
  filter: any;
  loading: boolean;
  total: any;
  rows: any;
  page: any;
  country: any;
  state: any;
  city: any;
  display: boolean = false;
  lang: any;
  searchFilterDelay: any;
  ngOnInit() {
    this.lang = this.preferencesService.getLanguage() || {};
    this.rows = 50;
    this.page = 0;
    this.onFindCities({ limit: this.rows, order: [['city', 'ASC']] })
  }

  onFindCities(params: Object) {
    this.loading = true;
    this.dataService.findByFilter('/cities', params).then(res => {
      this.total = res.length;
      this.displayCities = res;
      this.loading = false;
      this.onFindCountryAndState();
    });
  }

  onFindCountryAndState(){
    this.displayCities.forEach(element => {
      this.dataService.findById('/countries/id', element.countryId).then(data =>{
        element.country = data.country;
        element.iso2 = data.iso2;
      })
      this.dataService.findById('/states/id', element.stateId).then(data =>{
        element.state = data.state;
      })
    });
  }

  onRefresh(){
    this.onFilter()
  }

  onFilter() {
    this.rows = 50;
    clearTimeout(this.searchFilterDelay);
    this.searchFilterDelay = setTimeout(() => {
      this.onFindCities({
        country: this.filter,
        state: this.filter,
        iso: this.filter,
        city: this.filter,
        skip: this.page,
        limit: this.rows
      });
    }, 500);
  }


  onPaginate(event) {
    this.page = event.page;
    this.rows = event.rows;
    this.onFindCities({
      country: this.filter,
      iso: this.filter,
      state: this.filter,
      skip: event.first,
      limit: 100
    });
  }

  onDeleteDialog(city: any) {
    this.city = city;
    this.display = true;
  }

  delete(id: String) {
    this.dataService.deleteOne('/cities', id).then(data => {
      this.onFindCities({ limit: this.rows })
      this.display = false;
    });
  }


  getPaginatorTitle() {
    return this.lang && this.lang.locale == 'es' ? `${this.displayCities.length} de ${this.total} entradas` : `${this.displayCities.length} of ${this.total} entries`
  }

}
