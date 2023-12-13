import { colors } from 'src/modules'
import { CustomModal } from '../index'

export const ConfirmationModal = ({
  displayElement,
  label,
  onConfirmClick,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  loading = false,
  danger,
  success,
  black,
  additionalContent,
}: Com.ConfirmationModalProps) => {
  return (
    <CustomModal displayElement={displayElement} width="40vw">
      {({ onCloseModalHandler }) => (
        <div>
          <div>
            <span>{label}</span>
          </div>
          {additionalContent && additionalContent()}
          {/* <ActivityIndicator animating={loading}> */}
          <div
            style={{
              width: '100%',
              float: 'right',
              gap: 10,
            }}
          >
            <button
              onClick={() => {
                onCloseModalHandler()
              }}
              type="button"
              title={cancelLabel}
            />
            <button
              style={{
                background: !!danger
                  ? colors.red
                  : !!success
                  ? colors.green
                  : !!black
                  ? colors.black
                  : colors.primary200,
                color: 'white',
              }}
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
