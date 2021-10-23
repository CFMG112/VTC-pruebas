import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { USER_REPOSITORY } from './user.provider';
import { User } from "./models/user.model";
import { Register } from "./models/register.model";
import { LoginResponse } from "./models/login-response.model";
import { LoginParams } from "./models/login-params.model";
import { compare, genSalt, hash } from 'bcryptjs';
import { sign, SignOptions } from 'jsonwebtoken';
import { Logger } from '@nestjs/common';
import { AccountService } from '../accounts/accounts.service';
import { Op, Sequelize } from 'sequelize';


@Injectable()
export class UserService {

  jwtKey = 'gBhuxbY1mswxzQGR';
  jwtOptions = { expiresIn: '12h' };

  constructor(
    @Inject(USER_REPOSITORY) private readonly db: typeof User,
    private accountService: AccountService

  ) {
  }

  async findAll(): Promise<User[]> {
    return this.db.findAll({});
  }

  async findByFilter(params: any): Promise<User[]> {
    return this.db.findAll({
      where: Sequelize.or(
        {
          firstName: {
            [Op.substring]: params[0].fullname
          }
        },
        {
          lastName: {
            [Op.substring]: params[0].fullname
          }
        },
        {
          username: {
            [Op.substring]: params[0].email
          }
        }
      )
    });
  }

  async create(obj: any): Promise<User> {
    return this.db.create(obj);
  }

  async findOne(id: any): Promise<User> {
    return this.db.findOne(id);
  }

  async findById(id: number): Promise<User> {
    return this.db.findByPk(id);
  }

  async update(id: any, obj: any): Promise<[number, User[]]> {
    return this.db.update(obj, {
      where: { id }
    });
  }
  async delete(id: any): Promise<number> {
    return this.db.destroy({
      where: {
        id
      },
      cascade: true
    });
  }

  async login(params: LoginParams): Promise<LoginResponse> {
    const { username, password } = params;
    const result = await this.findOne({ where: { username: username } });

    if (!result) {
      return Promise.reject({ code: 'USER_NOT_FOUND', message: 'User Not Found' });
    }
    const user = result.get({ plain: true }) as User;
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return Promise.reject({ code: 'INVALID_CREDENTIALS', message: 'Invalid Credentials' });
    }

    const payload = {
      username: user.username
    };

    const token = await this.signPayload(payload);

    const account = await this.accountService.findOne();
    user.accountId = account.id;

    return {
      token,
      user,
    } as any;
  }

  async register(vm: Register) {
    const { username, password, firstName, lastName, accountId } = vm;
    const newUser = {
      username: username.trim().toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      accountId: accountId
    } as any;

    const salt = await genSalt(10);
    newUser.password = await hash(password, salt);

    try {
      const result = await this.create(newUser);
      return result.toJSON() as User;
    } catch (e) {
      return Promise.reject({ code: 'INTERNAL_ERROR', message: 'Error on creating user', e: e });
    }
  }

  async signPayload(payload: any): Promise<string> {
    return sign(payload, this.jwtKey, this.jwtOptions);
  }

  async recoverPassword(username: string, newPassword: string) {

    let user: User;
    let result;
    try {
      result = await this.findOne({ where: { username: username } });
      user = result.get({ plain: true }) as User;

    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }



    if (!user) {
      throw new HttpException(`${username} User does not exist`, HttpStatus.BAD_REQUEST);
    }

    try {
      const salt = await genSalt(10);
      user.password = await hash(newPassword, salt);
      await this.update(user.id, user);
      console.log(user.password)
      return { msg: "Success" }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async resetPassword(params) {
    const { username, password, newpassword } = params;

    let user: User;
    let result;
    try {
      result = await this.findOne({ where: { username: username } });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!result) {
      throw new HttpException(`${username} User does not exist`, HttpStatus.BAD_REQUEST);
    }
    user = result.get({ plain: true }) as User;

    const isMatch = await compare(password, user.password);

    if (isMatch) {
      const salt = await genSalt(10);
      user.password = await hash(newpassword, salt);

      try {
        await this.update(user.id, user);
        return { msg: "Success" }

      } catch (e) {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }

    } else {
      throw new HttpException(`${username} Bad credentials`, HttpStatus.BAD_REQUEST);
    }
  }


}


