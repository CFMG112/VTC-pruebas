import { UserController } from './modules/users/user.controller';
import { FaqController } from './modules/faqs/faq.controller';
import { AccountController } from "./modules/accounts/accounts.controller";
import { MaintenceController } from './modules/maintenance/maintenance.controller';
import { CountryController } from './modules/countries/countries.controller';
import { StatesController } from './modules/states/states.controller';
import { CitiesController } from './modules/cities/cities.controller';

import { Logger } from '@nestjs/common';
import { SitesController } from './modules/sites/sites.controller';
import { TransformerController } from './modules/transformers/transformer.controller';
import { TransformerMaintenanceController } from './modules/transformer-maintenances/transformer-maintenances.controller';
import { LogsController } from './modules/logs/logs.controller';


export class Router {
  init(app) {
    Logger.log("init", "Router");

    new UserController(app).init();
    new FaqController(app).init();
    new AccountController(app).init();
    new CitiesController(app).init();
    new StatesController(app).init();
    new CountryController(app).init();
    new MaintenceController(app).init();
    new SitesController(app).init();
    new TransformerController(app).init();
    new TransformerMaintenanceController(app).init();
    new LogsController(app).init()
  }
}
