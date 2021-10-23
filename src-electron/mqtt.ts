
import * as mosca from 'mosca';
import { Logger } from '@nestjs/common';
import { INestApplicationContext, HttpStatus, HttpException } from '@nestjs/common';
import { LogService } from './modules/logs/logs.service';
import { LogMapper } from "./modules/logs/models/log.mapper";
import { TransformerService } from './modules/transformers/transformers.service';

export class Mqtt {

  private logService: LogService
  private transformerService: TransformerService

  init(app: INestApplicationContext) {
    Logger.log("Mqtt.init", 'Mqtt');

    this.logService = app.get(LogService);
    this.transformerService = app.get(TransformerService);

    const moscaSettings = {
      port: 1883,
      persistence: mosca.persistence.Memory
    };

    var server = new mosca.Server(moscaSettings, function () {
      Logger.log('Mosca server is up and running', 'Mqtt')
    });

    server.on('clientConnected', function (client) {
      Logger.log('Client connected', 'Mqtt');
    });

    server.on('published', (packet, client) => {
      if (packet.topic == 'logs') {
        let log;
        if (packet.payload) {
          try {
            log = LogMapper.map(JSON.parse(packet.payload.toString()));
            this.logService.createLog(log);
          } catch (error) {
            console.error(error);
          }
        }
      }
      if (packet.topic == 'limits') {
        if (packet.payload) {
          try {
            this.transformerService.updateTransformerLimits(JSON.parse(packet.payload));
          } catch (e) {
            Logger.error(e, "TransformerController");
          }
        }
      }
    });



    server.on('ready', () => {
      Logger.log("Server ready", 'Mqtt');
    });

  }
}