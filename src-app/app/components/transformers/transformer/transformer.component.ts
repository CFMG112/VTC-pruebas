import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';
import { TransformerStateService } from '@services/transformer-state.service';
import { SecurityService } from '@services/security.service';
import { MessageService } from 'primeng/api';
import { PreferencesService } from '@app/services/preferences.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transformer',
  templateUrl: './transformer.component.html',
  styleUrls: ['./transformer.component.css']
})
export class TransformerComponent implements OnInit {

  transformerId: string;
  accountId: string;
  action: string;
  sites: any[];
  maintenances: Array<any>;
  maintenance: any;
  addDisplay: boolean;
  editDisplay: boolean;
  deleteDisplay: boolean;
  expirationDate: Date = new Date();
  adminPermissions: boolean;
  selectedMaintenance: any;
  lang: any;
  local: any;
  siteLabel: any;
  maintenceLabel: any;
  url:string;
  from:string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: SecurityService,
    private toast: MessageService,
    private preferencesService: PreferencesService,
    private location: Location,
    public transformerStateService:TransformerStateService
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {

    this.lang = this.preferencesService.getLanguage() || {};

    this.url = this.location.path();

    this.route.queryParams.subscribe(params => {
      console.log('from', params['from']);
      this.from = params['from'];
    });

    if (this.lang.locale == 'es') {
      this.siteLabel = "Seleccionar sitio"
      this.maintenceLabel = "Selecciona un mantenimiento"
      this.local = {

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

      }
    } else {
      this.siteLabel = "No site assigned"
      this.maintenceLabel = "Select a Maintenance"
      this.local = {
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
      }
    }



    this.auth.getAccount().then(data => {
      console.log(data)
      if (data) {
        this.accountId = data.id
      } else {
        this.accountId = data.id
      }
    }).catch(e => {
      console.log(e.message)
    })
    this.adminPermissions = this.auth.hasPermisions(['admin']);

    this.onFindSites({
      'accountId': this.accountId
    });

    this.onFindMaintenances();

    this.transformerId = this.route.snapshot.paramMap.get('id');
    if (this.transformerId != "create") {
      this.action = 'edit';
      this.findTransformer();

    } else {
      this.action = 'create';
      if(!this.transformerStateService.transformer){
        this.transformerStateService.transformer = {};
      }
      this.transformerStateService.transformer.nameplate = {}
      this.onFindPredefinedMaintenances()
    }
  }

  onFindSites(params?: any) {
    this.dataService.findByFilter('/sites', params).then(res => {
      this.sites = res.map((item: any) => {
        return { label: item.name, value: item.id }
      });
      this.sites.unshift({ label: this.siteLabel });
    });
  }

  onFindMaintenances() {
    this.dataService.findByFilter('/maintenances', {}).then(res => {
      this.maintenances = res.map((item: any) => {
        return { label: item.type, value: item };
      });

      this.maintenances.unshift({ label: this.maintenceLabel });

    },
      error => {
        console.log(error);
        this.displayError(error.error.message,error);
      })

  }

  onFindPredefinedMaintenances() {
    this.dataService.findByFilter('/maintenances/filter', { filterByPredefined: true, predefined: true }).then(res => {
      this.transformerStateService.transformer.maintenances = []
      res.map((item: any) => {
        this.transformerStateService.transformer.maintenances.push({
          id: item.id,
          type: item.type,
          description: item.description,
          predefined: item.predefined,
          status: false,
          maintenanceId: item.id,
        })

      });
    },
      error => {
        console.log(error);
        this.displayError(error.error.message,"error");
      })

  }
  findTransformer() {
    this.dataService.findById('/transformers/id', this.transformerId).then(async data => {
      if (!data.nameplate) {
        data.nameplate = {}
      }
      let offsetWithEST = -5 - this.getTimezoneOffsetInHours();
      const maintenances = await this.dataService.findByFilter('maintences/transformers-maintences', { id: data.id })
      console.log(maintenances)
      data.maintenances = maintenances;
      data.maintenances.forEach(m => {
        m.expirationDate = new Date(m.expirationDate)// To EST
      });
      this.transformerStateService.transformer = data;
      this.transformerStateService.transformer.commissioningDate = data.commissioningDate ? new Date(data.commissioningDate) : null;

      data.maintenances.forEach(m => {
        m.type = m.maintenance.type
        m.description = m.maintenance.description
      });
      this.transformerStateService.transformer.shippingDate = data.shippingDate ? new Date(data.shippingDate) : null;

      console.log(this.transformerStateService.transformer)
    }, (err) => {
      console.error(err);
    })
  }

