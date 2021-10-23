import { ipcMain } from 'electron';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { StatesService } from '../../modules/states/states.service';

export class StatesController{
  private statesService: StatesService

  constructor(app: INestApplicationContext){
    this.statesService = app.get(StatesService);
  }

  init(){
    Logger.log("init", 'StatesController');

    ipcMain.handle("/states", async (event, ...args) => {
      const result = await this.statesService.findAll(args);
      return result.map(el => el.get({ plain: true }));
    })

    ipcMain.handle("/states/id", async (event, args) => {
      const result = await this.statesService.findById(args);
      const country = result.get({ plain: true });
      return country;
    })

    ipcMain.handle("/states/create", async (event, args) => {
      const result = await this.statesService.create(args);
      const country = result.get({ plain: true });
      return country;
    })

    ipcMain.handle("/states/update", async (event, args) => {
      const result = await this.statesService.update(args.id, args.obj);
      return result;
    })

    ipcMain.handle("/states/delete", async (event, id) => {
      const result = await this.statesService.delete(id);
      return result;
    })

  }
  
}