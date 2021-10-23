import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-maintenance-detail',
  templateUrl: './maintenance-detail.component.html',
  styleUrls: ['./maintenance-detail.component.css']
})
export class MaintenanceDetailComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: MessageService,

  ) { }

  maintenanceId: string;
  maintenance: any;
  action: string;


  ngOnInit() {
    this.maintenanceId = this.route.snapshot.paramMap.get('id');
    if (this.maintenanceId) {
      this.action = 'edit';
      this.onFindMaintenance();
    } else {
      this.action = 'create';
      this.maintenance = {};
      this.maintenance.predefined = false;
    }
  }

  onFindMaintenance() {
    this.dataService.findById('/maintenances/id', this.maintenanceId).then(data => {
      this.maintenance = {
        ...data,
        date: new Date(data.date)
      };

    }, (err) => {
      console.error(err);
    })
  }

  onSave() {
    if (this.action == 'edit') {
      this.dataService.updateOne('/maintenances', this.maintenanceId, this.maintenance).then(() => {
        this.router.navigate(['/catalogs/maintenance'], { relativeTo: this.route });
      });
    }
    if (this.action == 'create') {
      this.dataService.insertOne('/maintenances', this.maintenance).then(() => {
        this.router.navigate(['/catalogs/maintenance'], { relativeTo: this.route });
      }, (ex) => {
        this.toast.add({
          severity: 'error',
          detail: ex.error.message
        });
      });
    }
  }



}
