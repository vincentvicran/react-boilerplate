import { useState } from 'react'
import { Modal } from '../modal/modal.common'

export const CustomModal = ({
  id,
  displayElement,
  children,
  onOutSideClickHandler = true,
  modalStyles,
  width = '60vw',
  height,
  // overflowY = 'auto',
  ...props
}: Com.CustomModalProps) => {
  const [visible, setVisible] = useState(false)

  const onCloseModalHandler = () => {
    setVisible(false)
  }

  return (
    <>
      {displayElement && (
        <div
          onClick={(e) => {
            e.preventDefault()
            setVisible(true)
          }}
        >
          {displayElement}
        </div>
      )}

      <Modal id={id} visible={visible} width={width} height={height} {...props}>
        <div
          style={{
            height: height,
            width: '100%',
          }}
        >
          {children({ onCloseModalHandler })}
        </div>
      </Modal>
    </>
  )
}
