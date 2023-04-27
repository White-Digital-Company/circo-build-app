import {
  TouchableOpacity,
  type TouchableOpacityProps,
  Image,
} from 'react-native'
import tw from '@tools/tailwind'

export interface FlagButtonProps extends TouchableOpacityProps {
  flag: 'flagEU' | 'flagSV'
  buttonStyle?: string
}

const FlagButton = ({ buttonStyle, flag, ...props }: FlagButtonProps) => {
  return (
    <TouchableOpacity
      style={tw`justify-center items-center ${buttonStyle ?? ''}`}
      {...props}
    >
      <>
        {flag === 'flagEU' && (
          <Image
            style={tw`w-[32px] h-[26px]`}
            source={require(`@assets/images/flag_eu.png`)}
          />
        )}
        {flag === 'flagSV' && (
          <Image
            style={tw`w-[32px] h-[26px]`}
            source={require(`@assets/images/flag_sv.png`)}
          />
        )}
      </>
    </TouchableOpacity>
  )
}

export default FlagButton
