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
  brandName: string
  productName: string
  packageHeight: string
  packageWidth: string
  uValue: string
  certification: ProductCertification
}

export interface RemoteSuccessProductData {
  type: 'SUCCESS'
  pip: Product
  certification: ProductCertification
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
