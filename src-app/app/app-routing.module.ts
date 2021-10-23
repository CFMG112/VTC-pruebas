import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from './services/security.guard';

import { MainComponent } from './layout/main/main.component';
import { CleanComponent } from './layout/clean/clean.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ReportComponent } from './components/dashboard/report/report.component';
import { ReportTransformerDetailComponent } from './components/dashboard/report-transformer-detail/report-transformer-detail.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';
import { AccountComponent } from './components/accounts/account/account.component';
import { AccountDetailComponent } from './components/accounts/account-detail/account-detail.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserComponent } from './components/users/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { TransformersComponent } from './components/transformers/transformers.component';
import { TransformerComponent } from './components/transformers/transformer/transformer.component';
import { TransformerListComponent } from './components/transformers/transformer-list/transformer-list.component';
import { SitesComponent } from './components/sites/sites.component';
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
import { CitiesListComponent } from './components/cities/cities-list/cities-list.component';
import { CityComponent } from './components/cities/city/city.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminUserListComponent } from './components/admin-users/admin-user-list/admin-user-list.component';
import { AdminUserComponent } from './components/admin-users/admin-user/admin-user.component';
import { NextMaintencesComponent } from './components/maintenance/next-maintences/next-maintences.component';
import { CatalogsComponent } from './components/catalogs/catalogs.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: CleanComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot', component: ForgotpasswordComponent },
      { path: 'reset', component: ResetpasswordComponent },
    ]
  },
  {
    path: '', component: MainComponent, children: [
      { path: 'settings', component: SettingsComponent, canActivate: [SecurityGuard] },
      {
        path: 'dashboard', component: DashboardComponent, canActivate: [SecurityGuard], children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: ReportComponent, canActivate: [SecurityGuard] },
          { path: 'detail/:id', component: ReportTransformerDetailComponent, canActivate: [SecurityGuard] },
        ]
      },
      {
        path: 'users', component: AdminUsersComponent, canActivate: [SecurityGuard], children: [
          { path: '', redirectTo: 'user-list', pathMatch: 'full' },
          { path: 'user-list', component: AdminUserListComponent, canActivate: [SecurityGuard] },
          { path: 'user/create', component: AdminUserComponent, canActivate: [SecurityGuard] },
          { path: 'user/:id', component: AdminUserComponent, canActivate: [SecurityGuard] },
        ]
      },
      { path: 'next-maintenance', component: NextMaintencesComponent, canActivate: [SecurityGuard] },
      {
        path: 'accounts', component: AccountsComponent, canActivate: [SecurityGuard], children: [
          { path: '', redirectTo: 'account-list', pathMatch: 'full' },
          { path: 'account-list', component: AccountListComponent, canActivate: [SecurityGuard] },
          { path: 'create', component: AccountComponent, canActivate: [SecurityGuard] },
          { path: 'edit/:id', component: AccountComponent, canActivate: [SecurityGuard] },
          {
            path: 'detail/:id', component: AccountDetailComponent, canActivate: [SecurityGuard], children: [
              {
                path: 'users', component: UsersComponent, canActivate: [SecurityGuard], children: [
                  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
                  { path: 'user-list', component: UserListComponent, canActivate: [SecurityGuard] },
                  { path: 'user/create', component: UserComponent, canActivate: [SecurityGuard] },
                  { path: 'user/:id', component: UserComponent, canActivate: [SecurityGuard] },
                ]
              },
              {
                path: 'transformers', component: TransformersComponent, canActivate: [SecurityGuard], children: [
                  { path: '', redirectTo: 'transformer-list', pathMatch: 'full' },
                  { path: 'transformer-list', component: TransformerListComponent, canActivate: [SecurityGuard] },
                  { path: 'transformer/create', component: TransformerComponent, canActivate: [SecurityGuard] },
                  { path: 'transformer/:id', component: TransformerComponent, canActivate: [SecurityGuard] },
                ]
              },
              {
                path: 'sites', component: SitesComponent, canActivate: [SecurityGuard], children: [
                  { path: '', redirectTo: 'site-list', pathMatch: 'full' },
                  { path: 'site-list', component: SiteListComponent, canActivate: [SecurityGuard] },
                  { path: 'site/create', component: SiteComponent, canActivate: [SecurityGuard] },
                  { path: 'site/:id', component: SiteComponent, canActivate: [SecurityGuard] },
                ]
              },
            ]
          },
        ]
      },

      {
        path: 'my-account', component: AccountDetailComponent, canActivate: [SecurityGuard], children: [
          {
            path: '', redirectTo: 'transformers', pathMatch: 'full' 
          },
          {
            path: 'transformers', component: TransformersComponent, canActivate: [SecurityGuard], children: [
              { path: '', redirectTo: 'transformer-list', pathMatch: 'full' },
              { path: 'transformer-list', component: TransformerListComponent, canActivate: [SecurityGuard] },
              { path: 'transformer/:id', component: TransformerComponent, canActivate: [SecurityGuard] },
            ]
          },
          {
            path: 'sites', component: SitesComponent, canActivate: [SecurityGuard], children: [
              { path: '', redirectTo: 'site-list', pathMatch: 'full' },
              { path: 'site-list', component: SiteListComponent, canActivate: [SecurityGuard] },
              { path: 'site/create', component: SiteComponent, canActivate: [SecurityGuard] },
              { path: 'site/:id', component: SiteComponent, canActivate: [SecurityGuard] },
            ]
          },
        ]
      },
      {
        path: 'catalogs', component: CatalogsComponent, canActivate: [SecurityGuard], children: [
          { path: '', redirectTo: 'faqs', pathMatch: 'full' },
          {
            path: 'faqs', component: FaqsComponent, canActivate: [SecurityGuard], children: [
              { path: '', redirectTo: 'faq-list', pathMatch: 'full' },
              { path: 'faq-list', component: FaqListComponent, canActivate: [SecurityGuard] },
              { path: 'faq/create', component: FaqComponent, canActivate: [SecurityGuard] },
              { path: 'faq/:id', component: FaqComponent, canActivate: [SecurityGuard] },
            ]
          },
          {
            path: 'maintenance', component: MaintenanceComponent, canActivate: [SecurityGuard], children: [
              { path: '', redirectTo: 'maintenance-list', pathMatch: 'full' },
              { path: 'maintenance-list', component: MaintenanceListComponent, canActivate: [SecurityGuard] },
              { path: 'maintenance-detail/create', component: MaintenanceDetailComponent, canActivate: [SecurityGuard] },
              { path: 'maintenance-detail/:id', component: MaintenanceDetailComponent, canActivate: [SecurityGuard] },
            ]
          },
          {
            path: 'cities', component: CitiesComponent, canActivate: [SecurityGuard], children: [
              { path: '', redirectTo: 'cities-list', pathMatch: 'full' },
              { path: 'cities-list', component: CitiesListComponent, canActivate: [SecurityGuard] },
              { path: 'city/create', component: CityComponent, canActivate: [SecurityGuard] },
              { path: 'city/:id', component: CityComponent, canActivate: [SecurityGuard] },
            ]
          },
        ]
      },
      
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
