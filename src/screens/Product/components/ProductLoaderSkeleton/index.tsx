import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { View } from 'react-native'
import tw from '@tools/tailwind'

const ProductLoaderSkeleton = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`grow`}>
        <SkeletonPlaceholder borderRadius={10} speed={800}>
          <SkeletonPlaceholder.Item
            marginTop={24}
            marginBottom={24}
            marginLeft={24}
            marginRight={24}
            flexDirection="column"
            alignItems="center"
          >
            <SkeletonPlaceholder.Item
              marginBottom={16}
              flexDirection="row"
              alignItems="center"
            >
              <SkeletonPlaceholder.Item
                marginRight={14}
                width={100}
                height={26}
              />
              <SkeletonPlaceholder.Item
                marginRight={14}
                width={32}
                height={26}
              />
              <SkeletonPlaceholder.Item width={32} height={26} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width="100%" height={200} />
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
      <View style={tw`w-full items-center justify-center py-[14px]`} />
    </View>
  )
}

export default ProductLoaderSkeleton
