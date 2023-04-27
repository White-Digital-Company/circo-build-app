import { productApi } from '@api'
import { PRODUCT_CERTIFICATION_AGENCY } from '@constants/product'
import type {
  Link,
  ProductLinksSetResponse,
  ProductLink,
  PipData,
  ProductData,
  RemotePipData,
} from '@models/product'
// @ts-ignore
import DOMParser from 'react-native-html-parser'

export const AVAILABLE_LANGUAGES: ['en', 'sv', 'se'] = ['en', 'sv', 'se']

export const PIP_KEYS = [
  'brand',
  'subbrand',
  'owner',
  'productName',
  'packageSize',
  'packageDepth',
  'packageHeight',
  'packageWidth',
  'grossWeight',
  'countryOfOriginStatement',
  'image',
  'markedLabel',
]

export const REQUIRED_PIP_KEY = ['brand', 'owner', 'productName', 'image']

export const REQUIRED_CERTIFICAITON_KEY = ['status', 'license']

export const getProductDataLinks = (
  data: ProductLinksSetResponse,
  barcode: string,
) => {
  const productLinks: { pip: ProductLink; certification: string } = {
    pip: {
      en: '',
      sv: '',
    },
    certification: `https://api.nordicecolabel.org/gtin/${barcode}`,
  }
  for (const links of data.linkset) {
    if (links.anchor.includes(barcode)) {
      for (const [key, value] of Object.entries(links)) {
        if (key === `https://gs1.org/voc/pip`) {
          const pipLinks = value.filter(
            (link: Link) =>
              !link.hreflang ||
              link.hreflang.some(
                (lang: string) => lang === 'en' || lang === 'sv',
              ),
          )

          productLinks.pip = Object.fromEntries(
            // eslint-disable-next-line unicorn/no-array-reduce
            pipLinks.reduce((acc: any[], link: Link) => {
              if (
                link.hreflang &&
                !acc.some((val: any) => val[0] === link.hreflang![0])
              ) {
                acc.push([link.hreflang[0], link.href])

                return acc
              }

              if (!acc.some((val: any) => val[0] === 'en')) {
                acc.push(['en', link.href])
              }

              return acc
            }, []),
          ) as ProductLink
        }
      }
    }
  }

  if (!productLinks.pip.sv) {
    productLinks.pip.sv = productLinks.pip.en
  }

  return productLinks
}

export const getProductInfoByGSLink = async (
  links: ProductLink,
): Promise<RemotePipData> => {
  const parser = new DOMParser.DOMParser()

  const productData = {}

  for (const [key, value] of Object.entries(links)) {
    const inputPipData = [
      await productApi.getProductDataByLink(value),
      await productApi
        .getProductDataByLink(`${value}/pip_example.html`)
        .catch(() => null),
    ].map(data => {
      if (!data) {
        return data
      }

      if (typeof data === 'string') {
        const parsed = parser.parseFromString(data, 'text/html')
        const scriptData = parsed.querySelect(
          'script=[type="application/ld+json"]',
        )

        for (const script of scriptData) {
          try {
            const parsedData = JSON.parse(script.childNodes['0'].data)
            if (Array.isArray(parsedData) && parsedData[0]['@context'].gs1) {
              return parsedData[0]
            }
            if (parsedData['@context'].gs1) {
              return parsedData
            }
          } catch (error) {
            console.log('parse error:', error)
          }
        }

        return null
      }

      return data
    })

    Object.assign(productData, { [key]: inputPipData })
  }

  return productData as RemotePipData
}

