import type { FC } from 'react'
import type { ModalProps } from 'react-native-modal'
import Modal from 'react-native-modal'
import type { BaseModalProps } from '../shared/types'

const BaseModal: FC<BaseModalProps & Partial<ModalProps>> = ({
  children,
  ...props
}) => {
  const { visible, ...restProps } = props

  const onClose = () => {
    if (restProps.onClose) {
      restProps.onClose()
    }
  }

  return (
    <Modal
      {...restProps}
      {...{ onClose }}
      isVisible={visible ?? false}
      animationIn={props.animationIn || 'fadeIn'}
      animationOut={props.animationOut || 'fadeOut'}
      avoidKeyboard
    >
      {children}
    </Modal>
  )
}

export default BaseModal
