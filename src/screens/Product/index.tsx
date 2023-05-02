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
import { SvgView } from '@uikit/atoms'

const ProductScreen = () => {
  const navigation = useNavigation<RootRouterNavigationProps<'Certification'>>()
  const { params } = useRoute<RootRouterScreenProps<'Product'>>()

  const { t } = useTranslation()

  const query = useProduct(params.barcode)
  const code = getCodeByBarcode(params.barcode)

  if (query.isLoading) {
    return <ProductLoaderSkeleton />
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <SvgView
        width="100%"
        height="100"
        style={[
          tw`absolute z-1`,
          {
            transform: [{ rotate: '180deg' }],
          },
        ]}
      />
      {!query.isSuccess && (
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
      )}
      {query.isSuccess && query.data.type === 'ERROR' && (
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
      {query.isSuccess && query.data.type === 'SUCCESS' && (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
            style={tw`p-[24px] mb-[40px] pt-[70px] items-center`}
            source={require('@assets/images/background.png')}
          >
            <Image
              source={require('@assets/images/product.png')}
              style={tw`w-[65%] h-[240px] rounded-[4px] bg-white`}
              resizeMode="cover"
            />
          </ImageBackground>
          <View style={tw`px-[16px]`}>
            <Label title={t('screens.product.labels.gtin')} value={code} />
            {query.data.pip.brandName && (
              <Label
                title={t('screens.product.labels.brand')}
                value={query.data.pip.brandName ?? ''}
              />
            )}
            {query.data.pip.productName && (
              <Label
                title={t('screens.product.labels.product')}
                value={query.data.pip.productName ?? ''}
              />
            )}
            {query.data.pip.packageWidth && (
              <Label
                title={t('screens.product.labels.width')}
                value={query.data.pip.packageWidth ?? ''}
              />
            )}
            {query.data.pip.packageHeight && (
              <Label
                title={t('screens.product.labels.height')}
                value={query.data.pip.packageHeight ?? ''}
              />
            )}
            {query.data.pip.uValue && (
              <Label
                title={t('screens.product.labels.uValue')}
                value={query.data.pip.uValue ?? ''}
              />
            )}
            {query.data.pip.certification &&
              query.data.pip.certification.agency && (
                <Label
                  title={t('screens.product.labels.certification')}
                  value={query.data.pip.certification.agency}
                  isButton
                  onPress={() =>
                    navigation.navigate('Certification', {
                      barcode: params.barcode,
                    })
                  }
                />
              )}
          </View>
        </ScrollView>
      )}
      <View style={tw`w-full items-center justify-center pb-[20px] pt-[14px]`}>
        {!query.isLoading && (
          <Text style={tw`text-light_blue text-base font-light`}>
            {`<<<<GTIN${
              query.isSuccess && query.data.type === 'SUCCESS'
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
