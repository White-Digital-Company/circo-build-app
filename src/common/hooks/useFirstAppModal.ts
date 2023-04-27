import { FIRST_APP_MODAL } from '@constants/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

const useFirstAppModal = () => {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const isShowModal = JSON.parse(
        (await AsyncStorage.getItem(FIRST_APP_MODAL)) ?? 'false',
      )
      if (!isShowModal) {
        setVisible(true)

        AsyncStorage.setItem(FIRST_APP_MODAL, 'true')
      }
    })()
  }, [])

  const onClose = () => {
    setVisible(false)
  }

  return {
    visible,
    onClose,
  }
}

export default useFirstAppModal
