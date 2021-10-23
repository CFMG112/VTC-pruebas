import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MissingTranslationStrategy } from '@angular/core';
import { getTranslationProviders } from '@services/i18n.provider';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

getTranslationProviders().then(((providers: any) => {
  platformBrowserDynamic().bootstrapModule(AppModule, {
    missingTranslation: MissingTranslationStrategy.Warning,
    providers: providers
  }).catch(err => console.error(err));
}));
