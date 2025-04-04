import styles from './SideMenu.module.css'
import Icon from '../../common/Icon/Icon'
import Button from '../../common/Button/Button'
import { useCurrentRoute } from '../../../context/RouteContext'
import { useModalDispatch } from '../../../context/ModalContext'
import { useCurrentUser } from '../../../context/CurrentUserContext'

function SideMenu() {
  const activeItem = useCurrentRoute()
  const dispatch = useModalDispatch()
  const currentUser = useCurrentUser()
  const isLoggedIn = currentUser && currentUser.id

  const showLoginModal = () => {
    dispatch('LOGIN_MODAL')
  }

  return (
    <div className={styles.sideMenu}>
      <div className={styles.sideMenuHeader}>
        <div className={styles.logoContainer}>
          <Icon name="logo" size="2.5em" maskSize="26px" colour="white" />
        </div>
      </div>
      <div className={styles.sideMenuContent}>
        <a href='/' className={styles.menuItem}>
          <div><Icon name="home" size="1.7em" maskSize="26px" colour="white" /></div>
          <div className={[styles.menuItemLabel, activeItem === '/' && styles.active].join(' ')}>Home</div>
        </a>
        <a href='/explore' className={styles.menuItem}>
          <div><Icon name="search" size="1.7em" maskSize="26px" colour="white" /></div>
          <div className={[styles.menuItemLabel, activeItem === '/explore' && styles.active].join(' ')}>Explore</div>
        </a>
        <a href='/notifications' className={styles.menuItem}>
          <div><Icon name="notif" size="1.7em" maskSize="26px" colour="white" /></div>
          <div className={[styles.menuItemLabel, activeItem === '/notifications' && styles.active].join(' ')}>Notifications</div>
        </a>
        <a href='/messages' className={styles.menuItem}>
          <div><Icon name="msg" size="1.7em" maskSize="26px" colour="white" /></div>
          <div className={[styles.menuItemLabel, activeItem === '/messages' && styles.active].join(' ')}>Messages</div>
        </a>
        <a href='/profile' className={styles.menuItem}>
          <div><Icon name="profile" size="1.7em" maskSize="26px" colour="white" /></div>
          <div className={[styles.menuItemLabel, activeItem === '/profile' && styles.active].join(' ')}>Profile</div>
        </a>
        {!isLoggedIn ? (
          <Button size='large' colour='white' width='90%' onClick={() => showLoginModal()}>
            Login
          </Button>
        ) : (
          <>
            <Button size='large' colour='white' width='90%'>
              Post
            </Button>
            <p>Logged in as: {currentUser.email}</p>
          </>
        )
        }

      </div>
    </div>
  )
}
export default SideMenu