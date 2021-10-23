import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: any;
  accountId: string;
  action: string;
  countries: any;
  states: any;
  cities: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.accountId = this.route.snapshot.paramMap.get('id');
    this.action = 'edit';
    this.findAccount();

    console.log("oninit");

  }

  findAccount() {
    this.dataService.findById('/accounts', this.accountId).then(data => {
      this.account = {
        ...data,
        expirationDate: new Date(data.expirationDate)
      };
      if (this.account.addressId) {
        this.account.addressInfo = this.account.address.address;
        this.findAddressInfoById();
        this.findCountries();
      } else {
        this.account.address = {}
        this.findCountries();
      }

    }, (err) => {
      console.error(err);
    })
  }

  findAddressInfoById() {
    console.log(this.account)
    this.dataService.findById('/countries/id', this.account.address.countryId).then(res => {
      this.account.country = res.id;
    });
    this.dataService.findById('/states/id', this.account.address.stateId).then(res => {
      this.account.state = res.id;
    });
    this.dataService.findById('/cities/id', this.account.address.cityId).then(res => {
      this.account.city = res.id;
    });
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
    if (this.account.country != null) {
      this.dataService.findByFilter('/states', this.account.country).then(res => {
        this.states = res.map(item => {
          return { label: item.state, value: item.id };
        });
        this.onFindCities();
      }, (err) => {
        console.error(err);
      })
    }
  }

  onChangeCountry() {
    delete this.account.state;
    this.onChangeState();
    if (this.account.country != null) {
      this.dataService.findByFilter('/states', this.account.country).then(res => {
        this.states = res.map(item => {
          return { label: item.state, value: item.id };
        });
        this.onFindCities();
      }, (err) => {
        console.error(err);
      })
    }
  }

  onChangeState() {
    delete this.account.city;
    this.cities = null;
    if (this.account.state) {
      this.dataService.findByFilter('/cities/filter/states', this.account.state).then(res => {
        this.cities = res.map(item => {
          return { label: item.city, value: item.id };
        });
      }, (err) => {
        console.error(err);
      })
    }
  }

  onFindCities() {
    if (this.account.state) {
      this.dataService.findByFilter('/cities/filter/states', this.account.state).then(res => {
        this.cities = res.map(item => {
          return { label: item.city, value: item.id };
        });
      }, (err) => {
        console.error(err);
      })
    }
  }

  save() {
    console.log(this.account);

    this.account.address.address = this.account.addressInfo;
    this.account.address.adressId = this.account.addressId;
    this.account.address.countryId = this.account.country;
    this.account.address.stateId = this.account.state;
    this.account.address.cityId = this.account.city;
    this.dataService.updateOne('/accounts', this.account.id, this.account).then(() => {
      this.router.navigate(['/my-account']);
    });
  }
}
