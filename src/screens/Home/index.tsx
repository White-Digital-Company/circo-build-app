import { Image, View } from 'react-native'
import tw from '@tools/tailwind'
import { PrimaryButton } from '@uikit/molecules/Buttons'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import type { RootRouterNavigationProps } from '@navigation/RootRouter'
import { SvgView } from '@uikit/atoms'

const HomeScreen = () => {
  const navigation = useNavigation<RootRouterNavigationProps<'Home'>>()
  const { t } = useTranslation()

  return (
    <View style={tw`flex-1 flex-col bg-white`}>
      <View style={tw`flex-1 flex-col`}>
        <View style={tw`flex-1 flex-col justify-end items-center`}>
          <Image
            style={tw`w-[80%] mb-[50px]`}
            source={require('@assets/images/logo.png')}
            resizeMode="contain"
          />
          <PrimaryButton
            onPress={() => navigation.navigate('Barcode')}
            // onPress={() =>
            //   navigation.navigate('Product', {
            //     barcode: {
            //       type: 'URL',
            //       data: 'https://id.gs1.se/01/7058541711995',
            //     },
            //   })
            // }
            title={t('screens.home.buttons.scan')}
            buttonStyle="w-[75%]"
          />
        </View>
      </View>
      <View style={tw`flex-1 justify-end`}>
        <SvgView width="100%" height="180" />
      </View>
    </View>
  )
}

export default HomeScreen
