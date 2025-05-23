import styles from './Input.module.css'
import Icon from '../Icon/Icon'
import { useEffect, useRef } from 'react'
import autosize from 'autosize'

function Input({ value, required, type, placeholder, placeholderLabel, icon, onChange, onFocus, onBlur, styling, size }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (type === 'textarea') {
      autosize(inputRef.current)
      console.log('Autosize applied to textarea')
    }
  })

  const handleChange = (e) => {
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className={[styles.inputContainer, icon ? styles.inputWithIcon : ''].join(' ')}>
      {icon && (
        <div className={styles.iconContainer}>
          <Icon name={icon} size="16px" maskSize="16px" colour="grey" />
        </div>
      )}
      {type === 'textarea' ? (
        <textarea
          ref={inputRef}
          rows="1"
          value={value}
          required={required}
          onChange={handleChange}
          className={[styles.input, styles[size], styles[styling]].join(' ')}
          placeholder={placeholder || placeholderLabel}
          onBlur={onBlur}
          onFocus={onFocus} />
      ) : (
        <input
          type={type}
          value={value}
          required={required}
          onChange={handleChange}
          className={[styles.input, styles[size], styles[styling], placeholderLabel && styles.inputWithPlaceholder].join(' ')}
          placeholder={placeholder || placeholderLabel}
          onBlur={onBlur}
          onFocus={onFocus} />
      )}
      {placeholderLabel && (
        <label className={styles.placeholderLabel}>
          {placeholderLabel}
        </label>
      )}
    </div>
  )
}

export default Input