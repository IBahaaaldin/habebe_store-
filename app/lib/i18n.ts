import type {I18nBase} from '@shopify/hydrogen';

// export function getLocaleFromRequest(request: Request): I18nBase {
//   const defaultLocale: I18nBase = {language: 'EN', country: 'US'};
//   const supportedLocales = {
//     ES: 'ES',
//     FR: 'FR',
//     DE: 'DE',
//     JP: 'JA',
//   } as Record<I18nBase['country'], I18nBase['language']>;

//   const url = new URL(request.url);
//   const firstSubdomain = url.hostname
//     .split('.')[0]
//     ?.toUpperCase() as keyof typeof supportedLocales;

//   return supportedLocales[firstSubdomain]
//     ? {language: supportedLocales[firstSubdomain], country: firstSubdomain}
//     : defaultLocale;
// }


export function getLocaleFromRequest(request: Request): I18nBase {
  const url = new URL(request.url);
  const firstPathPart = url.pathname.split('/')[1]?.toUpperCase();

  const supportedLocales: Record<string, I18nBase> = {
    CA: { language: 'EN', country: 'CA' },
    GB: { language: 'EN', country: 'GB' },
    JP: { language: 'JA', country: 'JP' },
  };

  // If the URL is habebe.store/ca, this returns the CA config
  if (firstPathPart && supportedLocales[firstPathPart]) {
    return supportedLocales[firstPathPart];
  }

  // Default to US/USD
  return { language: 'EN', country: 'US' };
}