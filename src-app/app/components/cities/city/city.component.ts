import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { PreferencesService } from '@services/preferences.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private preferencesService: PreferencesService,
    private router: Router, ) { }

  account = {};

  city: any;
  cityId: any;
  action: string;
  countries: Array<any>;
  states: Array<any>;

  country:any;
  state:any;
  displayCountryDialog: boolean = false;
  displayStateDialog: boolean = false;

  lang = {
    'id': 1,
    'name': "english",
    'locale': "en"
  }

  ngOnInit() {
    this.city = {}
    this.country = {}
    this.state = {}
    this.lang = this.preferencesService.getLanguage();

    this.cityId = this.route.snapshot.paramMap.get('id');
    if (this.cityId) {
      this.action = 'edit';
      this.findCity();
    } else {
      this.action = 'create';
      this.account = {};
      this.findCountries();
    }

  }

  onOpenNewCountryDialog(){
    this.country= {};
    this.displayCountryDialog = true;
  }

  onCreateCountry(){
    console.log("country", this.country);
    this.dataService.insertOne('/countries', this.country).then(() => {
      this.displayCountryDialog = false;
      this.findCountries();
    });
  }

  onOpenNewStateDialog(){
    this.state= {};
    this.displayStateDialog = true;
  }

  onCreateState(){
    console.log("state", this.state);
    this.dataService.insertOne('/states', this.state).then(() => {
      this.displayStateDialog = false;
      this.findStates();
    });
    
  }

  findCity() {
    this.dataService.findById('/cities/id', this.cityId).then(data => {
      console.log("city",data);
      this.city = data;
      this.findCountries();
    }, (err) => {
      console.error(err);
    })
  }

  findCountries() {
    this.dataService.findByFilter('/countries',{}).then(res => {
      this.countries = res.map((item: any) => {
        return { label: item.country, value: item.id };
      });
      if (this.lang && this.lang.locale == 'es') {
        this.countries.unshift({ label: 'Seleccione un País' });
      } else {
        this.countries.unshift({ label: 'Selecty Country' });
      }

      this.findStates();
      console.log("countries",res);
    }, (err) => {
      console.error(err);
    })
  }

  findStates() {
    if(this.city.countryId){
      this.dataService.find('/states', this.city.countryId).then(res => {
        this.states = res.map((item: any) => {
          return { label: item.state, value: item.id };
        });
  
        if (this.lang && this.lang.locale == 'es') {
          this.states.unshift({ label: 'Seleccione un Estado' });
        } else {
          this.states.unshift({ label: 'Selecty State' });
        }
        console.log("states", res);
      }, (err) => {
        console.error(err);
      })
    }
  }

  onRefresh(){
    delete this.city.stateId;
    this.findStates();
  }

  save() {
    console.log("save", this.city);
    if (this.action == 'edit') {
      this.dataService.updateOne('/cities', this.city).then(() => {
        this.router.navigate(['/catalogs/cities']);
      });
    }
    if (this.action == 'create') {
      console.log(this.city)
      this.dataService.insertOne('/cities', this.city).then(() => {
        this.router.navigate(['/catalogs/cities']);
      });
    }
  }


  clearDiacritical(tex) {
    return tex.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }


}
