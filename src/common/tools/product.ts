import {
  GS_KEY_TO_PRODUCT_PIP,
  PRODUCT_CERTIFICATION_AGENCY,
} from '@constants/product'
import type { GSProduct, Link, ProductLinksSetResponse } from '@models/product'
import { getPathArrayFromString, setObjectProperty } from './common'

export const getProductDataLinks = (
  data: ProductLinksSetResponse,
  barcode: string,
) => {
  const productLinks: { pip: string; certification: string } = {
    pip: '',
    certification: '',
  }

  for (const links of data.linkset) {
    if (links.anchor.includes(barcode)) {
      for (const [key, value] of Object.entries(links)) {
        if (key === `https://gs1.org/voc/pip`) {
          const pipLinks = value.filter((link: Link) => !!link.href)

          if (pipLinks.length > 0) {
            productLinks.pip = pipLinks[0].href
          }
        }

        if (key === 'https://gs1.org/voc/certificationInfo') {
          const certificationLinks = value.filter((link: Link) => !!link.href)

          if (certificationLinks.length > 0) {
            productLinks.certification = certificationLinks[0].href
          }
        }
      }
    }
  }

  return productLinks
}

export const isProjectCertificationName = (name: string): boolean => {
  if (name.toLowerCase() === PRODUCT_CERTIFICATION_AGENCY.toLowerCase()) {
    return true
  }

  return false
}

// const setParamsToObject

export const getPipDataFromGSProduct = (product: any) => {
  let productData: any = {}

  for (const [key, value] of Object.entries(GS_KEY_TO_PRODUCT_PIP)) {
    const productPath = getPathArrayFromString(key)

    const valueData = product[productPath[0]]

    if (!valueData) {
      continue
    }

    if (key === 'image' && product[key] && product[key].referencedFileURL) {
      Object.assign(productData, {
        [value]: product[key].referencedFileURL,
      })
    }

    if (Array.isArray(valueData)) {
      const info = valueData.find(data => data['@language'] === 'sv')

      const infoValue = info ? info['@value'] : null

      Object.assign(productData, {
        [value]: infoValue,
      })
    }

    if (valueData['@language'] && valueData['@language'] === 'sv') {
      Object.assign(productData, {
        [value]: valueData['@value'],
      })
    }

    if (valueData['@type'] && productPath[1] && valueData[productPath[1]]) {
      const valueInfo = valueData[productPath[1]]

      if (Array.isArray(valueInfo)) {
        const info = valueInfo.find(data => data['@language'] === 'sv')

        const infoValue = info ? info['@value'] : null

        Object.assign(productData, {
          [value]: infoValue,
        })
      } else {
        const infoValue =
          valueInfo && valueInfo['@language'] === 'sv'
            ? valueInfo['@value']
            : null

        Object.assign(productData, {
          [value]: infoValue,
        })
      }
    }

    if (valueData['@type'] && valueData['unitCode']) {
      const valueInfo = valueData['value']['@value']

      Object.assign(productData, {
        [value]: `${valueInfo} ${valueData['unitCode']}`,
      })
    }
  }

  const securityData = {
    encryptionAlgorithm: productData.encryptionAlgorithm ?? '',
    administrationProtocol: productData.administrationProtocol ?? '',
    verificationProtocol: productData.verificationProtocol ?? '',
    AuthenticationProtocol: productData.AuthenticationProtocol ?? '',
  }

  return { ...productData, securityData }
}
