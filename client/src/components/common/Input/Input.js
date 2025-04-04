import styles from './Input.module.css'

function Input({ value, required, type, placeholder, onChange }) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e)
    }
  }
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        value={value}
        required={required}
        onChange={handleChange}
        className={styles.input}
        placeholder={placeholder} />
      {placeholder && (
        <div className={styles.placeholder}>
          {placeholder}
        </div>
      )}
    </div>
  )
}

export default Input