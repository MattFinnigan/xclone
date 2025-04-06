import { useState } from 'react'
import { logout } from '../../../utils/helpers'
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
  const [showLogout, setShowLogout] = useState(false)
  const showLoginModal = () => {
    dispatch({ type: 'LOGIN_MODAL' })
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className={styles.sideMenu} onClick={() => {
      if (showLogout) {
        setShowLogout(false)
      }
    }}>
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
            <div className={styles.profileButton}>
              <Button size='large' colour='transparent' onClick={() => setShowLogout(!showLogout)}>
                <div className={styles.userContainer}>
                  <div className={styles.imageContainer}>
                    <img src={`/images/avatars/${currentUser.avatar || 'default.png'}`} alt="avatar" className={styles.avatar} />
                  </div>
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>{currentUser.name}</div>
                    <div className={styles.userHandle}>{currentUser.handle}</div>
                  </div>
                  <div className={styles.dots}>...</div>
                </div>
              </Button>
              {showLogout && (
                <div className={styles.logoutContain}>
                  <Button size='md' type='listitem' colour='transparent' width='100%' onClick={handleLogout}>
                    Logout {currentUser.handle}
                  </Button>
                </div>
              )}
            </div>
          </>
        )
        }

      </div>
    </div>
  )
}
export default SideMenu