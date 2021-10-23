import { ipcMain } from 'electron';
import { INestApplicationContext, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { LogService } from './logs.service';
import { LogHistoryService } from './log-history.service';

export class LogsController {
    private _service: LogService
    private _historyService: LogHistoryService

    constructor(app: INestApplicationContext) {
        this._service = app.get(LogService);
        this._historyService = app.get(LogHistoryService);
    }

    init() {

        ipcMain.handle("/logs", async (event, args) => {

            try {
                return await this._service.findAll();
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });


        ipcMain.handle("/logs/create", async (event, args) => {
            try {
                return await this._service.createLog(args);
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        });


        ipcMain.handle("/logs/update", async (event, args) => {
            try {
                return await this._service.updateLog(args);
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });


        ipcMain.handle("/logs/delete", async (event, args) => {
            try {
                return await this._service.delete(args);
            } catch (e) {
                throw new InternalServerErrorException(e);
            }
        })

        ipcMain.handle("/logs/action/filter", async (event, args) => {

            try {
                return await this._service.findTransformerLastLogs(args);
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });


        ipcMain.handle("/logs/id", async (event, args) => {

            try {
                return await this._service.findById(args);
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        });

        ipcMain.handle("/logs/action/history", async (event, args) => {
            try {
                return await this._historyService.findLogHistory(args);
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        });



    }


}