import styles from './Register.module.css'
import { useState } from 'react'
import { register } from '../../../utils/api'
import Modal from '../../modals/Modal'
import Input from '../../common/Input/Input'
import Button from '../../common/Button/Button'

function Register({ onSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    if (submitting || error) {
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    setError(null)

    register(name, email, password).then((user) => {
      setSubmitting(false)
      onSuccess(user)
    }).catch((error) => {
      setSubmitting(false)
      console.error(error)
      setError(error.response?.data?.message || 'An error occurred')
    })
  }
  return (
    <Modal
      content={
        <div className={styles.register}>
          <h1>Create your account</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholderLabel="Name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(null) }}
              required={true} />
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
            <Input
              type="password"
              placeholderLabel="Confirm password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(null) }}
              required={true} />
            <div className={styles.buttonWrapper}>
              <Button type="submit" colour="white" size="large" width="100%" disabled={submitting}>Submit</Button>
            </div>
          </form>
        </div>
      }
    />
  )
}

export default Register