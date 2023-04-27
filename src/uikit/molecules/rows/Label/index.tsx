import { Text, TouchableOpacity } from 'react-native'
import tw from '@tools/tailwind'
import { useTranslation } from 'react-i18next'

export interface LabelProps {
  title: string
  value: string | number
  titleWidthPercent?: number
  isButton?: boolean
  onPress?: () => void
}

const Label = ({
  title,
  value,
  isButton = false,
  onPress,
  titleWidthPercent = 35,
}: LabelProps) => {
  const { t } = useTranslation()
  return (
    <TouchableOpacity
      disabled={!isButton}
      activeOpacity={0.7}
      onPress={onPress && onPress}
      style={tw`mb-[14px] flex-row`}
    >
      <Text
        android_hyphenationFrequency="normal"
        style={tw`font-medium text-black text-sm w-[${titleWidthPercent}%] mr-[10px] leading-7`}
      >
        {title}
      </Text>
      <Text
        style={tw`font-normal w-[${
          100 - titleWidthPercent
        }%] text-sm leading-7 ${isButton ? 'text-light_blue' : 'text-gray'}`}
      >
        {`${value}`}
        {isButton && (
          <Text style={tw`text-xs font-extrabold leading-7 underline`}>
            {t('screens.product.buttons.more')}
          </Text>
        )}
      </Text>
    </TouchableOpacity>
  )
}

export default Label
