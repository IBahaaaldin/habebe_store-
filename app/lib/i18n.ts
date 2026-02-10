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
  // This gets "AR" from "/ar"
  const firstPathPart = url.pathname.split('/')[1]?.toUpperCase();

  const supportedLocales: Record<string, I18nBase> = {
    CA: { language: 'EN', country: 'CA' },
    GB: { language: 'EN', country: 'GB' },
    JP: { language: 'JA', country: 'JP' },
    // ADD YOUR ARABIC LOCALE HERE
    AR: { language: 'AR', country: 'AE' }, // Use 'CA' if your Shopify market is set to Canada
  };

  if (firstPathPart && supportedLocales[firstPathPart]) {
    return supportedLocales[firstPathPart];
  }

  return { language: 'EN', country: 'US' };
}