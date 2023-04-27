import { Text, View } from 'react-native'
import type { FirstAppModalProps } from '../shared/types'
import tw from '@tools/tailwind'
import { useTranslation } from 'react-i18next'
import { PrimaryButton } from '@uikit/molecules/Buttons'
import BaseModal from '../BaseModal'

const FirstAppModal = ({
  visible,
  onClose,
}: Omit<FirstAppModalProps, 'type'>) => {
  const { t } = useTranslation()

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      style={tw`items-center w-full justify-center`}
    >
      <View
        style={tw`w-[80%] p-[1rem] items-center justify-center bg-white rounded-[10px]`}
      >
        <Text style={tw`text-lg font-medium text-center`}>
          {t('modals.firstApp.title')}
        </Text>
        <PrimaryButton
          title={t('modals.firstApp.buttons.ok')}
          onPress={onClose}
          buttonStyle="w-[100%] mt-[16px]"
        />
      </View>
    </BaseModal>
  )
}

export default FirstAppModal
