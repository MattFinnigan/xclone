import styles from './Button.module.css'

function Button({ link, size, type, width, colour, onClick, disabled, children }) {
  const buttonStyles = [
    styles.button,
    styles[size],
    styles[type],
    styles[colour]
  ].join(' ')
  return (
    <>
      {
        link ? (
          <button className={[buttonStyles, styles.link]} onClick={onClick} disabled={disabled} style={{ width: width }}>
            <div>{children}</div>
          </button>
        ) : (
          <button type={type} className={buttonStyles} onClick={onClick} disabled={disabled} style={{ width: width }}>
            <div>{children}</div>
          </button>
        )
      }
    </>
  )
}
export default Button