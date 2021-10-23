import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {

  constructor(private dataService: DataService,
    private toast: MessageService
  ) { }

  filter: any;
  maintenances: any[];
  item: any;
  display: boolean;
  searchFilterDelay: any;

  ngOnInit() {
    this.onFindMaintenances({});
  }


  onFindMaintenances(params: Object) {
    this.dataService.findByFilter('/maintenances/filter', params).then(res => {
      this.maintenances = res;
    },
      error => {
        console.log(error);
        // this.toast.add({ severity: 'error', summary: 'Error', detail: error.error.message })
      })

  }

  onFilter() {
    clearTimeout(this.searchFilterDelay);
    this.searchFilterDelay = setTimeout(() => {
      this.onFindMaintenances({
        type: this.filter,
        description: this.filter,
      });
    }, 500);
  }

  onDeleteDialog(item: any) {
    this.item = item;
    this.display = true;
  }

  delete(id: String) {
    this.dataService.deleteOne('/maintenances', id).then(_data => {
      this.onFilter();
    }, (e) => {
      this.toast.add({
        severity: 'warn',
        detail: e.error.message,
      });
    });
    this.display = false;
  }


}
