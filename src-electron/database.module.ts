import { Module } from '@nestjs/common';
import { FaqModule } from './modules/faqs/faq.module';
import { UserModule } from './modules/users/user.module';
import { AccountModule } from "./modules/accounts/accounts.module";
import { AddressModule } from "./modules/address/address.module";
import { CountriesModule } from "./modules/countries/countries.module";
import { StatesModule } from "./modules/states/states.module";
import { CitiesModule } from "./modules/cities/cities.module";


import { MaintenanceModule } from "./modules/maintenance/maintenance.module";

import { Sequelize } from 'sequelize-typescript';
import { SharedModule } from "./shared/shared.module";

import { Log } from './modules/logs/models/log.model';
import { Faq } from './modules/faqs/models/faq.model';
import { City } from './modules/cities/models/city.model';
import { State } from './modules/states/models/state.model';
import { Country } from './modules/countries/models/country.model';
import { Address } from './modules/address/models/address.model';
import { Account } from './modules/accounts/models/account.model';
import { User } from './modules/users/models/user.model';
import { Site } from './modules/sites/models/site.model';
import { Nameplate } from './modules/nameplates/models/nameplate.model';
import { Maintenance } from './modules/maintenance/models/maintenance.model';
import { Transformer } from './modules/transformers/models/transformer.model';
import { TransformerMaintenance } from './modules/transformer-maintenances/models/transformer-maintenace.model';
import { MaintenanceView } from './modules/maintenance/models/maintenance-view.model';
import { SitesModule } from './modules/sites/sites.module';
import { SiteView } from './modules/sites/models/site-vew.model';
import { TransformerView } from './modules/transformers/models/transformer-view.model';
import { TransformerMaintenanceModule } from './modules/transformer-maintenances/transformer-maintenances.module';
import { NameplatesModule } from './modules/nameplates/nameplates.module'
import { LogModule } from './modules/logs/logs.module';
import { TransformerLogView } from './modules/logs/models/log-view.model';
// import { ConfigurationService } from './shared/configuration/configuration.service';
// import { Configuration } from './shared/configuration/configuration.enum';

export const databaseConnection = {
  provide: 'SEQUELIZE',
  import: [SharedModule],
  inject: [],
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: "./db/database.sqlite",
      logging: false,
      models: [
        Faq, City, State, Country, Address, Account,
        User, Site, Nameplate, Maintenance, Transformer,
        TransformerMaintenance, Log, MaintenanceView, SiteView, TransformerView, TransformerLogView
      ]
    });
    await sequelize.sync();
    return sequelize;
  },
};

@Module({
  imports: [
    SharedModule,
    FaqModule,
    UserModule,
    AccountModule,
    AddressModule,
    CountriesModule,
    StatesModule,
    MaintenanceModule,
    CitiesModule,
    SitesModule,
    TransformerMaintenanceModule,
    NameplatesModule,
    LogModule


  ],
  providers: [databaseConnection],
  exports: [databaseConnection],
})
export class DatabaseModule { }