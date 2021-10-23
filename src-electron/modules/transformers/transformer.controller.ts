import { ipcMain } from 'electron';
import { INestApplicationContext, HttpStatus, HttpException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { TransformerService } from './transformers.service';
import { TransformerMaintenance } from '../transformer-maintenances/models/transformer-maintenace.model';
import { TransformerMaintenanceService } from '../transformer-maintenances/transformer-maintenances.service';
import { TransformerFilter } from './models/transformer-filter.model';

export class TransformerController {
    private transformerService: TransformerService
    private transformerMaintenanceService: TransformerMaintenanceService


    constructor(app: INestApplicationContext) {
        this.transformerService = app.get(TransformerService);
        this.transformerMaintenanceService = app.get(TransformerMaintenanceService);
    }

    init() {
        ipcMain.handle("/transformers", async (event, ...args) => {
            const result = await this.transformerService.findAll({});
            return result
        })

        ipcMain.handle("/transformers/action/filter/", async (event, ...args) => {
            const filter = args.length > 0? args[0] : {};
            const result = await this.transformerService.findByFilter(filter as TransformerFilter);
            return result;
        })

        ipcMain.handle("/transformers/maintences", async (event, args) => {
            const result = await this.transformerMaintenanceService.findTransformerMaintenances(args);
            return result.map(el => el.get({ plain: true }));
        })


        ipcMain.handle("/transformers/id", async (event, args) => {
            const result = await this.transformerService.findById(args);
            return result.get({ plain: true });
        })

        ipcMain.handle("/transformers/create", async (event, args) => {
            const result = await this.transformerService.createTransformer(args);
            return result;
        })

        ipcMain.handle("/transformers/update", async (event, args) => {
            const result = await this.transformerService.updateTransformer(args.obj);
            return result;
        })

        ipcMain.handle("/transformers/delete", async (event, id) => {
            const result = await this.transformerService.delete(id);
            return result;
        })

    }

}