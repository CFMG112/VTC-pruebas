export const getTransformerLimits = (transformer: any): any => {
    return {
        oilTemperatureLimits: {
            min: transformer.oilTemperatureLimitsMin,
            max: transformer.oilTemperatureLimitsMax
        },
        ambientTemperatureLimits: {
            min: transformer.ambientTemperatureLimitsMin,
            max: transformer.ambientTemperatureLimitsMax
        },
        windingTemperatureLimits: {
            min: transformer.windingTemperatureLimitsMin,
            max: transformer.windingTemperatureLimitsMax
        },
        tankPressureLimits: {
            min: transformer.tankPressureLimitsMin,
            max: transformer.tankPressureLimitsMax
        },
        liquidLevelLimits: {
            min: transformer.liquidLevelLimitsMin,
            max: transformer.liquidLevelLimitsMax
        },
    };
}