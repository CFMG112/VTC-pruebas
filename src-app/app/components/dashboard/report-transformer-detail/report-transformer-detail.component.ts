import { Component, AfterViewInit, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '@services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ExcelService } from '@services/excel.service';
import { ChartOptions } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { PreferencesService } from '@services/preferences.service';
import { MeasurementUnitMapper } from '@services/measurement-unit-mapper.service';
import { SecurityService } from '@services/security.service';
import { Router } from '@angular/router';
import { getTransformerLimits } from './report-transformer-details.utils';

const INTERVAL = 1000 * 60 * 1; // each minute
const enum Granularity {
  All = 1,
  MINUTE = 2,
  HOUR = 3,
  DAY = 4,
  WEEK = 5,
  MONTH = 6,
  YEAR = 7,
}
@Component({
  selector: 'app-report-transformer-detail',
  templateUrl: './report-transformer-detail.component.html',
  styleUrls: ['./report-transformer-detail.component.css']
})
export class ReportTransformerDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('select') select: any;
  @ViewChild('chartTankPresure') chartTankPresure: any;
  @ViewChild('chartAmbientTemperature') chartAmbientTemperature: any;
  @ViewChild('chartLiquidLevel') chartLiquidLevel: any;
  @ViewChild('chartOilTemperature') chartOilTemperature: any;
  @ViewChild('chartWindingTemperature') chartWindingTemperature: any;

  interval;
  HOUR = 2;
  selectData: any;
  startDate: Date;
  endDate: Date;
  granularity = Granularity.MINUTE;
  transformerId: string;
  transformer: any;
  logs: Array<any>;
  timeOffset: number;
  chartTankPresureExpand: boolean;
  chartAmbientTemperatureExpand: boolean;
  chartLiquidLevelExpand: boolean;
  chartOilTemperatureExpand: boolean;
  chartWindingTemperatureExpand: boolean;
  chartTankPresureTable: any;
  chartOilTemperatureTable: any;
  chartWindingTemperatureTable: any;
  chartAmbientTemperatureTable: any;
  chartLiquidLevelTable: any;
  granularities: Array<any>;
  plugins = [ChartAnnotation];
  labels: any;
  shortLabels: any;
  lang = {
    'id': 1,
    'name': "english",
    'locale': "en"
  }

  langCalendar: any;

  // Charts data
  chartData = {
    tankPressure: {
      labels: [],
      datasets: [{
        label: 'Tank Pressure',
        data: [],
        fill: false,
        borderColor: '#639fce'
      }]
    },
    ambientTemperature: {
      labels: [],
      datasets: [{
        label: 'Ambient Temperature',
        data: [],
        fill: false,
        borderColor: '#639fce'
      }]
    },
    liquidLevel: {
      labels: [],
      datasets: [{
        label: 'Liquid Level',
        data: [],
        fill: false,
        borderColor: '#639fce'
      }]
    },
    oilTemperature: {
      labels: [],
      datasets: [{
        label: 'Oil Temperature',
        data: [],
        fill: false,
        borderColor: '#639fce'
      }]
    },
    windingTemperature: {
      labels: [],
      datasets: [{
        label: 'Winding Temperature',
        data: [],
        fill: false,
        borderColor: '#639fce'
      }]
    }
  };

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private excel: ExcelService,
    private preferencesService: PreferencesService,
    private unitMapper: MeasurementUnitMapper,
    private auth: SecurityService,
    private router: Router
  ) { }

  ngAfterViewInit(){
    this.startTimer();
    this.onFind();
  }

  ngOnInit() {
    this.labels = this.unitMapper.getMeasurementUnitLabels();
    this.shortLabels = this.unitMapper.getShortMeasurementUnitLabels();
    this.lang = this.preferencesService.getLanguage();
    if (this.lang && this.lang.locale == 'es') {
      this.granularities = [
        { label: 'Minutos', value: 2 },
        { label: 'Horas', value: 3 },
        { label: 'Días', value: 4 },
        { label: 'Semanas', value: 5 },
        { label: 'Meses', value: 6 },
        { label: 'Años', value: 7 },
      ];

      this.langCalendar = {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: 'Hoy',
        clear: 'Limpiar',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
      };
    } else {

      this.granularities = [
        { label: 'Minutes', value: 2 },
        { label: 'Hours', value: 3 },
        { label: 'Days', value: 4 },
        { label: 'Weeks', value: 5 },
        { label: 'Months', value: 6 },
        { label: 'Years', value: 7 },
      ];

      this.langCalendar = {
        firstDayOfWeek: 0,
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
      };
    }

    this.transformerId = this.route.snapshot.paramMap.get('id');
    this.timeOffset = this.getTimezoneOffsetInHours(); // EST Time offset
    this.startDate = new Date( new Date().getTime() - 1*60*60*1000 ); //Current EST Time
    this.endDate = new Date(); //Current EST Time
    this.endDate.setHours(23, 59, 59, 0);
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  onFind() {
    this.onFindHistoryTransformer({
      'transformerId': this.transformerId,
      'startDate': this.startDate,
      'endDate': this.endDate,
      'granularity': this.granularity,
      'offset': this.timeOffset
    });
    this.onFindTransformer({
      'id': this.transformerId
    });
  }

  onRefreshTransformer() {
    this.onFindTransformer({
      'id': this.transformerId
    });
  }

  onRefreshHistory() {
    this.onFindHistoryTransformer({
      'id': this.transformerId,
      'startDate': this.startDate,
      'endDate': this.endDate
    });
  }

  async onFindTransformer(params?: any) {
    const transfomerForLimits = await this.dataService.findById('/transformers/id', params.id);
    const limits = getTransformerLimits(transfomerForLimits);

    this.dataService.findByFilter('/logs/action/filter', params).then(res => {
      this.transformer = res.data[0] || {};
      this.transformer = {
        ...this.transformer,
        ...limits
      }
      this.unitMapper.mapTransformerLimits(this.transformer);
      if (this.transformer)
        this.transformer = this.unitMapper.mapLogUnits(this.transformer);
      this.ngUpdateLimits();
    });
  }

  onFindHistoryTransformer(params?: any) {    
    this.dataService.findByFilter('/logs/action/history', params).then(res => {
      this.logs = res.data || {};
      this.logs = this.logs.map(log => this.unitMapper.mapLogUnits(log));
      this.ngUpdateChart()
    });
  }

  ngUpdateLimits() {

    const updateLimit = (chartObject: any, limits: any, label: string, margin: number) => {
      const { min, max } = limits;
      const options = this.getChartOptions(min, max, margin, label);
      chartObject.chart.options = options;
      chartObject.refresh();
    }

    updateLimit(this.chartTankPresure, this.transformer.tankPressureLimits, this.labels.tankPressure, 20);
    updateLimit(this.chartAmbientTemperature, this.transformer.ambientTemperatureLimits, this.labels.ambientTemperature, 100);
    updateLimit(this.chartLiquidLevel, this.transformer.liquidLevelLimits, this.labels.liquidLevel, 150);
    updateLimit(this.chartOilTemperature, this.transformer.oilTemperatureLimits, this.labels.oilTemperature, 100);
    updateLimit(this.chartWindingTemperature, this.transformer.windingTemperatureLimits, this.labels.windingTemperature, 100);
  }

  ngUpdateChart() {
    
    // Empty previous values
    this.chartData.tankPressure.datasets[0].data.length = 0;
    this.chartData.ambientTemperature.datasets[0].data.length = 0;
    this.chartData.liquidLevel.datasets[0].data.length = 0;
    this.chartData.oilTemperature.datasets[0].data.length = 0;
    this.chartData.windingTemperature.datasets[0].data.length = 0;
    this.chartData.tankPressure.labels.length = 0;
    this.chartData.ambientTemperature.labels.length = 0;
    this.chartData.liquidLevel.labels.length = 0;
    this.chartData.oilTemperature.labels.length = 0;
    this.chartData.windingTemperature.labels.length = 0;

    this.logs.forEach(log => {
      this.chartData.tankPressure.labels.push(this.getLabels(log, this.granularity));
      this.chartData.ambientTemperature.labels.push(this.getLabels(log, this.granularity));
      this.chartData.liquidLevel.labels.push(this.getLabels(log, this.granularity));
      this.chartData.oilTemperature.labels.push(this.getLabels(log, this.granularity));
      this.chartData.windingTemperature.labels.push(this.getLabels(log, this.granularity));

      this.chartData.tankPressure.datasets[0].data.push(log.tankPressure);
      this.chartData.ambientTemperature.datasets[0].data.push(log.ambientTemperature);
      this.chartData.liquidLevel.datasets[0].data.push(log.liquidLevel);
      this.chartData.oilTemperature.datasets[0].data.push(log.oilTemperature);
      this.chartData.windingTemperature.datasets[0].data.push(log.windingTemperature);
    });

    this.chartTankPresure.chart.scales['x-axis-0'].options.scaleLabel.labelString = this.getGranularityLabel()
    this.chartAmbientTemperature.chart.scales['x-axis-0'].options.scaleLabel.labelString = this.getGranularityLabel()
    this.chartLiquidLevel.chart.scales['x-axis-0'].options.scaleLabel.labelString = this.getGranularityLabel()
    this.chartOilTemperature.chart.scales['x-axis-0'].options.scaleLabel.labelString = this.getGranularityLabel()
    this.chartWindingTemperature.chart.scales['x-axis-0'].options.scaleLabel.labelString = this.getGranularityLabel()

    this.chartTankPresure.refresh();
    this.chartAmbientTemperature.refresh();
    this.chartLiquidLevel.refresh();
    this.chartOilTemperature.refresh();
    this.chartWindingTemperature.refresh();

  }

  getTimezoneOffsetInHours() {
    return -(new Date().getTimezoneOffset()) / 60;
  }

  getLabels(log: any, granularity: Granularity) {
    let { minute, hour, date, week, month, year } = log;
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    
    switch (granularity) {
      case Granularity.All:
      case Granularity.MINUTE:      
        return this.twoDigits(hour) + ":" + this.twoDigits(minute);
      case Granularity.HOUR:
        return this.twoDigits(hour)
      case Granularity.DAY:
        return date;
      case Granularity.WEEK:
        return `${year}-${week}`;
      case Granularity.MONTH:
        return monthNames[month-1];
      case Granularity.YEAR:
        return year;
    }
  }

  twoDigits(num) {
    return num >= 10 ? num : `0${num}`;
  }

  exportToXLSX() {
    console.log('Export to XLSX');
    const timestamp = this.startDate.toLocaleString() + '-' + this.endDate.toLocaleString();
    const fileName = this.transformer.name + '-' + this.getGranularityLabel() + '-' + timestamp;
    this.excel.exportAsExcelFile({
      fileName,
      sheets: [{
        title: 'Transformer Detail',
        data: [{
          Name: this.transformer.name,
          Site: this.transformer['site.name'],
          Pressure: this.transformer.tankPressure,
          Level: this.transformer.liquidLevel,
          Oil: this.transformer.oilTemperature,
          Winding: this.transformer.windingTemperature,
          Ambient: this.transformer.ambientTemperature,
          SPR: this.transformer.spr,
          PRD: this.transformer.prd,
          Status: this.transformer.status
        }]
      }, {
        title: 'Tank Pressure',
        data: this.logs.map((log: any) => {
          return {
            Timestamp: this.getLabels(log, this.granularity),
            Value: log.tankPressure
          }
        })
      }, {
        title: 'Ambient Temperature',
        data: this.logs.map((log: any) => {
          return {
            Timestamp: this.getLabels(log, this.granularity),
            Value: log.ambientTemperature
          }
        })
      }, {
        title: 'Liquid Level',
        data: this.logs.map((log: any) => {
          return {
            Timestamp: this.getLabels(log, this.granularity),
            Value: log.liquidLevel
          }
        })
      },
      {
        title: 'Oil Temperature',
        data: this.logs.map((log: any) => {
          return {
            Timestamp: this.getLabels(log, this.granularity),
            Value: log.oilTemperature
          }
        })
      },
      {
        title: 'Winding Temperature',
        data: this.logs.map((log: any) => {
          return {
            Timestamp: this.getLabels(log, this.granularity),
            Value: log.windingTemperature
          }
        })
      },]
    });
  }

  getGranularityLabel() {
    const granularity = this.granularities.find((item) => {
      return item.value == this.granularity;
    })
    return granularity.label;
  }

  getChartOptions(min: number, max: number, padding: number, units: string) {
    return {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: units
          },
          ticks: {
            max: max + padding,
            min: min - padding,
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.getGranularityLabel()
          }
        }]
      },
      legend: {
        display: false,
      },
      annotation: {
        annotations: [{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: max,
          borderWidth: 1,
          borderColor: '#cd201f',
          label: {
            backgroundColor: 'transparent',
            fontColor: '#000',
            position: 'right',
            yAdjust: -10,
            content: 'MAX',
            fontSize: 10,
            fontStyle: "normal",
            enabled: true
          },
        }, {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: min,
          borderWidth: 1,
          borderColor: '#cd201f',
          label: {
            backgroundColor: 'transparent',
            fontColor: '#000',
            position: 'right',
            yAdjust: 10,
            content: 'MIN',
            fontSize: 10,
            fontStyle: "normal",
            enabled: true
          },
        }]
      },
    } as ChartOptions;
  }

  startTimer() {
    console.log("Timer start ", new Date());

    this.interval = setInterval(() => {
      console.log("timer ", new Date());
      this.onFind();
    }, INTERVAL)
  }

  stopTimer() {
    console.log("Timer Stop");
    clearInterval(this.interval);
  }

  isOfflineTrnasformer(date: string) {
    let createdAt = new Date(date);
    let today = new Date();
    const diffTime = Math.abs(today.getTime() - createdAt.getTime()) / (1000 * 60);
    return (diffTime > 30) ? true : false;
  }

  showTransformer() {
    let destUrl: string;
    if (this.auth.hasPermisions(['user'])) {
      const transformerId = this.transformerId;
      destUrl = `/my-account/transformers/transformer/${transformerId}`;
    } else {
      const accountId = this.transformer.accountId;
      const transformerId = this.transformerId;
      destUrl = `/accounts/detail/${accountId}/transformers/transformer/${transformerId}`;
    }
    this.router.navigate([destUrl]);
  }
}
