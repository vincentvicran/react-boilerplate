import React from 'react'
import {IoWarning} from 'react-icons/io5'
import {MdError, MdInfo} from 'react-icons/md'
import {RiCheckboxCircleFill} from 'react-icons/ri'
import {colors} from 'src/modules'

const infoBarIcons: Record<Com.DataInfoTypes, React.ReactNode> = {
  error: <MdError color={colors.base.critical} size={20} />,
  warning: <IoWarning color={colors.base.warning} size={20} />,
  success: <RiCheckboxCircleFill color={colors.base.success} size={20} />,
  info: <MdInfo color={colors.base.primary} size={20} />,
  primary: <MdInfo color={colors.teal} size={20} />
}

export const ErrorMessage = ({data, ...rest}: Com.ErrorMessageProps) => {
  const dataKeys = Object?.keys(data)
  const getBackground = () => {
    if (dataKeys.includes('error')) {
      return 'error'
    }
    if (dataKeys.includes('warning')) {
      return 'warning'
    }
    if (dataKeys.includes('success')) {
      return 'success'
    }
    if (dataKeys.includes('primary')) {
      return 'primary'
    }
    return 'info'
  }

  return (
    <div className={`info-bar ${getBackground()}`} {...rest}>
      {dataKeys?.map((value, index: number) => {
        return (
          <div key={index} className="info-bar-container">
            <div className="info-bar-icon">
              {infoBarIcons[value as Com.DataInfoTypes]}
            </div>
            <div className="info-bar-text">
              {data[value as Com.DataInfoTypes]}
            </div>
          </div>
        )
      })}
    </div>
  )
}
