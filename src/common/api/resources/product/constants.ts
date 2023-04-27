import { keyToUrl } from '@tools/common'

export const productKeys = {
  root: (id: string) => ['01', id] as const,
}

export const productUrls = {
  root: (id: string) => keyToUrl(productKeys.root(id)),
}
