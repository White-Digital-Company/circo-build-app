import {
  TouchableHighlight,
  type TouchableHighlightProps,
  Text,
} from 'react-native'
import tw from '@tools/tailwind'

export interface PrimaryButtonProps extends TouchableHighlightProps {
  title: string
  buttonStyle?: string
}

const PrimaryButton = ({
  title,
  buttonStyle = '',
  ...props
}: PrimaryButtonProps) => {
  return (
    <TouchableHighlight
      style={tw`rounded-full bg-white border-dark_gray border-[5px] py-16px justify-center items-center ${buttonStyle}`}
      activeOpacity={0.2}
      underlayColor="#fff"
      {...props}
    >
      <Text style={tw`text-dark_gray font-bold`}>{title}</Text>
    </TouchableHighlight>
  )
}

export default PrimaryButton
