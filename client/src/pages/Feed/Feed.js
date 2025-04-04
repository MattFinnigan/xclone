import styles from './Feed.module.css'
import Page from '../Page.js'
import Button from '../../components/common/Button/Button.js'
import PostForm from '../../components/forms/PostForm/PostForm.js'
import { useEffect, useState } from 'react'
import { useCurrentUser } from '../../context/CurrentUserContext.js'
import { getPosts } from '../../utils/api.js'

function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [feedOption, setFeedOption] = useState('forYou')
  const currentUser = useCurrentUser()
  const isLoggedIn = currentUser !== null

  useEffect(() => {
    getPosts().then((resp) => {
      setPosts(resp.data)
      setLoading(false)
    }).catch((error) => {
      console.error('Error fetching posts:', error)
    }).finally(() => {
      setLoading(false)
    })
  }, [])
  return (
    <Page>
      <div className={styles.feedContainer}>
        <div className={styles.feedOptions}>
          <div className={styles.feedOptionButton}>
            <Button type="listitem" size="large" colour="transparent" width="100%" onClick={() => setFeedOption('forYou')}>
              <div className={[styles.buttonText, feedOption === 'forYou' && styles.active].join(' ')}>For you</div>
            </Button>
            {feedOption === 'forYou' && (<div className={styles.underline} style={{ width: '55px' }}></div>)}
          </div>
          <div className={styles.feedOptionButton}>
            <Button type="listitem" size="large" colour="transparent" width="100%" onClick={() => setFeedOption('following')}>
              <div className={[styles.buttonText, feedOption === 'following' && styles.active].join(' ')}>Following</div>
            </Button>
            {feedOption === 'following' && (<div className={styles.underline} style={{ width: '70px' }}></div>)}
          </div>
        </div>
        {isLoggedIn && (<PostForm />)}
        <div className={styles.feedContent}>
        </div>
      </div>
    </Page>
  )
}
export default Feed