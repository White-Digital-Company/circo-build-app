import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { View } from 'react-native'
import tw from '@tools/tailwind'
import { SvgView } from '@uikit/atoms'

const ProductLoaderSkeleton = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <SvgView
        width="100%"
        height="100"
        style={[
          tw`absolute z-1`,
          {
            transform: [{ rotate: '180deg' }],
          },
        ]}
      />
      <View style={tw`grow mt-[25px]`}>
        <SkeletonPlaceholder borderRadius={10} speed={800}>
          <SkeletonPlaceholder.Item
            marginTop={24}
            marginBottom={24}
            marginLeft={24}
            marginRight={24}
            flexDirection="column"
            alignItems="center"
          >
            <SkeletonPlaceholder.Item width="60%" height={200} />
            <SkeletonPlaceholder.Item
              flexDirection="row"
              width="100%"
              marginLeft={16}
              marginTop={40}
              marginRight={16}
            >
              <SkeletonPlaceholder.Item
                width="30%"
                height={26}
                marginRight={20}
              />
              <SkeletonPlaceholder.Item width="40%" height={26} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              width="100%"
              marginLeft={16}
              marginTop={16}
              marginRight={16}
            >
              <SkeletonPlaceholder.Item
                width="30%"
                height={26}
                marginRight={20}
              />
              <SkeletonPlaceholder.Item width="40%" height={26} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              width="100%"
              marginLeft={16}
              marginTop={16}
              marginRight={16}
            >
              <SkeletonPlaceholder.Item
                width="30%"
                height={26}
                marginRight={20}
              />
              <SkeletonPlaceholder.Item width="40%" height={26} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              width="100%"
              marginLeft={16}
              marginTop={16}
              marginRight={16}
            >
              <SkeletonPlaceholder.Item
                width="30%"
                height={26}
                marginRight={20}
              />
              <SkeletonPlaceholder.Item width="40%" height={26} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
      <View
        style={tw`w-full items-center justify-center pb-[20px] pt-[14px]`}
      />
    </View>
  )
}

export default ProductLoaderSkeleton
