import { Module, HttpModule } from '@nestjs/common';
import { countryRepository } from './countries.providers';
import { CountryController } from './countries.controller';
import { CountryService } from './countries.service';

@Module({
    imports: [  ],
    controllers: [  ],
    providers: [
        countryRepository,
        CountryService
    ],
    exports: [CountryService]

})
export class CountriesModule { }
