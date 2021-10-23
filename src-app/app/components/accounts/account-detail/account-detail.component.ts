import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from '@services/security.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  account: any;
  accountId: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private auth: SecurityService,
  ) { }

  ngOnInit() {
    this.findAccount();
  }

  findAccount() {

    console.log("findAccount");

    this.dataService.findById('/accounts', this.accountId).then(data => {
      let offsetWithEST = -5 - this.getTimezoneOffsetInHours();
      if (data.createdAt) {
        data.createdAt = new Date(new Date(data.createdAt).valueOf() + offsetWithEST * 3600000).toISOString() // To EST
      }
      if (data.expirationDate) {
        data.expirationDate = new Date(new Date(data.expirationDate).valueOf() + offsetWithEST * 3600000).toISOString() // To EST
      } else {
        data.expirationDate = new Date()
      }
      this.account = data;
      this.accountId = this.account.id;
      if (this.account.address) {
        this.findAddressInfoById();
      }

    }, (err) => {
      console.error(err);
    });
  }

  findAddressInfoById() {
    this.dataService.findById('/countries/id', this.account.address.countryId).then(res => {
      this.account.country = res.country;
    });
    this.dataService.findById('/states/id', this.account.address.stateId).then(res => {
      this.account.state = res.state;
    });
    this.dataService.findById('/cities/id', this.account.address.cityId).then(res => {
      this.account.city = res.city;
    });
  }

  getTimezoneOffsetInHours() {
    return -(new Date().getTimezoneOffset()) / 60;
  }

  onChange() {
    console.log("onChange");
    this.save();
  }

  save() {
    console.log("save");
    this.dataService.updateOne('/accounts', this.account.id, this.account).then(data => {
      this.account = data;
    });
  }

}
