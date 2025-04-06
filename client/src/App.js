import styles from './App.module.css'
import { checkAuth } from './utils/api'
import { useModal, useModalDispatch } from './context/ModalContext'
import { useCurrentUserDispatch } from './context/CurrentUserContext'
import { useEffect, useState } from 'react'

import Login from './components/forms/Login/Login.js'
import SideMenu from './components/layout/SideMenu/SideMenu.js'
import SideFeatures from './components/layout/SideFeatures/SideFeatures.js'
import Register from './components/forms/Register/Register.js'
import CommentForm from './components/forms/CommentForm/CommentForm.js'
import Modal from './components/modals/Modal.js'
import Spinner from './components/common/Spinner/Spinner.js'

function App({ children }) {
  const modalState = useModal()
  const dispatchModal = useModalDispatch()
  const dispatchCurrentUser = useCurrentUserDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    checkAuth().then((user) => {
      dispatchCurrentUser(user)
      setLoading(false)
    })
  }, [dispatchCurrentUser])

  const renderModal = () => {
    if (modalState.type === 'LOGIN_MODAL') {
      return <Login onSuccess={(user) => loginSuccess(user)} />
    } else if (modalState.type === 'SIGNUP_MODAL') {
      return <Register onSuccess={(user) => loginSuccess(user)} />
    } else if (modalState.type === 'COMMENT_MODAL') {
      return (
        <Modal content={
          <div style={{ marginTop: '20px' }}>
            <CommentForm post={modalState.data} includePost={true} onSuccess={(comment) => commentSuccess(comment)} />
          </div>
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
    window.location.href = `/post/${comment.post_id}`
    hideModal()
  }

  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        {loading ? <Spinner /> : <SideMenu />}
        <div className={styles.appContent}>
          {loading ? <Spinner /> : children}
        </div>
        {loading ? <Spinner /> : <SideFeatures />}
      </div>
      {renderModal()}
    </div>
  )
}

export default App