export const getCertificationDataFromResponse = (data: any) => {
  if (!data || data === 'Ok') {
    return {
      sv: null,
      en: null,
    }
  }

  if (data.value && data.value.certificationDetails.length > 0) {
    const certificationDetails = data.value.certificationDetails[0]

    const certificaionInfo: any = {
      sv: {},
      en: {},
    }

    if (
      certificationDetails.certificationStatus &&
      certificationDetails.certificationStatus.length > 0
    ) {
      const statuses = certificationDetails.certificationStatus.filter(
        (status: any) => AVAILABLE_LANGUAGES.includes(status['@language']),
      )

      for (const status of statuses) {
        const lang = status['@language']
        const value = status['@value']

        if (lang === 'se') {
          Object.assign(certificaionInfo['sv'], { status: value ? value : '' })
        } else {
          Object.assign(certificaionInfo[lang], { status: value ? value : '' })
        }
      }
    }

    if (
      certificationDetails.certificationAgency &&
      certificationDetails.certificationAgency.length > 0
    ) {
      const agencies = certificationDetails.certificationAgency.filter(
        (agency: any) => AVAILABLE_LANGUAGES.includes(agency['@language']),
      )

      for (const agency of agencies) {
        const lang = agency['@language']
        const value = agency['@value']

        if (lang === 'se') {
          Object.assign(certificaionInfo['sv'], { agency: value ? value : '' })
        } else {
          Object.assign(certificaionInfo[lang], { agency: value ? value : '' })
        }
      }
    }

    if (
      certificationDetails.certificationSubject &&
      certificationDetails.certificationSubject.length > 0
    ) {
      const subjects = certificationDetails.certificationSubject.filter(
        (subject: any) => AVAILABLE_LANGUAGES.includes(subject['@language']),
      )

      for (const subject of subjects) {
        const lang = subject['@language']
        const value = subject['@value']

        if (lang === 'se') {
          Object.assign(certificaionInfo['sv'], { subject: value ? value : '' })
        } else {
          Object.assign(certificaionInfo[lang], { subject: value ? value : '' })
        }
      }
    }

    if (
      certificationDetails.certificationIdentification &&
      certificationDetails.certificationIdentification.length > 0
    ) {
      const licenses = certificationDetails.certificationIdentification.filter(
        (license: any) => AVAILABLE_LANGUAGES.includes(license['@language']),
      )

      for (const license of licenses) {
        const lang = license['@language']
        const value = license['@value']

        if (lang === 'se') {
          Object.assign(certificaionInfo['sv'], { license: value ? value : '' })
        } else {
          Object.assign(certificaionInfo[lang], { license: value ? value : '' })
        }
      }
    }

    if (
      certificationDetails.referencedFileURL &&
      certificationDetails.referencedFileURL.length > 0
    ) {
      const urls = certificationDetails.referencedFileURL.filter((url: any) =>
        AVAILABLE_LANGUAGES.includes(url['@language']),
      )

      for (const url of urls) {
        const lang = url['@language']
        const value = url['@value']

        if (lang === 'se') {
          Object.assign(certificaionInfo['sv'], { url: value ? value : '' })
        } else {
          Object.assign(certificaionInfo[lang], { url: value ? value : '' })
        }
      }
    }

    return certificaionInfo
  }
}

export const getPipDataByProductInfo = (data: any[]): ProductData => {
  const pipDataArr = data.map(pip => {
    if (!pip) {
      return null
    }

    if (
      pip['@type'] === 'gs1:Product' ||
      pip['@type'].includes('gs1:Product') ||
      pip['@type'] === 's:Product' ||
      pip['@type'].includes('s:Product')
    ) {
      return getProductDataByType(pip)
    }

    if (pip['@type'] === 'gs1:Offer' || pip['@type'].includes('gs1:Offer')) {
      return getProductDataByType(pip.itemOffered)
    }

    return null
  })

  return connectProductDataArrToPip(pipDataArr)
}

export const connectProductDataArrToPip = (data: any[]) => {
  const firstPip = data[0]
  const secondPip = data[1]

  if (!firstPip && !secondPip) {
    return null
  }

  if (!firstPip && secondPip) {
    return secondPip
  }

  if (firstPip && !secondPip) {
    return firstPip
  }

  const productPip: { en: PipData; sv: PipData } = {
    en: {},
    sv: {},
  }

  for (const key of PIP_KEYS) {
    for (const lang of AVAILABLE_LANGUAGES) {
      if (lang !== 'se') {
        const firstValue = firstPip[lang][key]
        const secondValue = secondPip[lang][key]

        if (!firstValue && secondValue) {
          Object.assign(productPip[lang], { [key]: secondValue })
        }

        if (firstValue && !secondValue) {
          Object.assign(productPip[lang], { [key]: firstValue })
        }

        if (firstValue && secondValue) {
          Object.assign(productPip[lang], { [key]: firstValue })
        }
      }
    }
  }

  return productPip
}

