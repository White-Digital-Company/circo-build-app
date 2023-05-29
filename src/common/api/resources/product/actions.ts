import httpClient from '@api/httpClient'
import type {
  Barcode,
  GSProduct,
  Product,
  ProductCertification,
  ProductLinksSetResponse,
  RemoteProductData,
} from '@models/product'
import { getPipDataFromGSProduct, getProductDataLinks } from '@tools/product'
import { generateRequestLinkByBarcode, getCodeByBarcode } from '@tools/barcode'
import axios from 'axios'
import productPip from '@constants/jsonId2.json'

const getProductData = async (barcode: Barcode): Promise<RemoteProductData> => {
  const code = getCodeByBarcode(barcode)

  if (productPip['@type'] === 'gs1:Product') {
    const data = getPipDataFromGSProduct(productPip)

    return {
      type: 'SUCCESS',
      pip: {
        gtin: code,
        ...data,
      },
      certification: null,
    }
  }

  const requestLink = generateRequestLinkByBarcode(barcode)

  const { data } = await httpClient.get<ProductLinksSetResponse>(requestLink, {
    params: {
      linkType: 'all',
    },
  })

  const links = getProductDataLinks(data, code)

  if (!links.pip) {
    return { type: 'ERROR' }
  }

  const { data: productData } = await axios.get<Product>(links.pip)

  let certificationData: ProductCertification | null = null

  if (links.certification) {
    const { data } = await axios.get<ProductCertification>(
      links.certification ?? '',
    )
    certificationData = data
  }

  return {
    type: 'SUCCESS',
    pip: productData,
    certification: certificationData ?? null,
  }
}

export default {
  getProductData,
}
