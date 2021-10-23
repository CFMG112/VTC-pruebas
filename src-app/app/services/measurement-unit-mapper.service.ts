import { Injectable } from '@angular/core';
import { PreferencesService } from '@services/preferences.service';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitMapper {

  constructor(private preferences: PreferencesService) { }

  /**
   * Checks the selected language in the preferences 
   * to get the measurement system to use
   */
  getMapperUnits() {
    const { locale } = this.preferences.getLanguage();
    if (locale === "es") {
      return Units.METRIC
    } else {
      return Units.IMPERIAL
    }
  }

  mapLogUnits(log: any) {
    const units = this.getMapperUnits();
    if (units === Units.IMPERIAL) {
      log.oilTemperature = this.celsiusToFahrenheit(log.oilTemperature);
      log.ambientTemperature = this.celsiusToFahrenheit(log.ambientTemperature);
      log.windingTemperature = this.celsiusToFahrenheit(log.windingTemperature);
    } else {
      log.tankPressure = this.psiToKPa(log.tankPressure);
      log.liquidLevel = this.inchesToCentimeters(log.liquidLevel);
    }
    return log;
  }

  mapTransformerLimits(transformer: any) {
    const units = this.getMapperUnits();
    if (units === Units.IMPERIAL) {
      this.mapLimits(transformer.oilTemperatureLimits, this.celsiusToFahrenheit);
      this.mapLimits(transformer.windingTemperatureLimits, this.celsiusToFahrenheit);
      this.mapLimits(transformer.ambientTemperatureLimits, this.celsiusToFahrenheit);
       
    } else {
      this.mapLimits(transformer.tankPressureLimits, this.psiToKPa);
      this.mapLimits(transformer.liquidLevelLimits, this.inchesToCentimeters);
    }
  }

  getMeasurementUnitLabels() {
    const units = this.getMapperUnits();
    if (units === Units.IMPERIAL) {
      return {
        oilTemperature: 'Fahrenheit',
        windingTemperature: 'Fahrenheit',
        ambientTemperature: 'Fahrenheit',
        tankPressure: 'PSI',
        liquidLevel: 'Inches'
      }
    } else {
      return {
        oilTemperature: 'Centígrados',
        windingTemperature: 'Centígrados',
        ambientTemperature: 'Centígrados',
        tankPressure: 'kPa',
        liquidLevel: 'Centímetros'
      }
    }
  }

  getShortMeasurementUnitLabels() {
    const units = this.getMapperUnits();
    if (units === Units.IMPERIAL) {
      return {
        oilTemperature: 'ºF',
        windingTemperature: 'ºF',
        ambientTemperature: 'ºF',
        tankPressure: 'psi',
        liquidLevel: 'in'
      }
    } else {
      return {
        oilTemperature: 'ºC',
        windingTemperature: 'ºC',
        ambientTemperature: 'ºC',
        tankPressure: 'kPa',
        liquidLevel: 'cm'
      }
    }
  }

  private mapLimits(limits: any, mappingFunction: Function) {
    const { min, max } = limits;
    limits.min = mappingFunction(min);
    limits.max = mappingFunction(max);
  }

  private inchesToCentimeters(inches: number) {
    return inches? (inches * 2.54) : 0;
  }

  private psiToKPa(psi: number) {
    return psi? (psi * 6.895): 0;
  }

  private celsiusToFahrenheit(celsius: number) {
    return celsius? (celsius * 9/5) + 32: 0;
  }
}

export const enum Units {
  METRIC,
  IMPERIAL
}
