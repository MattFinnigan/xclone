import styles from './Profile.module.css'
import Page from '../Page.js'
import Spinner from '../../components/common/Spinner/Spinner.js'
import Button from '../../components/common/Button/Button.js'
import Icon from '../../components/common/Icon/Icon.js'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { fetchUserProfile } from '../../utils/api.js'

function Profile () {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const { userId } = useParams()

  useEffect(() => {
    fetchUserProfile(userId).then((res) => {
      setUser(res.data)
      setLoading(false)
    })
  }, [userId])

  return (
    <Page>
      <div className={styles.profilePage}>
        {loading && <Spinner />}
        {!loading && (
          <>
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <Button type="icon" colour="transparent" width="auto" onClick={() => { window.history.back() }}>
                  <Icon name="arrow-left" size="20px" maskSize="cover" colour="white" />
                </Button>
                <div  className={styles.headerText}>
                  <h2>{user.name}</h2>
                  <p className={styles.postCount}>{user.posts.length} post{user.posts.length > 1 && 's'}</p>
                </div>
              </div>
            </div>
            <div className={styles.pageContent}>
              <div className={styles.imgsWrapper}>
                <div className={styles.bannerContainer}></div>
                <div className={styles.profileImgContainer}>
                  <img src={`/images/avatars/${user.avatar || 'default.png'}`} alt="User Avatar" />
                </div>
                <div className={styles.editButton}>
                  <Button size="md" colour="black" width="auto">
                    Edit profile
                  </Button>
                </div>
              </div>
              <div className={styles.userDetails}>
                <h2 className={styles.name}>{user.name}</h2>
                <div className={styles.handle}>{user.handle}</div>
                <div className={styles.joined}>
                  <Icon name="date" size="sm" colour="grey"/>&nbsp;Joined April 2025
                </div>
                <div className={styles.following}>
                  <span><span className={styles.followCount}>123</span> Following</span>
                  <span><span className={styles.followCount}>456</span> Followers</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Page>
  )
}

export default Profile