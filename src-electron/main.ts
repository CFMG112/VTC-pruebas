import { AppModule } from './app.module';
import { Router } from "./routes";
import { Mqtt } from "./mqtt";
import { existsSync, mkdirSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from './database.module';
import { app, BrowserWindow } from 'electron';
import { Maintence } from './mintence';

class Main {
  static async init() {
    AppModule.init(app, BrowserWindow);

    const dbDir = './db';
    if (!existsSync(dbDir)) {
      mkdirSync(dbDir);
    }

    const database = await NestFactory.createApplicationContext(DatabaseModule);
    new Maintence(database).init()
    new Router().init(database);
    new Mqtt().init(database);
  }
}

Main.init();
