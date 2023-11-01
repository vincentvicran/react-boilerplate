import {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
  memo,
  useCallback
} from 'react'

import {getCookie, removeCookie, setCookie} from '../../../helpers'

type AuthProps = {
  isLoggedin: boolean
  role: string
}

interface ContextProps {
  auth: AuthProps
  setAuth: Function
  authLoading: boolean
  user: Api.UserType | any
  sidenavExpand: boolean
  setSidenavExpand: Dispatch<SetStateAction<boolean>>
  handleLogin: (a?: string, b?: any) => void
  handleLogout: () => void
}

const defaultValue: ContextProps = {
  auth: {isLoggedin: false, role: ''},
  setAuth: () => {},
  authLoading: true,
  user: undefined,
  sidenavExpand: true,
  setSidenavExpand: () => {},
  handleLogin: () => {},
  handleLogout: () => {}
}

export const AuthContext = createContext<ContextProps>(defaultValue)

export const AuthProvider = memo(({children}: any) => {
  const [auth, setAuth] = useState<AuthProps>({
    isLoggedin: false,
    role: 'USER'
  })

  const [sidenavExpand, setSidenavExpand] = useState<boolean>(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [user, setUser] = useState<any>()
  console.log(auth, authLoading)

  const handleLogin = useCallback((role?: string, user?: any) => {
    user && setUser(user)
    user && setCookie('token', user?.accessToken)
    role && loginSuccess(role)
  }, [])

  const handleLogout = () => {
    loginFailure()
    removeCookie('token')
    removeCookie('@token')
  }

  const loginSuccess = (role: string) => {
    setAuth({
      isLoggedin: true,
      role
    })
    setAuthLoading(false)
  }

  const loginFailure = () => {
    setAuth({
      isLoggedin: false,
      role: 'USER'
    })
    setAuthLoading(false)
  }

  useEffect(() => {
    setAuthLoading(true)

    const token = getCookie('token')
    if (token) {
      handleLogin('ADMIN', token)
    } else {
      loginFailure()
    }
  }, [])

  if (authLoading) {
    return <div>Redirecting...</div>
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        authLoading,
        user,
        sidenavExpand,
        setSidenavExpand,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
})

export default AuthContext
