import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { MdMenu, MdKeyboardArrowDown } from 'react-icons/md'

import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  IoIosCloseCircle,
  IoIosArrowForward,
  IoIosArrowBack,
} from 'react-icons/io'

import { FaUserAlt } from 'react-icons/fa'

// import companyLogo from 'src/assets/icons/logo1.png'
import { InputField, Dropdown, Menu, Modal } from 'src/app/common'
import { useInput } from 'src/hooks'
import { useAuth } from 'src/app/routing'
import { isValid, validator } from 'src/utils'
// import {userAuthLogoutAction} from 'src/redux'
import { useDispatch } from 'src/store'
import { Button } from '../button'

export const Header = () => {
  // const dispatch = useDispatch()
  const [visible, setVisible] = useState<boolean>(false)

  const { handleLogout, setSidenavExpand, sidenavExpand } = useAuth()

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <div
            className="header-menu"
            onClick={() => setSidenavExpand((prev) => !prev)}
          >
            {sidenavExpand ? (
              <BsThreeDotsVertical size={14} />
            ) : (
              <MdMenu size={16} />
            )}
          </div>
          <div className="header-breadcrumb">Breadcrum</div>
        </div>

        <div className="header-right">
          <div className="logged-user">
            <Dropdown
              id="header-dropdown"
              triggerToggle
              style={{
                top: 40,
              }}
              placement="bottomright"
              trigger={() => (
                <div className="logged-user-container">
                  <span className="logged-user-icon">
                    <FaUserAlt size={14} />
                  </span>

                  <span className="logged-user-name">
                    {/* {user?.data?.full_name ??
                      user?.data?.user_details?.full_name} */}
                    Admin
                  </span>

                  <span className="logged-user-arrow-down">
                    <MdKeyboardArrowDown size={24} />
                  </span>
                </div>
              )}
            >
              <Menu.Container
                style={{ width: 210, overflow: 'hidden', fontSize: 20 }}
              >
                <Menu.Item
                  className="menuItem"
                  onClick={() => setVisible(true)}
                  style={{ width: 210, overflow: 'hidden', fontSize: 20 }}
                >
                  Change Password
                </Menu.Item>

                <Menu.Item
                  className="menuItem"
                  onClick={
                    () => handleLogout()
                    // dispatch(userAuthLogoutAction(handleLogout))
                  }
                  style={{ width: 210, overflow: 'hidden', fontSize: 20 }}
                  danger
                >
                  Logout
                </Menu.Item>
              </Menu.Container>
            </Dropdown>
            <ChangePasswordModal {...{ visible, setVisible }} />
          </div>
        </div>
      </div>
    </div>
  )
}

const ChangePasswordModal = ({
  visible,
  setVisible,
}: {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data, onChangeHandler, onClear } = useInput({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const { handleLogout } = useAuth()

  // const {passwordLoader} = useSelector((state: any) => state.login)
  // const {user} = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const handleModalClose = () => {
    setVisible(false)
    onClear()
  }
  const onSubmit = (e: any) => {
    e.preventDefault()

    const catchedErros = {}
    const validate = validator(catchedErros)

    const { oldPassword, newPassword, confirmPassword } = data

    validate('oldPassword', oldPassword.length === 0, () => {
      toast.error("Phone can't be empty!")
    })

    validate('newPassword', newPassword.length < 6, () => {
      toast.error("Password can't be empty!")
    })

    validate('confirmPassword', confirmPassword.length < 6, () => {
      toast.error('Password must be atleaset 6 characters')
    })

    newPassword.length === confirmPassword.length &&
      confirmPassword.length > 6 &&
      validate('confirmPassword', newPassword !== confirmPassword, () => {
        toast.error("Password doesn't match. Please recheck")
      })

    if (!isValid(catchedErros)) {
      return
    }

    if (
      String(data.newPassword) === String(data.confirmPassword) &&
      data.newPassword.length >= 6
    ) {
      handleModalClose()
    } else if (data.newPassword.length < 6) {
      toast.error('Password must be atleaset 6 characters')
    } else {
      toast.error("Password doesn't match. Please recheck")
    }
  }

  return (
    <Modal id={'header-modal'} visible={visible} width={360}>
      <div className="change-password-modal">
        <div className="change-password-modal-header">
          <div>
            <h3>Change Password</h3>
          </div>
          <IoIosCloseCircle size={24} color="red" onClick={handleModalClose} />
        </div>
        <form onSubmit={onSubmit} className="change-password-modal-form">
          <InputField
            name="oldPassword"
            placeholder="Old Password"
            type="password"
            // ref={register({required: true})}
            value={data.oldPassword}
            onChange={onChangeHandler('oldPassword')}
          />
          <InputField
            placeholder="Password"
            name="newPassword"
            // ref={register({
            //   required: 'You must specify a password',
            // })}
            value={data.newPassword}
            onChange={onChangeHandler('newPassword')}
            type="password"
          />
          <InputField
            placeholder="Confirm Password"
            name="confirmPassword"
            // ref={register({
            //   validate: (value) =>
            //     value === newPassword.current ||
            //     'The passwords do not match',
            // })}
            value={data.confirmPassword}
            onChange={onChangeHandler('confirmPassword')}
            type="password"
          />
          {/* {errors.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )} */}
          <div style={{ width: '100%' }}>
            {/* <ActivityIndicator animating={passwordLoader}> */}
            <Button title="Submit" color="primary" />
            {/* </ActivityIndicator> */}
            <Button title="Cancel" type="button" onClick={handleModalClose} />
          </div>
        </form>
      </div>
    </Modal>
  )
}
