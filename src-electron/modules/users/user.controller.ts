import { ipcMain } from 'electron';
import { INestApplicationContext, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from '../../modules/users/user.service';
import { Logger } from '@nestjs/common';
import { getRandomPassword } from '../../shared/utilities/get-random-pw.helper';
import { MailService } from '../../shared/mail/mail.service';

export class UserController {
  private userService: UserService
  private mailService: MailService

  constructor(app: INestApplicationContext) {
    this.userService = app.get(UserService);
    this.mailService = app.get(MailService);

  }

  init() {

    ipcMain.handle("/users/login", async (event, args) => {
      return this.userService.login(args)
    })

    ipcMain.handle("/users/register", async (event, args) => {
      return this.userService.register(args)
    })

    ipcMain.handle("/users", async (event, ...args) => {
      const result = await this.userService.findAll();

      return result.map(el => el.get({ plain: true }));
    })

    ipcMain.handle("/users/filter", async (event, ...args) => {
      const result = await this.userService.findByFilter(args);

      return result.map(el => el.get({ plain: true }));
    })


    ipcMain.handle("/users/id", async (event, args) => {
      const result = await this.userService.findById(args);
      const user = result.get({ plain: true });
      return user;
    })

    ipcMain.handle("/users/delete", async (event, id) => {
      const result = await this.userService.delete(id);
      return result;
    })

    ipcMain.handle("/users/update", async (event, args) => {
      const result = await this.userService.update(args.id, args.obj);
      Logger.log(result)
      return result;
    })

    ipcMain.handle("/users/recoverpassword", async (event, args) => {
      const { username } = args;

      if (!username) {
        throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
      }

      const password = getRandomPassword();

      const updated = await this.userService.recoverPassword(username, password);
      await this.mailService.sendRecoverPasswordEmail(username, password);
      return updated
    })

    ipcMain.handle("/users/resetpassword", async (event, args) => {
      const { username, password, newpassword, newpassword2 } = args;

      if (!username) {
        throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
      }

      if (!password) {
        throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
      }
      if (!newpassword) {
        throw new HttpException('New password is required', HttpStatus.BAD_REQUEST);
      }

      if (!newpassword2) {
        throw new HttpException('Confirm new password is required', HttpStatus.BAD_REQUEST);
      }

      if (newpassword != newpassword2) {
        throw new HttpException('The passwords must match', HttpStatus.BAD_REQUEST);
      }

      const updated = await this.userService.resetPassword(args);
      return updated

    })






  }





}