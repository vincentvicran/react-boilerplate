import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import { IoMdSearch } from 'react-icons/io'
import { Tooltip } from 'src/app/common'
import { useAuth } from '../hooks'
import { useCanAccessRoute } from '../routes/ProtectedRoutes.app'

export const SideNav = React.memo(() => {
  const { auth } = useAuth()
  return auth.isLoggedin ? <SideNavComponent /> : null
})

const SideNavComponent = React.memo(() => {
  const { auth, sidenavExpand } = useAuth()

  const props = { width: sidenavExpand ? 280 : 90 }

  const headerStyle = { width: sidenavExpand ? 60 : 80 }

  return auth.isLoggedin ? (
    <div className="sidenav-container">
      <motion.div
        style={{
          height: '100%',
        }}
        animate={props}
      >
        <div className="sidenav-header">
          <motion.div className="sidenav-header-logo1" animate={headerStyle}>
            <img src={'/assets/images/header-logo.svg'} alt="TMO" />
          </motion.div>
          {/* {transitions(
            (animationStyle, item) =>
              item && (
                <motion.div
                  className="sidenav-header-title"
                  style={{
                    ...animationStyle
                  }}
                >
                </motion.div>
              )
          )} */}
        </div>
        <motion.div style={{ height: 'auto' }}>
          <GetNav route={'Sample'} url={'/sample'} icon={<IoMdSearch />} />
        </motion.div>
      </motion.div>
    </div>
  ) : null
})

const GetNav = ({
  route,
  url,
  icon,
}: {
  route: string
  url: string
  icon: React.ReactNode
}) => {
  const canAccess = useCanAccessRoute(url)
  const { sidenavExpand } = useAuth()
  if (!route) return null
  const props = { opacity: sidenavExpand ? 1 : 0 }

  return canAccess.length > 0 ? (
    <div className={`sidenav${sidenavExpand ? '' : '-small'}`}>
      <NavLink
        to={url}
        style={({ isActive }) => ({
          textDecoration: 'none',
        })}
        className={({ isActive }) =>
          isActive
            ? 'sidenav-title-container active '
            : 'sidenav-title-container'
        }
      >
        <div className="sidenav-title">
          <Tooltip title={route}>
            <div className="sidenav-title-icon">{icon}</div>
          </Tooltip>
          {sidenavExpand && (
            <motion.div className="sidenav-title-text" animate={props}>
              {route}
            </motion.div>
          )}
        </div>
      </NavLink>
    </div>
  ) : (
    <></>
  )
}
