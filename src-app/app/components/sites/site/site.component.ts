import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';
import { SecurityService } from '@services/security.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  site: any;
  siteId: string;
  accountId: string;
  action: string;
  countries: any;
  states: any;
  cities: any;
  adminPermissions: boolean;
  from:string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: SecurityService,
    private toast: MessageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit() {
    this.adminPermissions = this.auth.hasPermisions(['admin']);
    this.accountId = this.route.snapshot.parent.parent.paramMap.get('id');

    this.route.queryParams.subscribe(params => {
      console.log('from', params['from']);
      this.from = params['from'];
    });


    this.auth.getAccount().then(data => {
      if (data) {
        this.accountId = data.id
      } else {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: "Missing The account Id"
        });
      }
    }).catch(e => {
      console.log(e.message)
    })
    this.siteId = this.route.snapshot.paramMap.get('id');
    if (this.siteId) {
      this.action = 'edit';
      this.findSite();
    } else {
      this.action = 'create';
      this.site = {};
      this.findCountries();
    }
  }

  findSite() {
    this.dataService.findById('/sites/id', this.siteId).then(data => {
      this.site = data;

      this.site.addressInfo = this.site.address.address;
      this.site.country = this.site.address.countryId
      this.site.state = this.site.address.stateId;
      this.site.city = this.site.address.cityId;
      this.findCountries()
    }, (err) => {
      console.error(err);
    })
  }


  findCountries() {
    this.dataService.find('/countries').then(res => {
      this.countries = res.map(item => {
        return { label: item.country, value: item.id };
      });

      this.onFindSatates();
    }, (err) => {
      console.error(err);
    })
  }

  onFindSatates() {
    if (this.site.country) {
      this.dataService.find('/states', this.site.country).then(res => {
        this.states = res.map(item => {
          return { label: item.state, value: item.id };
        });
        this.onFindCities();
      }, (err) => {
        console.error(err);
      })
    }
  }

  onFindCities() {
    if (this.site.state) {
      this.dataService.find('/cities/filter/states', this.site.state).then(res => {
        this.cities = res.map(item => {
          return { label: item.city, value: item.id };
        });

      }, (err) => {
        console.error(err);
      })
    }
  }

  save() {
    this.trimFieldWhiteSpaces();
    if (this.action == 'edit') {
      this.setAddressAtts()
      this.dataService.updateOne('/sites', this.site.id, this.site).then(() => {
        this.displayError("Update","success");
        this.back()
      });
    }
    if (this.action == 'create') {
      this.site.address = {}
      this.site.accountId = this.accountId
      this.setAddressAtts()
      this.dataService.insertOne('/sites', this.site).then(() => {
        this.displayError("Create","success");
      }, (ex) => {
        this.toast.add({
          severity: 'warn',
          detail: ex.error.message
        });
      });
      this.back();
    }
  }

  

  trimFieldWhiteSpaces() {
    this.site.name = this.site.name.trim();
  }

  setAddressAtts() {

    this.site.address.countryId = this.site.country;
    this.site.address.stateId = this.site.state;
    this.site.address.cityId = this.site.city;
    this.site.address.address = this.site.addressInfo;
    this.site.accountId = this.accountId;
  }

  back(){
    //[routerLink]="['../../site-list']"
    if(this.from){
      this.router.navigate([this.from]);
    }else{
      this.router.navigate(['../../site-list'], { relativeTo: this.route });
    }
  }

  displayError(error: string,ty:string) {
    this.toast.add({
      severity: ty,
      summary: ty,
      detail: error
    });
  }

}
