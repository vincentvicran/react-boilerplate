import { colors } from 'src/modules'
import { CustomModal, Loader } from '../index'
import { Button } from '../button'

export const ConfirmationModal = ({
  id,
  displayElement,
  label,
  onConfirmClick,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  loading = false,
  additionalContent,
}: Com.ConfirmationModalProps) => {
  return (
    <CustomModal
      id={`confirmation-modal-${id}`}
      displayElement={displayElement}
      width="40vw"
    >
      {({ onCloseModalHandler }) => (
        <div>
          <div>
            <span>{label}</span>
          </div>
          {additionalContent && additionalContent()}
          {/* <ActivityIndicator animating={loading}> */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              gap: 10,
            }}
          >
            <Button
              className="btn-secondary"
              onClick={() => {
                onCloseModalHandler()
              }}
              style={{
                background: colors.grey100,
              }}
              type="button"
              title={cancelLabel}
            />
            <Button
              prepend={loading && <Loader variant="three" color="white" />}
              type="button"
              onClick={() => {
                onConfirmClick(onCloseModalHandler)
              }}
              title={confirmLabel}
            />
          </div>
          {/* </ActivityIndicator> */}
        </div>
      )}
    </CustomModal>
  )
}
