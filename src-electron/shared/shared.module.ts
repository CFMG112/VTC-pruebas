import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { MailService } from './mail/mail.service';
import { XlsxService } from './xlsx/xlsx.service';


@Global()
@Module({
    providers: [ConfigurationService, MailService, XlsxService],
    exports: [ConfigurationService, ],
    imports: [],
})
export class SharedModule {
}
