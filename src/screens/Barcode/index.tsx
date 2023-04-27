import tw from '@tools/tailwind'
import { View } from 'react-native'
import { useEffect, useState } from 'react'
import BarcodeMask from 'react-native-barcode-mask'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner'
import { useNavigation } from '@react-navigation/native'
import type { RootRouterNavigationProps } from '@navigation/RootRouter'

export const BARCODE_READER_BOX_SIZE = wp(80)

const BarcodeScreen = () => {
  const navigation = useNavigation<RootRouterNavigationProps<'Barcode'>>()
  const { back: device } = useCameraDevices()
  const [frameProccessor, barcodes] = useScanBarcodes([
    BarcodeFormat.ALL_FORMATS,
  ])

  const [scanned, setScanned] = useState<boolean>(false)

  useEffect(() => {
    Camera.requestCameraPermission()
  }, [])

  useEffect(() => {
    if (barcodes?.length && !scanned) {
      const barcodeData = barcodes[0].rawValue

      navigation.replace('Product', {
        barcode: {
          type: barcodeData?.includes('http') ? 'URL' : 'CODE',
          data: barcodeData ?? '',
        },
      })

      setScanned(true)
    }
  }, [barcodes])

  return (
    <View style={tw`flex-1`}>
      {!!device && (
        <Camera
          style={tw`flex-1`}
          device={device}
          isActive={!scanned}
          frameProcessor={frameProccessor}
          frameProcessorFps={5}
        />
      )}

      <View style={tw.style(`absolute top-0 left-0 right-0 bottom-0`)}>
        <BarcodeMask
          width={BARCODE_READER_BOX_SIZE}
          height={BARCODE_READER_BOX_SIZE}
          edgeBorderWidth={5}
          animatedLineColor={tw`text-dark_blue`['color'] as string}
          animatedLineWidth={BARCODE_READER_BOX_SIZE}
          edgeColor={tw`text-dark_blue`['color'] as string}
        />
      </View>
    </View>
  )
}

export default BarcodeScreen
