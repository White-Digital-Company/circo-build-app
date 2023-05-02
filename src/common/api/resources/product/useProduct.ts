import type { RemoteProductData, Barcode } from '@models/product'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import productApi from './actions'
import { productKeys } from './constants'

const useProduct = (barcode: Barcode) => {
  const query = useQuery<RemoteProductData, AxiosError>(
    productKeys.root(barcode.data),
    () => productApi.getProductData(barcode),
  )

  return query
}

export default useProduct
