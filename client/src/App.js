import styles from './App.module.css'
import { checkAuth } from './utils/api'
import { useModal, useModalDispatch } from './context/ModalContext'
import { useCurrentUserDispatch } from './context/CurrentUserContext'
import { useEffect } from 'react'

import Login from './components/forms/Login/Login.js'
import SideMenu from './components/layout/SideMenu/SideMenu.js'
import SideFeatures from './components/layout/SideFeatures/SideFeatures.js'
import Register from './components/forms/Register/Register.js'
import CommentForm from './components/forms/CommentForm/CommentForm.js'
import Modal from './components/modals/Modal.js'

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
    console.log(modalState)
    if (modalState.type === 'LOGIN_MODAL') {
      return <Login onSuccess={(user) => loginSuccess(user)} />
    } else if (modalState.type === 'SIGNUP_MODAL') {
      return <Register onSuccess={(user) => loginSuccess(user)} />
    } else if (modalState.type === 'COMMENT_MODAL') {
      return (
        <Modal content={
          <CommentForm post={modalState.data} onSuccess={(comment) => commentSuccess(comment)} />
        } />
      )
    }
  }

  const hideModal = () => {
    dispatchModal({ type: null })
  }

  const loginSuccess = (user) => {
    hideModal()
    dispatchCurrentUser(user)
  }

  const commentSuccess = (comment) => {
    hideModal()
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
