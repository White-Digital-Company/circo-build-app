import tw from '@tools/tailwind'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import BarcodeMask from 'react-native-barcode-mask'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import {
  BarcodeFormat,
  useScanBarcodes,
  type Barcode,
} from 'vision-camera-code-scanner'

export const BARCODE_READER_BOX_SIZE = wp(80)

const useBarcodeScanner = (onScanned: (barcode: Barcode) => void) => {
  const [scanned, setScanned] = useState<boolean>(false)

  const [frameProccessor, barcodes] = useScanBarcodes([
    BarcodeFormat.ALL_FORMATS,
  ])

  const { back: device } = useCameraDevices()

  useEffect(() => {
    Camera.requestCameraPermission()
  }, [])

  useEffect(() => {
    if (barcodes?.length && !scanned) {
      setScanned(true)
      onScanned(barcodes[0])
    }
  }, [barcodes])

  return () => (
    <>
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
    </>
  )
}

export default useBarcodeScanner
