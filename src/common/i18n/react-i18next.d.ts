declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof import('@i18n').defaultNS
    resources: typeof import('@i18n').resources['en']
  }
}

export {}
