import { Log } from './models/log.model';
import { LogStatus } from './models/log-status.enum';
import { Transformer } from '../transformers/models/transformer.model';
import { Logger } from '@nestjs/common';

export const getStatus = (log: Log, transformer: Transformer) : LogStatus => {

    // Maps each log value with its reference transformer limits
    const valueLimitsMapping = [{
            value: log.ambientTemperature,
            limits: {
                min: transformer.ambientTemperatureLimitsMin,
                max: transformer.ambientTemperatureLimitsMax
            }
        },
        {
            value: log.liquidLevel,
            limits: {
                min: transformer.liquidLevelLimitsMin,
                max: transformer.liquidLevelLimitsMax
            }
        },
        {
            value: log.tankPressure,
            limits: {
                min: transformer.tankPressureLimitsMin,
                max: transformer.tankPressureLimitsMax
            }
        },
        {
            value: log.oilTemperature,
            limits: {
                min: transformer.oilTemperatureLimitsMin,
                max: transformer.oilTemperatureLimitsMax
            }
        },
        {
            value: log.windingTemperature,
            limits: {
                min: transformer.windingTemperatureLimitsMin,
                max: transformer.windingTemperatureLimitsMax
            }
        }
    ];

    // First we check for danger values
    for (const sensor of valueLimitsMapping) {
        if (isDangerValue(sensor.value, sensor.limits)) {
            return LogStatus.Danger;
        }
    }

    // Then we check for warning values
    for (const sensor of valueLimitsMapping) {
        if (isWarningValue(sensor.value, sensor.limits)) {
            return LogStatus.Warning;
        }
    }

    // If everything is normal
    return LogStatus.Normal;
}

const isDangerValue = (value: number, limits: any) => {
    return (value < limits.min || value > limits.max);
}

const isWarningValue = (value: number, limits: any) => {
    const THRESHOLD_PERCENTAGE = 0.20;
    const tolerance = (limits.max - limits.min) * THRESHOLD_PERCENTAGE;
    return (value < (limits.min + tolerance) || value > (limits.max - tolerance));
}