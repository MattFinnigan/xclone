import styles from './Button.module.css'

function Button({ link, size, type, width, colour, highlight, onClick, onMouseLeave, onMouseEnter, disabled, children }) {
  const buttonStyles = [
    styles.button,
    styles[size],
    styles[type],
    styles[colour],
    styles['highlight-' + highlight]
  ].join(' ')

  const handleClick = (e) => {
    e.stopPropagation()
    if (disabled) {
      return
    }
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <>
      {
        link ? (
          <button className={[buttonStyles, styles.link]} onClick={(e) => handleClick(e)} disabled={disabled} style={{ width: width }}>
            <div>{children}</div>
          </button>
        ) : (
          <button type={type} className={buttonStyles} onClick={(e) => handleClick(e)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} disabled={disabled} style={{ width: width }}>
            <div>{children}</div>
          </button>
        )
      }
    </>
  )
}
export default Button