  onShowMaintenance() {
    this.addDisplay = true;
  }
  onEditShowMaintenance(item) {
    this.editDisplay = true;
    this.selectedMaintenance = item

  }

  onRemoveMaintenance(index) {
    if (this.transformerStateService.transformer.maintenances) {
      this.transformerStateService.transformer.maintenances.splice(index, 1);
    }
  }


  onSaveEditMaintenance() {
    const objIndex = this.transformerStateService.transformer.maintenances.findIndex((obj => obj == this.selectedMaintenance));

    this.transformerStateService.transformer.maintenances[objIndex] = {
      expirationDate: this.expirationDate,
      type: this.selectedMaintenance.type,
      description: this.selectedMaintenance.description,
      predefined: this.selectedMaintenance.predefined,
      maintenanceId: this.selectedMaintenance.maintenanceId,
      status: false
    }
    this.back();
    this.editDisplay = false;
  }

  onAddMaintenance() {
    console.log("onAddMaintenance", this.maintenance);

    if (!this.transformerStateService.transformer.maintenances) {
      this.transformerStateService.transformer.maintenances = [];
    }
    this.transformerStateService.transformer.maintenances.push({
      expirationDate: this.expirationDate,
      type: this.maintenance.type,
      description: this.maintenance.description,
      status: false,
      maintenanceId: this.maintenance.id,
    })
    this.addDisplay = false;
  }

  save() {
    

    this.lang = this.preferencesService.getLanguage() || {};
    console.log(this.transformerStateService.transformer.nameplate)
    this.transformerStateService.transformer.accountId = this.accountId;
    const unvalid = this.transformerStateService.transformer.maintenances.find(maint => !maint.expirationDate);

    if (unvalid) {
      if (this.lang.locale == 'es') {
        this.displayError("Faltan fechas en los mantenimientos","error")
      }else{
        this.displayError("You are missing dates on the maintenances","error");
      }
    } else {
      const { locale } = this.preferencesService.getLanguage();
      const spanishMsg = 'El número de trabajo está en uso';
      const englishMsg = 'Job number already in use';
      const spanishMsgSucc= 'Success';
      const englishMsgSucc = 'Success';
      const errorMsg = locale == 'es' ? spanishMsg : englishMsg;
      const SuccMsg = locale == 'es' ? spanishMsgSucc : englishMsgSucc;
      if (this.action == 'edit') {
        this.dataService.updateOne('/transformers', this.transformerId, this.transformerStateService.transformer).then(() => {
          this.router.navigate(['../../transformer-list'], { relativeTo: this.route })
          this.transformerStateService.transformer= null;
        }).catch(e => {
          this.displayError(SuccMsg,"error");
        })
      }
      if (this.action == 'create') {
        
        this.dataService.insertOne('/transformers', this.transformerStateService.transformer).then(() => {
          this.router.navigate(['../../transformer-list'], { relativeTo: this.route })
          this.transformerStateService.transformer= null;
          this.displayError(SuccMsg,"success");
        }).catch(e => {
          console.log(e);
          this.displayError(errorMsg,"error");
        });
      }
      this.onBack();
    }


  }

  onCancel(){
    this.transformerStateService.transformer= null;
    this.router.navigate(['../../transformer-list'], { relativeTo: this.route });
  }

  onBack(){
    this.transformerStateService.transformer= null;
    this.router.navigate(['../../transformer-list'], { relativeTo: this.route });
  }

  back(){
    //[routerLink]="['../../site-list']"
    if(this.from){
      console.log("A")
      this.router.navigate([this.from]);
    }else{
      console.log("B")
      this.router.navigate(['../../transformer-list'], { relativeTo: this.route });
    }
  }

  displayError(error: string,ty:string) {
    this.toast.add({
      severity: ty,
      summary: ty,
      detail: error
    });
  }



  getTimezoneOffsetInHours() {
    return -(new Date().getTimezoneOffset()) / 60;
  }

}
