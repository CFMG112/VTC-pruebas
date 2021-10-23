import { Component, OnInit, OnDestroy, Output, EventEmitter, ɵConsole } from '@angular/core';
import { DataService } from '@services/data.service';
import { PreferencesService } from '@services/preferences.service';
import { SecurityService } from '@services/security.service';
import { MeasurementUnitMapper } from '@services/measurement-unit-mapper.service';
import * as translate from "../../../../locale/traductor";


const INTERVAL = 1000 * 60 * 1; // each minute

@Component({
  selector: 'app-report-transformer-list',
  templateUrl: './report-transformer-list.component.html',
  styleUrls: ['./report-transformer-list.component.css']
})
export class ReportTransformerListComponent implements OnInit, OnDestroy {

  accountId: string;
  sites: any;
  selectedSiteId: string;
  accounts: any;
  selectedAccountId: string;
  transformers: any;
  selectedTransformerId: string;
  selectedStatus: any;
  status: any;
  labels: any;
  filter: any;
  loading = false;
  timeLeft: number = 60;
  interval;
  spinner = false;
  searchFilterDelay: any;
  lang = {
    'id': 1,
    'name': "english",
    'locale': "en"
  }
  translate = translate.translate;

  constructor(
    private dataService: DataService,
    private authService: SecurityService,
    private preferencesService: PreferencesService,
    private unitMapper: MeasurementUnitMapper
  ) { }

  transformersLogs = [];

  @Output() accountRefreshed = new EventEmitter<any>();

  ngOnInit() {
    this.labels = this.unitMapper.getShortMeasurementUnitLabels();
    this.lang = this.preferencesService.getLanguage();

    if (this.lang && this.lang.locale == 'es') {
      this.status = [
        { label: 'Todos', value: null },
        { label: 'Peligro', value: 1 },
        { label: 'Advertencia', value: 2 },
        { label: 'Normal', value: 3 },
      ]
    } else {
      this.status = [
        { label: 'All', value: null },
        { label: 'Danger', value: 1 },
        { label: 'Warning', value: 2 },
        { label: 'Normal', value: 3 },
      ]

    }

    this.startTimer();

    this.authService.getAccount().then(data => {
      this.accountId = data.id
    }).catch(e => {
      console.log(e.message)
    })


    this.onFindSites();
    this.selectedStatus = 0;

    this.onRefresh();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  onFindSites(params?: any) {
    this.dataService.find('/sites', params).then(res => {
      this.sites = res.map((item: any) => {
        return { label: item.name, value: item.id };
      });

      if (this.lang && this.lang.locale == 'es') {
        this.sites.unshift({ label: 'Todos' });
      } else {
        this.sites.unshift({ label: 'All' });
      }
    });
  }


  onAccountChange() {
    this.accountRefreshed.emit(this.selectedAccountId);
    this.onRefresh();
  }

  onRefresh() {
    clearTimeout(this.searchFilterDelay);
    this.dataService.refreshTransformers.emit();
    this.searchFilterDelay = setTimeout(() => {
      this.onFindTransformersLogs({
        'siteId': this.selectedSiteId,
        'status': this.selectedStatus,
        'id': this.selectedTransformerId,
        'jobNumber': this.filter,
        'name': this.filter,
      });
    }, 500);
  }

  onFindTransformersLogs(params?: any) {
    this.loading = true;
    this.dataService.findByFilter('/logs/action/filter', params).then(res => {
      this.transformersLogs = res.data;
      this.transformersLogs.forEach(transformer => {
        transformer = this.unitMapper.mapLogUnits(transformer);
        transformer.siteName = transformer['site.name']
      });
      this.loading = false;
    });
  } 

  setStatus(status: any) {
    this.selectedStatus = status;
    this.onRefresh();
  }

  startTimer() {
    console.log("Timer start ", new Date());

    this.interval = setInterval(() => {
      console.log("startTimer onRefresh ", new Date());
      this.onRefresh();
    }, INTERVAL)
  }

  stopTimer() {
    console.log("Timer Stop");

    clearInterval(this.interval);
  }

  isOfflineTransformer(date: string) {
    let createdAt = new Date(date);
    let today = new Date();
    const diffTime = Math.abs(today.getTime() - createdAt.getTime()) / (1000 * 60);
    return (diffTime > 30) ? true : false;
  }

  onFilter() {
    this.onRefresh();
  }

}
