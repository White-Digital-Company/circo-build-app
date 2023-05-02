import tw from '@tools/tailwind'
import { View, ScrollView, Text, ImageBackground, Image } from 'react-native'
import { useProduct } from '@api'
import { useRoute } from '@react-navigation/native'
import type { RootRouterScreenProps } from '@navigation/RootRouter'
import Label from '@uikit/molecules/rows/Label'
import { useTranslation } from 'react-i18next'
import { getCodeByBarcode } from '@tools/barcode'
import { SvgView } from '@uikit/atoms'

const CertificationScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<RootRouterScreenProps<'Certification'>>()

  const query = useProduct(params.barcode)
  const code = getCodeByBarcode(params.barcode)

  if (
    !query.isSuccess ||
    query.data.type === 'ERROR' ||
    !query.data.certification
  ) {
    return null
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          style={tw`p-[24px] h-[180px] items-center justify-center pt-[50px]`}
          source={require('@assets/images/background.png')}
        >
          <Text style={tw`font-bold text-xl w-full text-center`}>
            {query.data.certification.agency}
          </Text>
        </ImageBackground>
        <View style={tw`grow w-full p-[35px] px-[16px] justify-center`}>
          {query.data.certification.agency && (
            <Label
              title={t('screens.certification.labels.agency')}
              value={query.data.certification.agency as string}
              titleWidthPercent={55}
            />
          )}
          {query.data.certification.subject && (
            <Label
              title={t('screens.certification.labels.subject')}
              value={query.data.certification.subject as string}
              titleWidthPercent={55}
            />
          )}
          {query.data.certification.license && (
            <Label
              title={t('screens.certification.labels.license')}
              value={query.data.certification.license as string}
              titleWidthPercent={55}
            />
          )}
          {query.data.certification.module && (
            <Label
              title={t('screens.certification.labels.module')}
              value={query.data.certification.module as string}
              titleWidthPercent={55}
            />
          )}
          {query.data.certification.gwp && (
            <Label
              title={t('screens.certification.labels.gwp')}
              value={query.data.certification.gwp as string}
              titleWidthPercent={55}
            />
          )}
        </View>
      </ScrollView>
      <View style={tw`w-full items-center justify-center pb-[20px] pt-[14px]`}>
        <Text
          style={tw`text-light_blue text-base font-light`}
        >{`<<<<GTIN${code}<<<<`}</Text>
      </View>
    </View>
  )
}

export default CertificationScreen
