import { ipcMain } from 'electron';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { CitiesService } from '../../modules/cities/cities.service';

export class CitiesController{
  private citiesService: CitiesService

  constructor(app: INestApplicationContext){
    this.citiesService = app.get(CitiesService);
  }

  init(){
    Logger.log("init", 'CountriesController');

    ipcMain.handle("/cities", async (event, ...args) => {
      const result = await this.citiesService.findAll(args);
      return result.map(el => el.get({ plain: true }));
    })

    ipcMain.handle("/cities/filter/states", async (event, ...args) => {
      const result = await this.citiesService.findByFilter(args);
      return result.map(el => el.get({ plain: true }));
    })

    ipcMain.handle("/cities/id", async (event, args) => {
      const result = await this.citiesService.findById(args);
      const country = result.get({ plain: true });
      return country;
    })

    ipcMain.handle("/cities/create", async (event, args) => {
      const result = await this.citiesService.create(args);
      const country = result.get({ plain: true });
      return country;
    })

    ipcMain.handle("/cities/update", async (event, args) => {
      const result = await this.citiesService.update(args.id, args.obj);
      return result;
    })

    ipcMain.handle("/cities/delete", async (event, id) => {
      const result = await this.citiesService.delete(id);
      return result;
    })

  }
  
}