export const getProductDataByType = (pip: any) => {
  if (pip['@type'] === 'gs1:Product' || pip['@type'].includes('gs1:Product')) {
    return mapProductWithTypeGS(pip)
  }

  if (pip['@type'] === 's:Product' || pip['@type'].includes('s:Product')) {
    return mapProductWithTypeS(pip)
  }

  if (
    pip['@type'] === 'gs1:FoodBeverageTobaccoProduct' ||
    pip['@type'].includes('gs1:FoodBeverageTobaccoProduct')
  ) {
    return mapProductWithTypeTobaccoProduct(pip)
  }
}

export const mapProductWithTypeGS = (pipData: any) => {
  const productPip: any = {
    en: {},
    sv: {},
  }

  if (pipData.brand) {
    if (pipData.brand.brandName) {
      const pipBrands = pipData.brand.brandName.filter((brands: any) =>
        AVAILABLE_LANGUAGES.includes(brands['@language']),
      )

      for (const brand of pipBrands) {
        const lang = brand['@language']
        const value = brand['@value']

        Object.assign(productPip[lang], { brand: value ? value : '' })
      }
    }
    if (pipData.brand.subBrandName) {
      const pipSubBrands = pipData.brand.subBrandName.filter((subbrands: any) =>
        AVAILABLE_LANGUAGES.includes(subbrands['@language']),
      )

      for (const subbrand of pipSubBrands) {
        const lang = subbrand['@language']
        const value = subbrand['@value']

        Object.assign(productPip[lang], { subbrand: value ? value : '' })
      }
    }
  }

  if (pipData.brandOwner) {
    if (
      pipData.brandOwner.organizationName &&
      pipData.brandOwner.organizationName.length > 0
    ) {
      const pipBrandOwners = pipData.brandOwner.organizationName.filter(
        (owners: any) => AVAILABLE_LANGUAGES.includes(owners['@language']),
      )

      for (const owner of pipBrandOwners) {
        const lang = owner['@language']
        const value = owner['@value']

        Object.assign(productPip[lang], { owner: value ? value : '' })
      }
    } else if (pipData.brandOwner['@id']) {
      Object.assign(productPip['en'], { owner: pipData.brandOwner['@id'] })
      Object.assign(productPip['sv'], { owner: pipData.brandOwner['@id'] })
    }
  }

  if (pipData.productName) {
    if (Array.isArray(pipData.productName)) {
      const names = pipData.productName.filter((name: any) =>
        AVAILABLE_LANGUAGES.includes(name['@language']),
      )

      for (const name of names) {
        const lang = name['@language']
        const value = name['@value']

        Object.assign(productPip[lang], {
          productName: value ? value : '',
        })
      }
    } else {
      const lang = pipData.productName['@language']
      const value = pipData.productName['@value']

      Object.assign(productPip[lang], {
        productName: value ? value : '',
      })
    }
  }

  if (pipData.inPackageDepth) {
    Object.assign(productPip['en'], {
      packageDepth: `${pipData.inPackageDepth.value['@value']} ${pipData.inPackageDepth.unitCode}`,
    })
    Object.assign(productPip['sv'], {
      packageDepth: `${pipData.inPackageDepth.value['@value']} ${pipData.inPackageDepth.unitCode}`,
    })
  }

  if (pipData.inPackageHeight) {
    Object.assign(productPip['en'], {
      packageHeight: `${pipData.inPackageHeight.value['@value']} ${pipData.inPackageHeight.unitCode}`,
    })
    Object.assign(productPip['sv'], {
      packageHeight: `${pipData.inPackageHeight.value['@value']} ${pipData.inPackageHeight.unitCode}`,
    })
  }

  if (pipData.inPackageWidth) {
    Object.assign(productPip['en'], {
      packageWidth: `${pipData.inPackageWidth.value['@value']} ${pipData.inPackageWidth.unitCode}`,
    })
    Object.assign(productPip['sv'], {
      packageWidth: `${pipData.inPackageWidth.value['@value']} ${pipData.inPackageWidth.unitCode}`,
    })
  }

  if (pipData.grossWeight) {
    Object.assign(productPip['en'], {
      grossWeight: `${pipData.grossWeight.value['@value']} ${pipData.grossWeight.unitCode}`,
    })
    Object.assign(productPip['sv'], {
      grossWeight: `${pipData.grossWeight.value['@value']} ${pipData.grossWeight.unitCode}`,
    })
  }

  if (
    pipData.countryOfOriginStatement &&
    pipData.countryOfOriginStatement.length > 0
  ) {
    const countries = pipData.countryOfOriginStatement.filter((country: any) =>
      AVAILABLE_LANGUAGES.includes(country['@language']),
    )

    for (const country of countries) {
      const lang = country['@language']
      const value = country['@value']

      Object.assign(productPip[lang], {
        countryOfOriginStatement: value ? value : '',
      })
    }
  }

  if (pipData.image) {
    if (pipData.image.referenceFileURL) {
      Object.assign(productPip['en'], {
        image:
          pipData.image.referenceFileURL['@id'] ??
          pipData.image.referenceFileURL,
      })
      Object.assign(productPip['sv'], {
        image:
          pipData.image.referenceFileURL['@id'] ??
          pipData.image.referenceFileURL,
      })
    } else {
      Object.assign(productPip['en'], {
        image:
          pipData.image.referencedFileURL['@id'] ??
          pipData.image.referencedFileURL,
      })
      Object.assign(productPip['sv'], {
        image:
          pipData.image.referencedFileURL['@id'] ??
          pipData.image.referencedFileURL,
      })
    }
  }

  if (pipData.packagingMarkedLabelAccreditation) {
    let value = Array.isArray(pipData.packagingMarkedLabelAccreditation)
      ? pipData.packagingMarkedLabelAccreditation[0].value ||
        pipData.packagingMarkedLabelAccreditation[0]['@id']
      : pipData.packagingMarkedLabelAccreditation.value ||
        pipData.packagingMarkedLabelAccreditation['@id']

    if (value.includes('gs1:PackagingMarkedLabelAccreditationCode-')) {
      value = value.replace('gs1:PackagingMarkedLabelAccreditationCode-', '')
    }

    Object.assign(productPip['en'], {
      markedLabel: value ? value : '',
    })
    Object.assign(productPip['sv'], {
      markedLabel: value ? value : '',
    })
  }

  return productPip
}

