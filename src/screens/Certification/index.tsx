import tw from '@tools/tailwind'
import { View, ScrollView, Text, ImageBackground, Image } from 'react-native'
import { useProduct } from '@api'
import { useRoute } from '@react-navigation/native'
import type { RootRouterScreenProps } from '@navigation/RootRouter'
import Label from '@uikit/molecules/rows/Label'
import { useTranslation } from 'react-i18next'
import { getCodeByBarcode } from '@tools/barcode'
import { SvgFromUri } from 'react-native-svg'

const CertificationScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<RootRouterScreenProps<'Certification'>>()

  const query = useProduct(params.barcode)
  const code = getCodeByBarcode(params.barcode)

  if (!query.isSuccess || query.data.type === 'NOT_PROJECT') {
    return null
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          style={tw`p-[24px] h-[180px] items-center justify-center`}
          source={require('@assets/images/background.png')}
        >
          {query.data.certification[params.language].url &&
          query.data.certification[params.language].url?.includes('.svg') ? (
            <SvgFromUri
              style={tw`w-[80px] h-[80px]`}
              uri={query.data.certification[params.language].url!}
            />
          ) : (
            <Image
              source={{
                uri: query.data.certification[params.language].url,
              }}
              resizeMode="contain"
              style={tw`w-[80px] h-[80px]`}
            />
          )}
        </ImageBackground>
        <View style={tw`grow w-full p-[35px] px-[16px] justify-center`}>
          <Label
            title={t('screens.certification.labels.status')}
            value={query.data.certification[params.language].status}
            titleWidthPercent={55}
          />
          {query.data.certification[params.language].license && (
            <Label
              title={t('screens.certification.labels.license')}
              value={
                query.data.certification[params.language].license as string
              }
              titleWidthPercent={55}
            />
          )}
          {query.data.certification[params.language].subject && (
            <Label
              title={t('screens.certification.labels.holder')}
              value={
                query.data.certification[params.language].subject as string
              }
              titleWidthPercent={55}
            />
          )}
          {query.data.certification[params.language].agency && (
            <Label
              title={t('screens.certification.labels.agency')}
              value={query.data.certification[params.language].agency as string}
              titleWidthPercent={55}
            />
          )}
        </View>
      </ScrollView>
      <View style={tw`w-full items-center justify-center py-[14px]`}>
        <Text
          style={tw`text-light_blue text-base font-light`}
        >{`<<<<GTIN${code}<<<<`}</Text>
      </View>
    </View>
  )
}

export default CertificationScreen
