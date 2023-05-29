export const wait = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms))

export const range = (n: number) => [...Array.from({ length: n }).keys()]

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const makeUnique = (values: string[]) => {
  const newValues = [...new Set(values)]
  return newValues
}

export const keyToUrl = (args: any): string => args.filter(Boolean).join('/')

export const parseJSONToObject = (data?: string | null) => {
  try {
    if (!data) {
      return
    }
    return JSON.parse(data)
  } catch {
    return data
  }
}

export const convertJSONFormDataToFormData = (data: { _parts: string[][] }) => {
  const formData = new FormData()

  const { _parts } = data

  for (const [key, value] of _parts) {
    formData.append(key, value)
  }

  return formData
}

export const getPathArrayFromString = (value: string) => {
  return value.split('.')
}

export const setObjectProperty = (path: string[], value: unknown) => {
  let object: any = {}
  const limit = path.length - 1

  for (let i = 0; i < limit; i + 1) {
    const key = path[i]
    object = object[key] ?? (object[key] = {})
  }

  const key = path[limit]
  object[key] = value
}
