import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import reportWebVitals from './reportWebVitals'

import App from './App'
import Feed from './pages/Feed/Feed.js'
import { ModalProvider } from './context/ModalContext'
import { CurrentRouteProvider } from './context/RouteContext'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Feed />
  },
  {
    path: '/explore',
    element: <Feed />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ModalProvider>
      <CurrentRouteProvider>
        <App>
          <RouterProvider router={router} />
        </App>
      </CurrentRouteProvider>
    </ModalProvider>
  </React.StrictMode >
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
