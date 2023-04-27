import FirstAppModal from './FirstAppModal'
import type { Modal } from './shared/types'

export interface ModalProps {
  modal: Modal | null
  visible: boolean
  closeModal: () => any
}

const Modals = ({ visible, modal, closeModal }: ModalProps) => {
  return (
    <>
      <FirstAppModal
        visible={modal?.type === 'firstModal' && visible}
        onClose={closeModal}
      />
    </>
  )
}

export default Modals
