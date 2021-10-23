import { ipcMain } from 'electron';
import { INestApplicationContext, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SiteFilter } from './models/site-filter.model';

export class SitesController {
    private sitesService: SitesService

    constructor(app: INestApplicationContext) {
        this.sitesService = app.get(SitesService);
    }

    init() {

        ipcMain.handle("/sites", async (event, args) => {
            try {
                const result = await this.sitesService.findAll({});
                return result;

            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        })

        ipcMain.handle("/sites/action/filter", async (event, args) => {
            try {
                const result = await this.sitesService.findByFilter(args as SiteFilter);
                return result;
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        })

        ipcMain.handle("/sites/id", async (event, args) => {
            const result = await this.sitesService.findById(args);
            return result.get({ plain: true });
        })

        ipcMain.handle("/sites/delete", async (event, id) => {
            const result = await this.sitesService.delete(id);
            return result;
        })

        ipcMain.handle("/sites/create", async (event, args) => {

            let { name, accountId } = args;


            name = name.trim();
            let sites: any;
            try {
                let filter = {
                    'name': name,
                    'accountId': accountId,
                };
                sites = await this.sitesService.findAll({ filter: filter });
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            if (sites && sites.length) {
                throw new HttpException(`${name} already exists in this account`, HttpStatus.BAD_REQUEST);
            }

            return await this.sitesService.createSite(args);


        })


        ipcMain.handle("/sites/update", async (event, args) => {
            const result = await this.sitesService.update(args.id, args.obj);
            Logger.log(result)
            return result;
        })





    }

}