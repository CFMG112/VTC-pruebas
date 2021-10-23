import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '@services/data.service';
import { SecurityService } from '@services/security.service';

@Component({
  selector: 'app-report-totals',
  templateUrl: './report-totals.component.html',
  styleUrls: ['./report-totals.component.css']
})
export class ReportTotalsComponent implements OnInit {

  transformers: any;
  accountId: any;
  @Output() statusClicked = new EventEmitter<any>();

  constructor(
    private dataService: DataService,
    private authService: SecurityService,
  ) { }

  ngOnInit() {
    if (this.authService.hasPermisions(['user']))
      this.accountId = this.authService.getAccountId();
    this.changeAccount(this.accountId);

    this.dataService.refreshTransformers.subscribe(() => {
      this.getTransformers({
        'accountId': this.accountId
      });
    })
  }

  changeAccount(accountId: any) {
    this.accountId = accountId;
    this.getTransformers({
      'accountId': this.accountId
    });
  }

  onClick(status?: any) {
    this.statusClicked.emit(status || "");
  }

  dangerCount() {
    if (!this.transformers)
      return 0;
    let count = 0;
    this.transformers.forEach(t => {
      if (t && t.status == 1)
        count++;
    });
    return count;
  }

  warningCount() {
    if (!this.transformers)
      return 0;
    let count = 0;
    this.transformers.forEach(t => {
      if (t && t.status == 2)
        count++;
    });
    return count;
  }

  healthysCount() {
    if (!this.transformers)
      return 0;
    let count = 0;
    this.transformers.forEach(t => {
      if (t && t.status == 3)
        count++;
    });
    return count;
  }

  getTransformers(params?: any) {
    this.dataService.findByFilter('/logs/action/filter', params).then(res => {
      this.transformers = res.data;
      console.log(res.data)
    });
  }

}
