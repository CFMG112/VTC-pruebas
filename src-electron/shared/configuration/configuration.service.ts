import { Injectable } from '@nestjs/common';
import { get } from 'config';

@Injectable()
export class ConfigurationService {
    private environmentHosting: string = process.env.NODE_ENV || 'development';

    get(name: string): string {
        return process.env[name] || get(name);
    }

    getInt(name: string): number {
        const value = this.get(name);
        return parseInt(value, 10);
    }

    get isDevelopment(): boolean {
        return this.environmentHosting === 'development';
    }
}
