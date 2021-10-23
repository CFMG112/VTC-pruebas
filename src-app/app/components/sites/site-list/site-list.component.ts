import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { MessageService } from 'primeng/api';
import { PreferencesService } from '@app/services/preferences.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  display: boolean;
  confirm: string;
  site: any;
  sites: any[];
  filter: any;
  searchFilterDelay: any;
  spanishMsgErr = 'No se puede eliminar el sitio porque tiene transformadores asignados';
  englishMsgErr = 'Can not delete the site because it has assigned transformers';
  spanishMsgSucc = 'Eliminacion exitosa';
  englishMsgSucc = 'Success delete';
  

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
    this.onFindSites({});
  }

  async onFindSites(params?: any) {
    await this.dataService.findByFilter('/sites/action/filter', params).then(res => {
      this.sites = res.data;
    });
    this.onFindCountryAndState()
  }

  onFilter() {
    clearTimeout(this.searchFilterDelay);
    this.searchFilterDelay = setTimeout(() => {
      this.onFindSites({
        name: this.filter,
        country: this.filter,
        state: this.filter,
        city: this.filter,
        address: this.filter
      });
    }, 500);
  }


  onFindCountryAndState() {
    this.sites.forEach(element => {
      element.address = element['address.address'];
      element.city = element['address.city.city'];
      element.state = element['address.state.state'];
      element.country = element['address.country.country'];
    });
  }


  onDeleteDialog(site: any) {
    this.site = site;
    this.display = true;
  }

  delete(id: String) {
    const { locale } = this.preferences.getLanguage();
    this.dataService.deleteOne('/sites', id)
      .then(_ => {
        this.onFind();
        const { locale } = this.preferences.getLanguage();
        const SuccMsg = locale == 'es' ? this.spanishMsgSucc : this.englishMsgSucc;
        this.displayError(SuccMsg,'success');
      })
      .catch(error => {
        console.log(error);
        const errorMsg = locale == 'es' ? this.spanishMsgErr : this.englishMsgErr;
        this.displayError(errorMsg,'error');
      })
      .finally(() => {
        this.display = false;
        this.confirm = '';
      });
      this.reloadCurrentRoute();
  }

  displayError(error: string,ty:string) {
    this.toast.add({
      severity: ty,
      summary: ty,
      detail: error
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
