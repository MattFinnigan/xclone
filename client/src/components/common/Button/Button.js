import styles from './Button.module.css'

function Button({ link, size, type, width, colour, onClick, children }) {
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
          <button className={buttonStyles} onClick={onClick} style={{ width: width }}>
            <span>{children}</span>
          </button>
        )
      }
    </>
  )
}
export default Button