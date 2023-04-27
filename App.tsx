import 'react-native-gesture-handler'
import '@i18n'
import tw from '@tools/tailwind'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDeviceContext } from 'twrnc'
import RootRouter from '@navigation/RootRouter'
import { QueryClientProvider } from '@api/queryClient'
import { useEffect } from 'react'
import Modals from '@uikit/organisms/Modals'
import useFirstAppModal from '@hooks/useFirstAppModal'

const App = () => {
  const { visible, onClose } = useFirstAppModal()

  useDeviceContext(tw)

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <QueryClientProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <RootRouter />
          <Modals
            modal={{ type: 'firstModal' }}
            visible={visible}
            closeModal={onClose}
          />
        </SafeAreaProvider>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App
