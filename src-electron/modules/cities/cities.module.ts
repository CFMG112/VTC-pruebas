import { Module, HttpModule } from '@nestjs/common';
import { cityRepository, cityViewRepository } from './cities.providers';
import { CitiesService } from './cities.service';

@Module({
    imports: [ HttpModule ],
    controllers: [  ],
    providers: [
        cityRepository,
        cityViewRepository,
        CitiesService
    ],
    exports: [CitiesService]
})
export class CitiesModule { }
