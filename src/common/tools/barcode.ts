import { productUrls } from '@api'
import type { Barcode } from '@models/product'

export const getCodeByBarcode = (barcode: Barcode) => {
  if (barcode.type === 'URL') {
    const barcodeData = barcode.data.split('/')

    return barcodeData.find(el => el.length > 12) ?? ''
  }

  return barcode.data
}

export const generateRequestLinkByBarcode = (barcode: Barcode) => {
  if (barcode.type === 'URL') {
    const barcodeData = barcode.data.split('/')
    return productUrls.root(
      barcodeData
        .slice(barcodeData.findIndex(val => val.length > 12))
        .join('/'),
    )
  }

  return productUrls.root(barcode.data)
}
