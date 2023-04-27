import { useState, useEffect } from 'react'
import { View, Text, ScrollView, ImageBackground, Image } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import type {
  RootRouterScreenProps,
  RootRouterNavigationProps,
} from '@navigation/RootRouter'
import { useProduct } from '@api'
import { Shadow } from 'react-native-shadow-2'
import tw from '@tools/tailwind'
import Label from '@uikit/molecules/rows/Label'
import FlagButton from '@uikit/molecules/Buttons/FlagButton'
import { useTranslation } from 'react-i18next'
import ProductLoaderSkeleton from './components/ProductLoaderSkeleton/index'
import { getCodeByBarcode } from '@tools/barcode'
import { isProjectCertificationName } from '@tools/product'

const ProductScreen = () => {
  const navigation = useNavigation<RootRouterNavigationProps<'Certification'>>()
  const { params } = useRoute<RootRouterScreenProps<'Product'>>()
  const { t } = useTranslation()

  const [language, setLanguage] = useState<'sv' | 'en'>('sv')

  const query = useProduct(params.barcode)
  const code = getCodeByBarcode(params.barcode)

  useEffect(() => {
    if (
      query.isSuccess &&
      query.data.type === 'SUCCESS' &&
      query.data.pip.enAvailable &&
      !query.data.pip.svAvailable
    ) {
      setLanguage('en')
    }
  }, [query.isSuccess])

  if (query.isLoading) {
    return <ProductLoaderSkeleton />
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      {!query.isSuccess || query.data.type === 'NOT_PROJECT' ? (
        <View style={tw`grow`}>
          <ImageBackground
            style={tw`p-[24px] h-[200px] items-center justify-center`}
            source={require('@assets/images/background.png')}
          >
            <View style={tw`flex-row items-center justify-center`}>
              <Text style={tw`text-lg font-bold text-center`}>
                {t('screens.product.not_project')}
              </Text>
            </View>
          </ImageBackground>
        </View>
      ) : null}
      {query.isSuccess &&
        query.data.type === 'SUCCESS' &&
        !query.data.pip.svAvailable &&
        !query.data.pip.enAvailable && (
          <View style={tw`grow`}>
            <ImageBackground
              style={tw`p-[24px] h-[200px] items-center justify-center`}
              source={require('@assets/images/background.png')}
            >
              <View style={tw`flex-row items-center justify-center`}>
                <Text style={tw`text-lg font-bold text-center`}>
                  {t('screens.product.incomplete')}
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
      {query.isSuccess &&
        query.data.type === 'SUCCESS' &&
        (query.data.pip.svAvailable || query.data.pip.enAvailable) && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground
              style={tw`p-[24px] mb-[40px]`}
              source={require('@assets/images/background.png')}
            >
              <View style={tw`flex-row mb-[16px] items-center justify-center`}>
                <Text style={tw`text-lg font-bold mr-[14px]`}>
                  {t('screens.product.labels.passport')}
                </Text>
                {query.data.pip.svAvailable && (
                  <FlagButton
                    flag="flagSV"
                    onPress={() => setLanguage('sv')}
                    buttonStyle="mr-[14px]"
                  />
                )}
                {query.data.pip.enAvailable && (
                  <FlagButton flag="flagEU" onPress={() => setLanguage('en')} />
                )}
              </View>
              {query.data.pip.en.image && (
                <Shadow style={tw`w-full rounded-[4px]`}>
                  <Image
                    source={{ uri: query.data.pip.en.image }}
                    style={tw`w-full h-[200px] rounded-[4px] bg-white`}
                    resizeMode="contain"
                  />
                </Shadow>
              )}
            </ImageBackground>
            <View style={tw`px-[16px]`}>
              <Label title={t('screens.product.labels.gtin')} value={code} />
              {query.data.pip[language].brand && (
                <Label
                  title={t('screens.product.labels.brand')}
                  value={query.data.pip[language].brand ?? ''}
                />
              )}
              {query.data.pip[language].subbrand && (
                <Label
                  title={t('screens.product.labels.subBrand')}
                  value={query.data.pip[language].subbrand ?? ''}
                />
              )}
              {query.data.pip[language].owner && (
                <Label
                  title={t('screens.product.labels.brandOwner')}
                  value={query.data.pip[language].owner ?? ''}
                />
              )}
              {query.data.pip[language].productName && (
                <Label
                  title={t('screens.product.labels.product')}
                  value={query.data.pip[language].productName ?? ''}
                />
              )}
              {query.data.pip[language].packageHeight && (
                <Label
                  title={t('screens.product.labels.height')}
                  value={query.data.pip[language].packageHeight ?? ''}
                />
              )}
              {query.data.pip[language].packageWidth && (
                <Label
                  title={t('screens.product.labels.width')}
                  value={query.data.pip[language].packageWidth ?? ''}
                />
              )}
              {query.data.pip[language].packageSize && (
                <Label
                  title={t('screens.product.labels.size')}
                  value={query.data.pip[language].packageSize ?? ''}
                />
              )}
              {query.data.pip[language].packageDepth && (
                <Label
                  title={t('screens.product.labels.depth')}
                  value={query.data.pip[language].packageDepth ?? ''}
                />
              )}
              {query.data.pip[language].grossWeight && (
                <Label
                  title={t('screens.product.labels.weight')}
                  value={query.data.pip[language].grossWeight ?? ''}
                />
              )}
              {query.data.pip[language].countryOfOriginStatement && (
                <Label
                  title={t('screens.product.labels.country')}
                  value={
                    query.data.pip[language].countryOfOriginStatement ?? ''
                  }
                />
              )}
              {query.data.pip[language].markedLabel &&
                isProjectCertificationName(
                  query.data.pip[language].markedLabel!,
                ) && (
                  <Label
                    title={t('screens.product.labels.certification')}
                    value={`${
                      language === 'en'
                        ? query.data.certification.enAvailable
                          ? 'Nordic Swan Ecolabel'
                          : t('screens.product.labels.not_certification')
                        : query.data.certification.svAvailable
                        ? 'Svanenmärkt'
                        : t('screens.product.labels.not_certification')
                    }`}
                    isButton={
                      language === 'en'
                        ? query.data.certification.enAvailable
                        : query.data.certification.svAvailable
                    }
                    onPress={() =>
                      navigation.navigate('Certification', {
                        barcode: params.barcode,
                        language,
                      })
                    }
                  />
                )}
            </View>
          </ScrollView>
        )}
      <View style={tw`w-full items-center justify-center py-[14px]`}>
        {!query.isLoading && (
          <Text style={tw`text-light_blue text-base font-light`}>
            {`<<<<GTIN${
              query.isSuccess &&
              query.data.type === 'SUCCESS' &&
              (query.data.pip.enAvailable || query.data.pip.svAvailable)
                ? code
                : '_NotFound'
            }<<<<`}
          </Text>
        )}
      </View>
    </View>
  )
}

export default ProductScreen
