// import styles from './Icon.scss'
import styles from './Icon.module.css'
function Icon({ name, size, maskSize, colour }) {
  return (
    <i
      className={[styles.icon, styles[name], styles[colour]].join(' ')}
      style={{ width: size, height: size, maskSize, maskImage: `url(/images/${name}.svg)` }} />
  )
}
export default Icon;