import styles from './Login.module.css'
import { useState } from 'react'
import { login } from '../../../utils/api'
import Modal from '../../modals/Modal'
import Input from '../../common/Input/Input'
import Button from '../../common/Button/Button'
import { useModalDispatch } from '../../../context/ModalContext'

function Login({ onSuccess }) {
  const [email, setEmail] = useState('matt@test.com')
  const [password, setPassword] = useState('testing123')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const modalDispatch = useModalDispatch()

  const handleSignup = () => {
    modalDispatch({ type: 'SIGNUP_MODAL' })
  }

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    if (submitting || error) {
      return
    }
    setSubmitting(true)
    setError(null)

    login(email, password).then((user) => {
      setSubmitting(false)
      onSuccess(user)
    }).catch((error) => {
      setSubmitting(false)
      setError(error.response?.data?.message || 'An error occurred')
    })
  }
  return (
    <Modal
      content={
        <div className={styles.login}>
          <h1>Sign in to X</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholderLabel="Email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null) }}
              required={true} />
            <Input
              type="password"
              placeholderLabel="Password (please don't reuse!)"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null) }}
              required={true} />
            <div className={styles.buttonWrapper}>
              <Button type="submit" colour="white" size="md" width="100%" disabled={submitting}>Login</Button>
            </div>
          </form>
          <div className={styles.buttonWrapper}>
            <Button type="submit" colour="black" size="md" width="100%">Forgot Password?</Button>
          </div>
          <p className={styles.signUp}>
            Don't have an account?&nbsp;
            <Button type="link" onClick={handleSignup}>Sign up</Button>
          </p>
        </div>
      }
    />
  )
}

export default Login