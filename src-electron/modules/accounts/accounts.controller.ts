import { ipcMain } from 'electron';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { AccountService } from './accounts.service';

export class AccountController {
  private accountService: AccountService

  constructor(app: INestApplicationContext) {
    this.accountService = app.get(AccountService);
  }

  init() {
    Logger.log("init", 'AccountController');

    ipcMain.handle("/accounts", async (event, ...args) => {
      const result = await this.accountService.findOne();
      return result?.get({ plain: true });
    })

    ipcMain.handle("/accounts/id", async (event, args) => {
      return await this.accountService.findById(args);
    })

    ipcMain.handle("/accounts/create", async (event, args) => {
      const result = await this.accountService.create(args);
      const account = result.get({ plain: true });
      return account;
    })

    ipcMain.handle("/accounts/update", async (event, args) => {
      const result = await this.accountService.update(args.id, args.obj);
      return result;
    })

  }

}