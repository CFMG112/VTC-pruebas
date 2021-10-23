import { Expose } from 'class-transformer';

export class TransformerLimits {

    @Expose()
    jobNumber: string;

    @Expose()
    oilTemperatureLimitsMin: number;

    @Expose()
    oilTemperatureLimitsMax: number;

    @Expose()
    windingTemperatureLimitsMin: number;

    @Expose()
    windingTemperatureLimitsMax: number;

    @Expose()
    ambientTemperatureLimitsMin: number;

    @Expose()
    ambientTemperatureLimitsMax: number;

    @Expose()
    tankPressureLimitsMin: number;

    @Expose()
    tankPressureLimitsMax: number;
    
    @Expose()
    liquidLevelLimitsMin: number;

    @Expose()
    liquidLevelLimitsMax: number;
}
