import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { environment } from '@environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { NgxElectronModule } from 'ngx-electron';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanAccessDirective } from './directives/can-access.directive';

import { CleanComponent } from './layout/clean/clean.component';
import { MainComponent } from './layout/main/main.component';
import { FooterComponent } from './layout/main/footer/footer.component';
import { HeaderComponent } from './layout/main/header/header.component';
import { MenuComponent } from './layout/main/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ReportComponent } from './components/dashboard/report/report.component';
import { ReportTotalsComponent } from './components/dashboard/report-totals/report-totals.component';
import { ReportTransformerDetailComponent } from './components/dashboard/report-transformer-detail/report-transformer-detail.component';
import { ReportTransformerListComponent } from './components/dashboard/report-transformer-list/report-transformer-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';
import { AccountComponent } from './components/accounts/account/account.component';
import { AccountDetailComponent } from './components/accounts/account-detail/account-detail.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserComponent } from './components/users/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { SitesComponent } from './components/sites/sites.component';
import { TransformersComponent } from './components/transformers/transformers.component';
import { TransformerComponent } from './components/transformers/transformer/transformer.component';
import { TransformerListComponent } from './components/transformers/transformer-list/transformer-list.component';
import { SiteComponent } from './components/sites/site/site.component';
import { SiteListComponent } from './components/sites/site-list/site-list.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { FaqComponent } from './components/faqs/faq/faq.component';
import { FaqListComponent } from './components/faqs/faq-list/faq-list.component';
import { ForgotpasswordComponent } from './components/login/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/login/resetpassword/resetpassword.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { MaintenanceListComponent } from './components/maintenance/maintenance-list/maintenance-list.component';
import { MaintenanceDetailComponent } from './components/maintenance/maintenance-detail/maintenance-detail.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityComponent } from './components/cities/city/city.component';
import { CitiesListComponent } from './components/cities/cities-list/cities-list.component';

import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminUserListComponent } from './components/admin-users/admin-user-list/admin-user-list.component';
import { AdminUserComponent } from './components/admin-users/admin-user/admin-user.component';
import { NextMaintencesComponent } from './components/maintenance/next-maintences/next-maintences.component';
import { CatalogsComponent } from './components/catalogs/catalogs.component';


@NgModule({
  declarations: [
    AppComponent,
    CanAccessDirective,
    CleanComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ReportTotalsComponent,
    ReportTransformerDetailComponent,
    ReportTransformerListComponent,
    ReportComponent,
    SettingsComponent,
    AccountsComponent,
    AccountListComponent,
    AccountComponent,
    AccountDetailComponent,
    UsersComponent,
    UserListComponent,
    UserComponent,
    SitesComponent,
    TransformersComponent,
    TransformerComponent,
    TransformerListComponent,
    SiteComponent,
    SiteListComponent,
    FaqsComponent,
    FaqComponent,
    FaqListComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    MaintenanceComponent,
    MaintenanceListComponent,
    MaintenanceDetailComponent,
    CitiesComponent,
    CityComponent,
    CitiesListComponent,
    AdminUsersComponent,
    AdminUserListComponent,
    AdminUserComponent,
    NextMaintencesComponent,
    CatalogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DropdownModule,
    CalendarModule,
    ChartModule,
    ToastModule,
    CheckboxModule,
    PaginatorModule,
    DialogModule,
    MenuModule,
    ProgressSpinnerModule,
    NgxElectronModule,
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