export const mapProductWithTypeS = (pipData: any) => {
  const productPip: any = {
    en: {},
    sv: {},
  }

  if (pipData['s:name'] && pipData['s:name'].length > 0) {
    const pipNames = pipData['s:name'].filter((names: any) =>
      AVAILABLE_LANGUAGES.includes(names['@language']),
    )

    for (const name of pipNames) {
      const lang = name['@language']
      const value = name['@value']

      Object.assign(productPip[lang], { productName: value ? value : '' })
    }
  }

  if (pipData['s:brand']) {
    const value = pipData['s:brand']['s:name']

    Object.assign(productPip['en'], { brand: value ? value : '' })
    Object.assign(productPip['sv'], { brand: value ? value : '' })
  }

  if (pipData['s:image']) {
    const value = pipData['s:image']['s:url']['@id']

    Object.assign(productPip['en'], { image: value ? value : '' })
    Object.assign(productPip['sv'], { image: value ? value : '' })
  }

  if (pipData['s:size']) {
    const value = pipData['s:size']['s:value']
    const unit = pipData['s:weighsizet']['s:unitText']

    Object.assign(productPip['en'], { packageSize: `${value} ${unit}` })
    Object.assign(productPip['sv'], { packageSize: `${value} ${unit}` })
  }

  if (pipData['s:weight']) {
    const value = pipData['s:weight']['s:value']
    const unit = pipData['s:weight']['s:unitText']

    Object.assign(productPip['en'], { grossWeight: `${value} ${unit}` })
    Object.assign(productPip['sv'], { grossWeight: `${value} ${unit}` })
  }

  if (pipData['s:height']) {
    const value = pipData['s:height']['s:value']
    const unit = pipData['s:height']['s:unitText']

    Object.assign(productPip['en'], { packageHeight: `${value} ${unit}` })
    Object.assign(productPip['sv'], { packageHeight: `${value} ${unit}` })
  }

  if (pipData['s:width']) {
    const value = pipData['s:width']['s:value']
    const unit = pipData['s:width']['s:unitText']

    Object.assign(productPip['en'], { packageWidth: `${value} ${unit}` })
    Object.assign(productPip['sv'], { packageWidth: `${value} ${unit}` })
  }

  if (pipData['s:depth']) {
    const value = pipData['s:depth']['s:value']
    const unit = pipData['s:depth']['s:unitText']

    Object.assign(productPip['en'], { packageDepth: `${value} ${unit}` })
    Object.assign(productPip['sv'], { packageDepth: `${value} ${unit}` })
  }

  if (
    pipData['s:countryOfAssembly'] &&
    pipData['s:countryOfAssembly'].length > 0
  ) {
    const pipCountries = pipData['s:countryOfAssembly'].filter((country: any) =>
      AVAILABLE_LANGUAGES.includes(country['@language']),
    )

    for (const country of pipCountries) {
      const lang = country['@language']
      const value = country['@value']

      Object.assign(productPip[lang], {
        countryOfOriginStatement: value ? value : '',
      })
    }
  }

  return productPip
}

