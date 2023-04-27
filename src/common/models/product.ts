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

export interface RemoteSuccessProductData {
  type: 'SUCCESS'
  pip: {
    en: any
    sv: any
  }
  certification: any
}

export type RemoteProductError = 'NO-PIP'

export interface RemoteErrorProductData {
  type: 'ERROR'
}

export interface ProductData {
  en: PipData
  sv: PipData
}

export type UseProductData = UseProductSuccessData | UseProductErrorData

export interface UseProductErrorData {
  type: 'NOT_PROJECT'
}

export interface UseProductSuccessData {
  type: 'SUCCESS'
  pip: {
    en: PipData
    enAvailable: boolean
    sv: PipData
    svAvailable: boolean
  }
  certification: {
    en: Certification
    enAvailable: boolean
    sv: Certification
    svAvailable: boolean
  }
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
