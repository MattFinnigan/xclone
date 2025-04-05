import styles from './App.module.css'
import { checkAuth } from './utils/api'
import { useModal, useModalDispatch } from './context/ModalContext'
import { useCurrentUserDispatch } from './context/CurrentUserContext'
import Login from './components/forms/Login/Login.js'
import SideMenu from './components/layout/SideMenu/SideMenu.js'
import SideFeatures from './components/layout/SideFeatures/SideFeatures.js'
import { useEffect } from 'react'
import Register from './components/forms/Register/Register.js'

function App({ children }) {
  const modalState = useModal()
  const dispatchModal = useModalDispatch()
  const dispatchCurrentUser = useCurrentUserDispatch()

  useEffect(() => {
    checkAuth().then((user) => {
      dispatchCurrentUser(user)
    })
  })

  const renderModal = () => {
    if (modalState === 'LOGIN_MODAL') {
      return <Login onSuccess={(user) => loginSuccess(user)} />
    } else if (modalState === 'SIGNUP_MODAL') {
      return <Register onSuccess={(user) => loginSuccess(user)} />
    }
  }

  const hideModal = () => {
    dispatchModal(null)
  }

  const loginSuccess = (user) => {
    hideModal()
    dispatchCurrentUser(user)
  }

  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <SideMenu />
        <div className={styles.appContent}>
          {children}
        </div>
        <SideFeatures />
      </div>
      {renderModal()}
    </div>
  )
}

export default App