export const mapProductWithTypeTobaccoProduct = (pipData: any) => {
  const productPip: any = {
    en: {},
    sv: {},
  }

  if (pipData.productName && pipData.productName.length > 0) {
    const pipNames = pipData.productName.filter((names: any) =>
      AVAILABLE_LANGUAGES.includes(names['@language']),
    )

    for (const name of pipNames) {
      const lang = name['@language']
      const value = name['@value']

      Object.assign(productPip[lang], { productName: value ? value : '' })
    }
  }

  if (pipData.brand) {
    if (!!pipData.brand.brandName && pipData.brand.brandName.length > 0) {
      const pipBrands = pipData.brand.brandName.filter((brands: any) =>
        AVAILABLE_LANGUAGES.includes(brands['@language']),
      )
      for (const brand of pipBrands) {
        const lang = brand['@language']
        const value = brand['@value']
        Object.assign(productPip[lang], { brand: value ? value : '' })
      }
    }
    if (!!pipData.brand.subBrandName && pipData.brand.subBrandName.length > 0) {
      const pipBrands = pipData.brand.subBrandName.filter((brands: any) =>
        AVAILABLE_LANGUAGES.includes(brands['@language']),
      )
      for (const brand of pipBrands) {
        const lang = brand['@language']
        const value = brand['@value']
        productPip[lang] = {
          ...productPip[lang],
          subbrand: value ? value : '',
        }
      }
    }
  }

  if (pipData.brandOwner) {
    if (Array.isArray(pipData.brandOwner)) {
      const pipOwners = pipData.brandOwner.filter((owner: any) =>
        AVAILABLE_LANGUAGES.includes(owner['@language']),
      )

      for (const owner of pipOwners) {
        const lang = owner['@language']
        const value = owner['@value']

        Object.assign(productPip[lang], { owner: value ? value : '' })
      }
    } else {
      Object.assign(productPip['en'], { owner: pipData.brandOwner['@id'] })
      Object.assign(productPip['sv'], { owner: pipData.brandOwner['@id'] })
    }
  }

  if (pipData.image) {
    Object.assign(productPip['en'], {
      image: pipData.image.referencedFileURL['@id'],
    })
    Object.assign(productPip['sv'], {
      image: pipData.image.referencedFileURL['@id'],
    })
  }

  if (pipData.grossWeight && pipData.grossWeight.value['@value']) {
    Object.assign(productPip['en'], {
      grossWeight: `${pipData.grossWeight.value['@value']} ${pipData.grossWeight.unitCode}`,
    })
    Object.assign(productPip['sv'], {
      grossWeight: `${pipData.grossWeight.value['@value']} ${pipData.grossWeight.unitCode}`,
    })
  }

  if (pipData.inPackageHeight && pipData.inPackageHeight.value['@value']) {
    Object.assign(productPip['en'], {
      packageHeight: `${pipData.inPackageHeight.value['@value']} ${pipData.inPackageHeight.unitCode}`,
    })
    Object.assign(productPip['sv'], {
      packageHeight: `${pipData.inPackageHeight.value['@value']} ${pipData.inPackageHeight.unitCode}`,
    })
  }

  if (pipData.inPackageWidth && pipData.inPackageWidth.value['@value']) {
    Object.assign(productPip['en'], {
      packageWidth: `${pipData.inPackageWidth.value['@value']} ${pipData.inPackageWidth.unitCode}`,
    })
    Object.assign(productPip['sv'], {
      packageWidth: `${pipData.inPackageWidth.value['@value']} ${pipData.inPackageWidth.unitCode}`,
    })
  }

  if (pipData.inPackageDepth && pipData.inPackageDepth.value['@value']) {
    Object.assign(productPip['en'], {
      packageDepth: `${pipData.inPackageDepth.value['@value']} ${pipData.inPackageDepth.unitCode}`,
    })
    Object.assign(productPip['sv'], {
      packageDepth: `${pipData.inPackageDepth.value['@value']} ${pipData.inPackageDepth.unitCode}`,
    })
  }

  if (
    pipData.countryOfOriginStatement &&
    pipData.countryOfOriginStatement.length > 0
  ) {
    const countries = pipData.countryOfOriginStatement.filter((country: any) =>
      AVAILABLE_LANGUAGES.includes(country['@language']),
    )

    for (const country of countries) {
      const lang = country['@language']
      const value = country['@value']

      Object.assign(productPip[lang], {
        countryOfOriginStatement: value ? value : '',
      })
    }
  }

  if (pipData.packagingMarkedLabelAccreditation) {
    let value = Array.isArray(pipData.packagingMarkedLabelAccreditation)
      ? pipData.packagingMarkedLabelAccreditation[0].value ||
        pipData.packagingMarkedLabelAccreditation[0]['@id']
      : pipData.packagingMarkedLabelAccreditation.value ||
        pipData.packagingMarkedLabelAccreditation['@id']

    if (value.includes('gs1:PackagingMarkedLabelAccreditationCode-')) {
      value = value.replace('gs1:PackagingMarkedLabelAccreditationCode-', '')
    }

    Object.assign(productPip['en'], {
      markedLabel: value ? value : '',
    })
    Object.assign(productPip['sv'], {
      markedLabel: value ? value : '',
    })
  }

  return productPip
}

export const isAvailablePip = (data: any) => {
  let available = true
  for (const key of REQUIRED_PIP_KEY) {
    if (!data[key]) {
      available = false
    }
  }

  return available
}

export const isAvailableCertification = (data: any) => {
  if (!data) {
    return false
  }

  let available = true
  for (const key of REQUIRED_CERTIFICAITON_KEY) {
    if (!data[key]) {
      available = false
    }
  }

  if (data.status !== 'ACTIVE') {
    return false
  }

  return available
}

export const isProjectCertificationName = (name: string): boolean => {
  if (name.toLowerCase() === PRODUCT_CERTIFICATION_AGENCY.toLowerCase()) {
    return true
  }

  return false
}
