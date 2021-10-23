import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { MessageService } from 'primeng/api';
import { PreferencesService } from '@app/services/preferences.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transformer-list',
  templateUrl: './transformer-list.component.html',
  styleUrls: ['./transformer-list.component.css']
})
export class TransformerListComponent implements OnInit {

  display: boolean;
  confirm: string;
  transformer: any;
  transformers: any[];
  filter: any;
  searchFilterDelay: any;

  constructor(
    private dataService: DataService,
    private toast: MessageService,
    private preferences: PreferencesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit() {
    this.onFind();
  }

  onFind() {
    this.onFindTransformers({});
  }

  onFindTransformers(params?: any) {
    this.dataService.findByFilter('/transformers/action/filter/', params).then(res => {
      let offsetWithEST = -5 - this.getTimezoneOffsetInHours();
      res.data.forEach(t => {
        t.shippingDate = new Date(
          new Date(t.shippingDate).valueOf() + offsetWithEST * 3600000)
          .toISOString() // To EST
        t.commissioningDate = new Date(
          new Date(t.commissioningDate).valueOf() + offsetWithEST * 3600000)
          .toISOString() // To EST
      });
      this.transformers = res.data;

    });
  }

  onFilter() {
    clearTimeout(this.searchFilterDelay);
    this.searchFilterDelay = setTimeout(() => {
      this.onFindTransformers({
        name: this.filter,
        jobNumber: this.filter,
        type: this.filter,
        class: this.filter,
      });
    }, 500);
  }

  onDeleteDialog(transformer: any) {
    this.transformer = transformer;
    this.display = true;
  }

  delete(id: String) {

    this.dataService.deleteOne('/transformers', id).then(data => {
      this.onFind();
      this.toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'success'
      });
    }).catch(error => {
      console.log(error);
      this.toast.add({
        summary: 'Error',
        detail: error,
        severity: 'error'
      })

    }).finally(() => {
      this.display = false;
    });
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  getTimezoneOffsetInHours() {
    return -(new Date().getTimezoneOffset()) / 60;
  }

}
