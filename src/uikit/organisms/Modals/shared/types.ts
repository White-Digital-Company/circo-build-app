export interface BaseModalProps {
  visible?: boolean
  onClose?: () => any
}

export interface FirstAppModalProps extends BaseModalProps {
  type: 'firstModal'
}

export type Modal = FirstAppModalProps
