import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { HashRouter, useRoutes } from 'react-router-dom'

import { store } from 'src/store'
import './sass/main.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import { AuthProvider } from './app/routing'
import { Router } from './app/routing/routes'

const MemoChild = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

const App = () => {
  return (
    <div>
      {useRoutes(Router)}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Provider store={store}>
      <MemoChild />
    </Provider>
  </HashRouter>,
)
