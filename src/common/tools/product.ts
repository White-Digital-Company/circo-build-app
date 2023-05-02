import { PRODUCT_CERTIFICATION_AGENCY } from '@constants/product'
import type { Link, ProductLinksSetResponse } from '@models/product'

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
