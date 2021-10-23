import { ipcMain } from 'electron';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { CountryService } from '../../modules/countries/countries.service';

export class CountryController {
  private countryService: CountryService

  constructor(app: INestApplicationContext) {
    this.countryService = app.get(CountryService);
  }

  init() {
    Logger.log("init", 'CountriesController');

    ipcMain.handle("/countries", async (event, ...args) => {
      const result = await this.countryService.findAll(args);
      return result.map(el => el.get({ plain: true }));
    })

    ipcMain.handle("/countries/id", async (event, args) => {
      const result = await this.countryService.findById(args);
      const country = result.get({ plain: true });
      return country;
    })

    ipcMain.handle("/countries/create", async (event, args) => {
      const result = await this.countryService.create(args);
      const country = result.get({ plain: true });
      return country;
    })

    ipcMain.handle("/countries/update", async (event, args) => {
      const result = await this.countryService.update(args.id, args.obj);
      return result;
    })

    ipcMain.handle("/countries/delete", async (event, id) => {
      const result = await this.countryService.delete(id);
      return result;
    })

  }

}