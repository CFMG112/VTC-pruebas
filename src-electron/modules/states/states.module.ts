import { Module } from '@nestjs/common';
import { countryRepository } from './states.providers';
import { StatesService } from './states.service';

@Module({
    imports: [  ],
    controllers: [  ],
    providers: [
        countryRepository,
        StatesService
    ],
    exports: [StatesService]
})
export class StatesModule { }
