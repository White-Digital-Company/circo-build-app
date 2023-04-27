import {
  createStackNavigator,
  type StackNavigationProp,
} from '@react-navigation/stack'
import type { RouteProp } from '@react-navigation/native'
import HomeScreen from '@screens/Home'
import BarcodeScreen from '@screens/Barcode'
import ProductScreen from '@screens/Product'
import { useTranslation } from 'react-i18next'
import CertificationScreen from '@screens/Certification'
import type { Barcode } from '@models/product'

export type RootStackParamList = {
  Home: undefined
  Barcode: undefined
  Product: {
    barcode: Barcode
  }
  Certification: {
    barcode: Barcode
    language: 'en' | 'sv'
  }
}

export type RootRouterScreenProps<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>

export type RootRouterNavigationProps<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>

const Stack = createStackNavigator<RootStackParamList>()

const RootRouter = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#162345',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Barcode"
        component={BarcodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ title: t('screens.product.title') }}
      />
      <Stack.Screen
        name="Certification"
        component={CertificationScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  )
}

export default RootRouter
