import * as Icons from '@assets/icons'
import { useState, FC } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
} from 'react-native'
import tw from '@tools/tailwind'
import { getLanguage, changeLanguage, type Language } from '@i18n'
import type { SvgProps } from 'react-native-svg'

interface LanguageDropdownProps {
  buttonStyle?: string
}

const LANGUAGE_VALUES: Record<Language, { title: string; icon: FC<SvgProps> }> =
  {
    en: {
      title: 'en',
      icon: Icons['FlagUKCircle'],
    },
    se: {
      title: 'se',
      icon: Icons['FlagSVCircle'],
    },
  }

const LanguageDropdown = ({ buttonStyle = '' }: LanguageDropdownProps) => {
  const [selectedLng, setSelectedLng] = useState<Language>(getLanguage())
  const [open, setOpen] = useState<boolean>(false)
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  const title = LANGUAGE_VALUES[selectedLng].title
  const LanguageIcon = LANGUAGE_VALUES[selectedLng].icon

  const onLanguageSelect = (lng: Language) => {
    setSelectedLng(lng)
    changeLanguage(lng)
    setOpen(prev => !prev)
  }

  const onContainerLayout = (event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout
    setContainerHeight(height + 5)
    setContainerWidth(width)
  }

  return (
    <View style={tw`self-start`}>
      <TouchableOpacity
        onPress={() => setOpen(prev => !prev)}
        onLayout={onContainerLayout}
        style={tw`flex-row self-start items-center justify-between rounded-full px-[8px] py-[5px] border-[1px] border-dark_blue ${buttonStyle} bg-white`}
      >
        <View style={tw`flex-row items-center`}>
          <LanguageIcon width={16} height={16} />
          <Text style={tw`mx-[10px]`}>{title}</Text>
        </View>
        <Icons.ArrowDown />
      </TouchableOpacity>
      {open && (
        <View
          style={tw`absolute py-[5px] top-[${containerHeight}px] w-[${containerWidth}px] justify-center flex-col rounded-[14px] border-[1px] border-dark_blue bg-white`}
        >
          {Object.entries(LANGUAGE_VALUES).map(([key, value], index, arr) => {
            const last = arr.length - 1 === index
            const buttonTitle = value.title
            const ButtonIcon = value.icon

            return (
              <TouchableOpacity
                key={buttonTitle}
                style={tw`flex-row items-center px-[8px] pb-[${
                  last ? '0px' : '5px'
                }]`}
                onPress={() => onLanguageSelect(key as Language)}
              >
                <ButtonIcon width={16} height={16} />
                <Text style={tw`ml-[10px]`}>{buttonTitle}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
    </View>
  )
}

export default LanguageDropdown
