import { ipcMain } from 'electron';
import { INestApplicationContext, HttpStatus, HttpException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { TransformerMaintenance } from '../transformer-maintenances/models/transformer-maintenace.model';
import { TransformerMaintenanceService } from './transformer-maintenances.service';

export class TransformerMaintenanceController {

  private transformerMaintenanceService: TransformerMaintenanceService


  constructor(app: INestApplicationContext) {
    this.transformerMaintenanceService = app.get(TransformerMaintenanceService);


  }

  init() {

    ipcMain.handle("maintences/transformers-maintences/catalog", async (event, args) => {
      console.log(args);
      const result = await this.transformerMaintenanceService.findAll(args);
      return result.map(el => el.get({ plain: true }));
    })

    ipcMain.handle("maintences/transformers-maintences", async (event, args) => {
      console.log(args);
      const result = await this.transformerMaintenanceService.findTransformerMaintenances(args);
      return result.map(el => el.get({ plain: true }));
    })

    ipcMain.handle("maintences/transformers-maintences/update", async (event, args) => {
      const result = await this.transformerMaintenanceService.update(args.id, args.obj);
      return result;
    })




  }

}
