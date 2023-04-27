import httpClient from '@api/httpClient'
import axios from 'axios'
import { productApi } from '@api'
import type {
  Barcode,
  ProductLinksSetResponse,
  RemoteProductData,
} from '@models/product'
import { getProductDataLinks, getProductInfoByGSLink } from '@tools/product'
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

  if (!Object.values(links.pip).some(val => !!val)) {
    return { type: 'ERROR' }
  }

  const productData = await getProductInfoByGSLink(links.pip)

  const certificationData = await productApi
    .getProductDataByLink(links.certification)
    .catch(error => {
      if (error.response.data === 'Ok') {
        return 'Ok'
      }
      return null
    })

  return { type: 'SUCCESS', pip: productData, certification: certificationData }
}

const getProductDataByLink = async (link: string) => {
  const res = await axios.get(link)

  return res.data
}

export default {
  getProductData,
  getProductDataByLink,
}
