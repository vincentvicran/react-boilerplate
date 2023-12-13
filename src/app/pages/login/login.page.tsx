import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { ConfirmationModal, CustomModal } from 'src/app/common'
export const Login = () => {
  return (
    <div className="login-page">
      <ConfirmationModal
        label="Confirmation"
        onConfirmClick={() => {
          console.log(`confirm`)
        }}
        id={'click-modal'}
        displayElement={<div>Click me!!</div>}
      >
        {/* <div>Hello world</div> */}
      </ConfirmationModal>

      <Link to="/table">
        <div className="login-nav">Go to Table Page</div>
      </Link>
    </div>
  )
}
