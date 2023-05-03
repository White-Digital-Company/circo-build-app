import { productUrls } from '@api'
import type { Barcode } from '@models/product'

export const getCodeByBarcode = (barcode: Barcode) => {
  if (barcode.type === 'URL') {
    if (barcode.data.includes('portal.nordan.no')) {
      const barcodeUrl = new URL(barcode.data)
      const queryParams = barcodeUrl.searchParams

      return queryParams.get('gtin')
    }

    if (barcode.data.includes('id.nordan.com')) {
      const barcodeData = barcode.data.split('/')

      return barcodeData.find(val => val.replace(/[a-z]/g, '').length > 12)
    }

    const barcodeData = barcode.data.split('/')

    return barcodeData.find(el => el.length > 12) ?? ''
  }

  return barcode.data
}

export const generateRequestLinkByBarcode = (barcode: Barcode) => {
  if (barcode.type === 'URL') {
    if (barcode.data.includes('portal.nordan.no')) {
      const barcodeUrl = new URL(barcode.data)
      const queryParams = barcodeUrl.searchParams

      return productUrls.root(queryParams.get('gtin')!)
    }

    if (barcode.data.includes('id.nordan.com')) {
      const barcodeData = barcode.data.split('/')

      return productUrls.root(
        barcodeData.find(val => val.replace(/[a-z]/g, '').length > 12)!,
      )
    }

    const barcodeData = barcode.data.split('/')

    return productUrls.root(
      barcodeData
        .slice(
          barcodeData.findIndex(val => val.replace(/[a-z]/g, '').length > 12),
        )
        .join('/'),
    )
  }

  return productUrls.root(barcode.data)
}
