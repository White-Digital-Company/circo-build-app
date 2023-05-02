import httpClient from '@api/httpClient'
import type {
  Barcode,
  Product,
  ProductCertification,
  ProductLinksSetResponse,
  RemoteProductData,
} from '@models/product'
import { getProductDataLinks } from '@tools/product'
import { generateRequestLinkByBarcode, getCodeByBarcode } from '@tools/barcode'

const getProductData = async (barcode: Barcode): Promise<RemoteProductData> => {
  const requestLink = generateRequestLinkByBarcode(barcode)

  const code = getCodeByBarcode(barcode)

  const { data } = await httpClient.get<ProductLinksSetResponse>(requestLink, {
    params: {
      linkType: 'all',
    },
  })

  const links = getProductDataLinks(data, code)

  if (!links.pip) {
    return { type: 'ERROR' }
  }

  const { data: productData } = await httpClient.get<Product>(links.pip)

  const { data: certificationData } =
    await httpClient.get<ProductCertification>(links.certification ?? '')

  return {
    type: 'SUCCESS',
    pip: productData,
    certification: certificationData ?? null,
  }
}

export default {
  getProductData,
}
