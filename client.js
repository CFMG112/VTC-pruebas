var mqtt = require('mqtt');
var url = 'mqtt://localhost:1883';

const log = {
  "job": "TEST06",
  "tim": 10,
  "ot": 100,
  "wt": 100,
  "at": 100,
  "tp": 0.8,
  "ll": 100.8,
  "sp": 0,
  "pr": 0,
  "st": 3,
  "ct": 1.2
};

const limits = {
  "jobNumber": "TTS02",
  "tankPressureLimitsMin": -10,
  "tankPressureLimitsMax": 50,
  "ambientTemperatureLimitsMin": -50,
  "ambientTemperatureLimitsMax": 400,
  "liquidLevelLimitsMin": 0,
  "liquidLevelLimitsMax": 250,
  "oilTemperatureLimitsMin": -100,
  "oilTemperatureLimitsMax": 125,
  "windingTemperatureLimitsMin": -50,
  "windingTemperatureLimitsMax": 125,
};

var client = mqtt.connect(url)
client.on('connect', function () {
  console.log('connected');
  client.publish('logs', JSON.stringify(log));
  //client.publish('limits', JSON.stringify(limits));

  console.log('message sent');
  client.end()
})

