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
          <a href={link} className={buttonStyles} onClick={onClick} style={{ width: width }}>
            <span>{children}</span>
          </a>
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