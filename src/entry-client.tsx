import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import myStore, { persistor } from './src/Configuration/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SocketContextProvider from './src/Context/SocketContext'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <Provider store={myStore}>
        <PersistGate loading={null} persistor={persistor}>
          <SocketContextProvider>
            <ToastContainer />
            <App />
          </SocketContextProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
