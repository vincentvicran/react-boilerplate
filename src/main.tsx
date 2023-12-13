import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { HashRouter, useRoutes } from 'react-router-dom'

import { store } from 'src/store'
import './sass/main.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import { AuthProvider } from './app/routing'
import { Routes } from './app/routing/routes'
import { SideNav } from './app/routing/sideNav/'

const MemoChild = () => {
  return (
    <AuthProvider>
      <SideNav />
      <App />
    </AuthProvider>
  )
}

const App = () => {
  return (
    <main className="main-app">
      {useRoutes(Routes)}
      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Provider store={store}>
      <MemoChild />
    </Provider>
  </HashRouter>,
)
