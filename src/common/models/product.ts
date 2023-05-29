export interface ProductLinksSetResponse {
  linkset: ProductLinks[]
}

export type BarcodeType = 'URL' | 'CODE'

export interface Barcode {
  type: BarcodeType
  data: string
}

export interface ProductLinks {
  anchor: string
  itemDescription: string
  unixtime: number
  'https://gs1.org/voc/defaultLink': Link[]
  'https://gs1.org/voc/pip': Link[]
  'https://gs1.org/voc/defaultLinkMulti': Link[]
  'https://gs1.org/voc/hasRetailers': Link[]
  'https://gs1.org/voc/productSustainabilityInfo': Link[]
  'https://gs1.org/voc/recipeInfo': Link[]
  'https://gs1.org/voc/traceability': Link[]
}

export interface Link {
  href: string
  type: string
  hreflang?: string[]
}

export interface ProductLink {
  en: string
  sv?: string
}

export interface RemotePipData {
  en: any
  sv: any
}

export type RemoteProductData =
  | RemoteSuccessProductData
  | RemoteErrorProductData

export interface ProductCertification {
  agency: string
  subject: string
  license: string
  module: string
  gwp: string
}

export interface Product {
  gtin: string
  brandName?: string
  productName?: string
  packageHeight?: string
  packageWidth?: string
  packageWeight?: string //
  uValue?: string
  certification?: ProductCertification
  brandOwner?: string
  frequencyBand?: string
  spreadSpectrum?: string
  energyConsuption?: string
  energyConsumption?: string
  packageDepth?: string
  warrantyScopeDescription?: string
  durationOfWarranty?: string
  image?: string
  securityData?: {
    encryptionAlgorithm: string
    administrationProtocol: string
    verificationProtocol?: string
    AuthenticationProtocol?: string
  }
}

export interface RemoteSuccessProductData {
  type: 'SUCCESS'
  pip: Product
  certification: ProductCertification | null
}

export type RemoteProductError = 'NO-PIP'

export interface RemoteErrorProductData {
  type: 'ERROR'
}

export interface ProductData {
  en: PipData
  sv: PipData
}

export interface PipData {
  brand?: string
  subbrand?: string
  owner?: string
  productName?: string
  packageSize?: string
  packageDepth?: string
  packageHeight?: string
  packageWidth?: string
  grossWeight?: string
  countryOfOriginStatement?: string
  image?: string
  markedLabel?: string
}

export interface Certification {
  status: string
  license?: string
  subject?: string
  agency?: string
  url?: string
}

export type GSType = 'gs1:Product'

export type GSLanguage = 'en' | 'sv'

export interface GSValue {
  '@value': string
  '@language': GSLanguage
}

export interface GSDataWithType {
  '@type': string
  [key: string]: GSValue[] | string
}

export type GSData = GSValue | GSValue[] | GSDataWithType

export interface GSUnitValue {
  value: {
    '@value': string
    '@type': string
  }
  unitCode: string
  '@type': string
}

export interface GSImage {
  referencedFileURL: string
  filePixelHeight: number
  filePixelWidth: number
  '@type': string
}

export interface GSProduct {
  '@context': {
    gs1: 'http://gs1.org/voc/'
    schema: 'https://schema.org/'
    '@vocab': 'http://gs1.org/voc/'
  }
  '@type': GSType
  '@id': string
  brand?: GSData
  brandOwner?: GSData
  productName?: GSData
  Frekvensband?: GSData
  Speridningsspectrum?: GSData
  inPackageHeight: GSUnitValue
  inPackageWidth: GSUnitValue
  inPackageDepth: GSUnitValue
  grossWeight: GSUnitValue
  energiFörbrukning: GSUnitValue
  Krypteringsalgoritm?: GSData
  Administrationsprotokoll?: GSData
  Verifieringsprotokoll?: GSData
  image: GSImage
}

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`

export type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`
      }[Exclude<keyof T, symbol>]
    : ''
) extends infer D
  ? Extract<D, string>
  : never
