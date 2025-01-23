import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import myStore, { persistor } from './src/Configuration/store'
import { PersistGate } from 'redux-persist/integration/react'
import SocketContextProvider from './src/Context/SocketContext'
import { ToastContainer } from 'react-toastify'

export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={_url}>
        <Provider store={myStore}>
          <PersistGate loading={null} persistor={persistor}>
            <SocketContextProvider>
              <ToastContainer />
              <App />
            </SocketContextProvider>
          </PersistGate>
        </Provider>
      </StaticRouter>
    </StrictMode>,
  )
  return { html }
}
