import {Button, Box, Text, ActivityIndicator, CustomModal} from '../index'

import {colors} from 'src/modules'

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
  additionalContent
}: Com.ConfirmationModalProps) => {
  return (
    <CustomModal displayElement={displayElement} width="40vw">
      {({onCloseModalHandler}) => (
        <Box flexBox vertical>
          <Box flexBox>
            <Text>{label}</Text>
          </Box>
          {additionalContent && additionalContent()}
          <ActivityIndicator animating={loading}>
            <Box
              flexBox
              jEnd
              alCenter
              style={{
                width: '100%',
                float: 'right',
                gap: 10
              }}
            >
              <Button
                onClick={() => {
                  onCloseModalHandler()
                }}
                type="button"
                title={cancelLabel}
              />
              <Button
                style={{
                  background: !!danger
                    ? colors.red
                    : !!success
                    ? colors.green
                    : !!black
                    ? colors.black
                    : colors.primary200,
                  color: 'white'
                }}
                type="button"
                onClick={() => {
                  onConfirmClick(onCloseModalHandler)
                }}
                title={confirmLabel}
              />
            </Box>
          </ActivityIndicator>
        </Box>
      )}
    </CustomModal>
  )
}
