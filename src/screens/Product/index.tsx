import { View, Text, ScrollView, ImageBackground, Image } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import type {
  RootRouterScreenProps,
  RootRouterNavigationProps,
} from '@navigation/RootRouter'
import { useProduct } from '@api'
import tw from '@tools/tailwind'
import Label from '@uikit/molecules/rows/Label'
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

  const getImageAssetPath = () => {
    switch (code) {
      case '07350140760047':
        return require('@assets/images/07350140760047.png')
      case '07350140760054':
        return require('@assets/images/07350140760054.png')
      case '7058541711995':
        return require('@assets/images/product.png')
      default:
        return
    }
  }

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
            {query.data.pip.image ? (
              <Image
                source={{ uri: query.data.pip.image }}
                style={tw`w-[75%] h-[240px] rounded-[4px] bg-white`}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={getImageAssetPath()}
                style={tw`w-[75%] h-[240px] rounded-[4px] bg-white`}
                resizeMode="cover"
              />
            )}
          </ImageBackground>
          <View style={tw`px-[16px]`}>
            <Label title={t('screens.product.labels.gtin')} value={code} />
            {query.data.pip.brandName && (
              <Label
                title={t('screens.product.labels.brand')}
                value={query.data.pip.brandName ?? ''}
              />
            )}
            {query.data.pip.brandOwner && (
              <Label
                title={t('screens.product.labels.brandOwner')}
                value={query.data.pip.brandOwner ?? ''}
              />
            )}
            {query.data.pip.productName && (
              <Label
                title={t('screens.product.labels.product')}
                value={query.data.pip.productName ?? ''}
              />
            )}
            {query.data.pip.frequencyBand && (
              <Label
                title={t('screens.product.labels.frequencyBand')}
                value={query.data.pip.frequencyBand ?? ''}
              />
            )}
            {query.data.pip.spreadSpectrum && (
              <Label
                title={t('screens.product.labels.spreadSpectrum')}
                value={query.data.pip.spreadSpectrum ?? ''}
              />
            )}
            {query.data.pip.energyConsuption && (
              <Label
                title={t('screens.product.labels.energyConsuption')}
                value={query.data.pip.energyConsuption ?? ''}
              />
            )}
            {query.data.pip.energyConsumption && (
              <Label
                title={t('screens.product.labels.energyConsumption')}
                value={query.data.pip.energyConsumption ?? ''}
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
            {query.data.pip.packageDepth && (
              <Label
                title={t('screens.product.labels.depth')}
                value={query.data.pip.packageDepth ?? ''}
              />
            )}
            {query.data.pip.packageWeight && (
              <Label
                title={t('screens.product.labels.weight')}
                value={query.data.pip.packageWeight ?? ''}
              />
            )}
            {query.data.pip.warrantyScopeDescription && (
              <Label
                title={t('screens.product.labels.warrantyScopeDescription')}
                value={query.data.pip.warrantyScopeDescription ?? ''}
              />
            )}
            {query.data.pip.durationOfWarranty && (
              <Label
                title={t('screens.product.labels.durationOfWarranty')}
                value={query.data.pip.durationOfWarranty ?? ''}
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
                      type: 'AGENCY',
                      barcode: params.barcode,
                    })
                  }
                />
              )}
            {query.data.pip.securityData && (
              <Label
                title={t('screens.product.labels.certification')}
                value="Certifierade"
                isButton
                onPress={() =>
                  navigation.navigate('Certification', {
                    type: 'SECURITY',
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
