import React from 'react'
import {useAuth} from '../hooks'
import {useSpring, animated} from '@react-spring/web'
import {NavLink} from 'react-router-dom'
import {useCanAccessRoute} from '../routes/ProtectedRoutes.app'
import {ImSearch} from 'react-icons/im'
import SystemTitle from '../../../assets/images/logo.png'

import {Box, ToolTip} from 'src/app/common'
// import {useMeasure} from 'src/hooks'

export const SideNav = React.memo(() => {
  const {auth} = useAuth()
  return auth.isLoggedin ? <SideNavComponent /> : null
})

const SideNavComponent = React.memo(() => {
  const {auth, sidenavExpand} = useAuth()

  // const [sideNavHeight, setSideNavHeight] = useState<number>(0)
  // const [headerHeight, setHeaderHeight] = useState<number>(0)

  const props = useSpring({width: sidenavExpand ? 280 : 90})

  const headerStyle = useSpring({width: sidenavExpand ? 60 : 80})

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
      <animated.div
        style={{
          height: '100%',
          ...props
        }}
      >
        <div
          className="sidenav-header"
          // {...headerBind()}
        >
          <animated.div
            className="sidenav-header-logo1"
            style={{
              ...headerStyle
            }}
          >
            <img src={SystemTitle} alt="TMO" />
            {/* <img src={Logo1} alt="Logo1" /> */}
          </animated.div>
          {/* {transitions(
            (animationStyle, item) =>
              item && (
                <animated.div
                  className="sidenav-header-title"
                  style={{
                    ...animationStyle
                  }}
                >
                </animated.div>
              )
          )} */}
        </div>
        <Box style={{height: 'auto'}} pt={20}>
          {/* {getNav('Sample', '/sample', () => (
            <ImSearch />
          ))} */}
          {getNav('Businesses', '/business', () => (
            <ImSearch />
          ))}
          {getNav('Jobs', '/jobs', () => (
            <ImSearch />
          ))}
          {getNav('Report Complains', '/report-complains', () => (
            <ImSearch />
          ))}
          {getNav('Claim Request', '/claim-request', () => (
            <ImSearch />
          ))}
          {/* {getNav('User Management', '/user-management', () => (
            <ImSearch />
          ))} */}
        </Box>
      </animated.div>
    </div>
  ) : null
})

const getNav = (route: string, url: string, icon: () => React.ReactNode) => {
  if (!route) return null
  const canAccess = useCanAccessRoute(url)
  const {sidenavExpand} = useAuth()
  const props = useSpring({opacity: sidenavExpand ? 1 : 0})

  return (
    canAccess.length > 0 && (
      <div className={`sidenav${sidenavExpand ? '' : '-small'}`}>
        <NavLink
          to={url}
          style={({isActive}) => ({
            textDecoration: 'none'
          })}
          className={({isActive}) =>
            isActive
              ? 'sidenav-title-container active '
              : 'sidenav-title-container'
          }
        >
          <div className="sidenav-title">
            <ToolTip text={route}>
              <div className="sidenav-title-icon">
                {/* <ImSearch /> */}
                {icon()}
              </div>
            </ToolTip>
            {sidenavExpand && (
              <animated.div
                className="sidenav-title-text"
                style={{
                  ...props
                }}
              >
                {route}
              </animated.div>
            )}
          </div>
        </NavLink>
      </div>
    )
  )
}
