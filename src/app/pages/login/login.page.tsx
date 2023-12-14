import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ConfirmationModal, CustomModal } from 'src/app/common'
import { useAuth } from 'src/app/routing'
export const Login = () => {
  const { handleLogin } = useAuth()
  const dispatch = useDispatch()

  // onSubmit: (values) => {
  //   dispatch(
  //     login({
  //       email: values.email,
  //       password: values.password,
  //       onSuccess: (data) => {
  //         handleLogin(data.token, data.user.role)
  //         toast.success('Successfully loggedin')
  //       },
  //     }),
  //   )
  // }
  return (
    <div className="login-page">
      Login Page
      <ConfirmationModal
        label="Are you sure you want to login?"
        onConfirmClick={() => {
          console.log(`confirm`)
        }}
        id={'click-modal'}
        displayElement={<div>Login!!</div>}
      />
    </div>
  )
}
