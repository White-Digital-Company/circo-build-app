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
      style={tw`rounded-full bg-dark_blue py-16px justify-center items-center ${buttonStyle}`}
      {...props}
    >
      <Text style={tw`text-white`}>{title}</Text>
    </TouchableHighlight>
  )
}

export default PrimaryButton
