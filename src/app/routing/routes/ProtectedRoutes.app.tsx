import { useMemo } from 'react'
import { useLocation, Navigate, Outlet, matchPath } from 'react-router-dom'

import { useAuth } from '../hooks'
import { USER_ROLES } from '../roles'

const ProtectedAuth = () => {
  const { auth, authLoading } = useAuth()
  const location = useLocation()
  const canAccess = useCanAccessRoute()
  return auth?.isLoggedin ? (
    canAccess?.length > 0 ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )
  ) : !authLoading ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <></>
  )
}

export const useCanAccessRoute = (url?: string) => {
  const { auth } = useAuth()
  const location = useLocation()

  const testRoutes = useMemo(
    () => (auth.role ? USER_ROLES[auth.role]?.access : []),
    [auth.role],
  )

  const canAccess = testRoutes.filter((path: any) => {
    return matchPath({ path: path }, url ?? location.pathname)
  })
  return canAccess
}

const PublicAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()

  const canAccess = useCanAccessRoute()
  const testRoutes = useMemo(
    () => (auth.role ? USER_ROLES[auth.role]?.access : []),
    [auth.role],
  )
  return auth?.isLoggedin ? (
    <Navigate to={testRoutes[0]} state={{ from: location }} replace />
  ) : canAccess ? (
    <Outlet />
  ) : (
    <Navigate to={'/denied'} state={{ from: location }} replace />
  )
}

const PublicAccessibleAuth = () => {
  const location = useLocation()

  const canAccess = useCanAccessRoute()

  return canAccess ? (
    <Outlet />
  ) : (
    <Navigate to={'/denied'} state={{ from: location }} replace />
  )
}

export { ProtectedAuth, PublicAuth, PublicAccessibleAuth }
