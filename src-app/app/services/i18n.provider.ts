import { LOCALE_ID, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
// use the require method provided by webpack
declare const require;

// return no providers if fail to get translation file for locale
const noProviders: Object[] = [];

function getLocale(): string {
  const obj = JSON.parse(localStorage.getItem('language'));
  return obj ? obj.locale : 'en';
}

export function getTranslationProviders(): Promise<Object[]> {
  let locale = getLocale();
  if (locale !== 'es') {
    return Promise.resolve(noProviders);
  }

  const translations = require('raw-loader!../../locale/messages.es.xlf').default;

  return Promise.resolve([
    { provide: TRANSLATIONS, useValue: translations },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
    { provide: LOCALE_ID, useValue: locale }
  ])
}
