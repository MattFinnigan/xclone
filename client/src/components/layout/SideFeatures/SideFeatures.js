import styles from './SideFeatures.module.css'
import Input from '../../common/Input/Input'
function SideFeatures() {
  return (
    <div className={styles.sideFeatures}>
      <div className={styles.searchContainer}>
        <Input type="search" placeholder="Search" icon="search" />
      </div>
      <div className={styles.sideBarContent}>
        <h2 className={styles.heading}>What's happening</h2>
      </div>
      <div className={styles.sideBarContent}>
        <h2 className={styles.heading}>Who to follow</h2>
      </div>
    </div>
  )
}
export default SideFeatures