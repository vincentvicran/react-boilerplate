import { api } from 'src/api'

// MARK: - login
const login = async (data: { email: string; password: string }) => {
  const response = await api<Api.Base<Api.Session>>('post')(
    'auth/login',
    undefined,
    data,
  )

  return response.data.data.data
}

// MARK: - authenticateUser
const authenticateUser = async () => {
  const response = await api<Api.Base<Api.Session>>('get')('users')

  return response.data.data.data
}

// MARK: CHANGE PASSWORD
const changePasword = async ({
  oldPass,
  newPass,
}: {
  oldPass: string
  newPass: string
}) => {
  const response = await api<Api.Base<{}>>('patch')('auth/change', undefined, {
    oldPass,
    newPass,
  })

  return response.data.data.data
}

export const loginService = { login, authenticateUser, changePasword }
