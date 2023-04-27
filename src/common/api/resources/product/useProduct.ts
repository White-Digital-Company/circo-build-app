import { isAvailableCertification } from './../../../tools/product'
import type {
  RemoteProductData,
  Barcode,
  UseProductData,
} from '@models/product'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import productApi from './actions'
import { productKeys } from './constants'
import {
  connectProductDataArrToPip,
  getCertificationDataFromResponse,
  getPipDataByProductInfo,
  isAvailablePip,
} from '@tools/product'

const selectData = (data: RemoteProductData): UseProductData => {
  if (data.type === 'ERROR') {
    return {
      type: 'NOT_PROJECT',
    }
  }

  const dataFromEn = getPipDataByProductInfo(data.pip.en)
  const dataFromSv = getPipDataByProductInfo(data.pip.sv)

  const pipResult = connectProductDataArrToPip([dataFromEn, dataFromSv])

  const certification = getCertificationDataFromResponse(data.certification)

  return {
    type: 'SUCCESS',
    pip: {
      ...pipResult,
      enAvailable: isAvailablePip(pipResult.en),
      svAvailable: isAvailablePip(pipResult.sv),
    },
    certification: {
      ...certification,
      enAvailable: isAvailableCertification(certification.en),
      svAvailable: isAvailableCertification(certification.sv),
    },
  }
}

const useProduct = (barcode: Barcode) => {
  const query = useQuery<RemoteProductData, AxiosError, UseProductData>(
    productKeys.root(barcode.data),
    () => productApi.getProductData(barcode),
    {
      select: selectData,
    },
  )

  return query
}

export default useProduct
