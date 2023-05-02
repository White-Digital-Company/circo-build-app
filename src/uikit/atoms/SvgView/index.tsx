import { Path, Svg, type SvgProps } from 'react-native-svg'

export interface SvgViewProps extends SvgProps {}

const SvgView = (props: SvgViewProps) => {
  return (
    <Svg {...props}>
      <Path
        d="M429 9C246.465 101.765 143.953 99.9043 -39 9V239H429V9Z"
        fill="#3F4044"
        stroke="#DCB564"
        strokeWidth="10"
      />
    </Svg>
  )
}

export default SvgView
