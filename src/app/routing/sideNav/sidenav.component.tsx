import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Tooltip } from 'src/app/common'
import { useAuth } from '../hooks'
import { useCanAccessRoute } from '../routes/ProtectedRoutes.app'
// import {useMeasure} from 'src/hooks'

export const SideNav = React.memo(() => {
  const { auth } = useAuth()
  return auth.isLoggedin ? <SideNavComponent /> : null
})

const SideNavComponent = React.memo(() => {
  const { auth, sidenavExpand } = useAuth()

  // const [sideNavHeight, setSideNavHeight] = useState<number>(0)
  // const [headerHeight, setHeaderHeight] = useState<number>(0)

  const props = { width: sidenavExpand ? 280 : 90 }

  const headerStyle = { width: sidenavExpand ? 60 : 80 }

  // const transitions = useTransition(sidenavExpand, {
  //   from: {opacity: 0},
  //   enter: {opacity: 1},
  //   leave: {opacity: 0},
  //   config: {
  //     duration: 200
  //   }
  // })

  // const onToggleSidenav = () => {
  //   setSidenavExpand((prev) => !prev)
  // }

  // const sideNavBind = useMeasure(({height}: any) => {
  //   setSideNavHeight(height)
  // })

  // const headerBind = useMeasure(({height}: any) => {
  //   setHeaderHeight(height)
  // })

  return auth.isLoggedin ? (
    <div
      className="sidenav-container"
      //  {...sideNavBind()}
    >
      <motion.div
        style={{
          height: '100%',
          ...props,
        }}
      >
        <div
          className="sidenav-header"
          // {...headerBind()}
        >
          <motion.div
            className="sidenav-header-logo1"
            style={{
              ...headerStyle,
            }}
          >
            <img src={'/assets/images/header-logo.svg'} alt="TMO" />
            {/* <img src={Logo1} alt="Logo1" /> */}
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
          {/* {getNav('Sample', '/sample', () => (
            <ImSearch />
          ))} */}
        </motion.div>
      </motion.div>
    </div>
  ) : null
})

const GetNav = (route: string, url: string, icon: () => React.ReactNode) => {
  const canAccess = useCanAccessRoute(url)
  const { sidenavExpand } = useAuth()
  if (!route) return null
  const props = { opacity: sidenavExpand ? 1 : 0 }

  return (
    canAccess.length > 0 && (
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
              <div className="sidenav-title-icon">
                {/* <ImSearch /> */}
                {icon()}
              </div>
            </Tooltip>
            {sidenavExpand && (
              <motion.div
                className="sidenav-title-text"
                style={{
                  ...props,
                }}
              >
                {route}
              </motion.div>
            )}
          </div>
        </NavLink>
      </div>
    )
  )
}
