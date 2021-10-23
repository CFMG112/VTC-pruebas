import { ipcMain } from 'electron';
import { INestApplicationContext, HttpException, HttpStatus } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';

export class MaintenceController {
    private maintenceService: MaintenanceService

    constructor(app: INestApplicationContext) {
        this.maintenceService = app.get(MaintenanceService);
    }

    init() {

        ipcMain.handle("/maintenances", async (event, args) => {

            try {
                const res = await this.maintenceService.findAll(args);
                return res.map(el => el.get({ plain: true }));
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        })

        ipcMain.handle("/maintenances/filter", async (event, args) => {
            try {
                const res = await this.maintenceService.findByFilter(args);
                return res.map(el => el.get({ plain: true }));
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        })

        ipcMain.handle("/maintenances/id", async (event, args) => {
            const result = await this.maintenceService.findById(args);
            return result.get({ plain: true });
        })

        ipcMain.handle("/maintenances/create", async (event, args) => {
            const result = await this.maintenceService.create(args);

            return result.get({ plain: true });

        })

        ipcMain.handle("/maintenances/update", async (event, args) => {

            const result = await this.maintenceService.update(args.id, args.obj);
            return result.get({ plain: true });
        })

        ipcMain.handle("/maintenances/delete", async (event, id) => {
            const result = await this.maintenceService.delete(id);
            return result.get({ plain: true });
        })
    }

}