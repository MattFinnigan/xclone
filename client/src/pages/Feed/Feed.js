import { useEffect, useState } from 'react'
import { useCurrentUser } from '../../context/CurrentUserContext.js'
import { useCurrentPosts, useCurrentPostsDispatch } from '../../context/CurrentPostsContext.js'
import { getPosts, fetchPost } from '../../utils/api.js'
import styles from './Feed.module.css'
import Page from '../Page.js'
import Button from '../../components/common/Button/Button.js'
import PostForm from '../../components/forms/PostForm/PostForm.js'
import Spinner from '../../components/common/Spinner/Spinner.js'
import Post from '../../components/common/Post/Post.js'

function Feed() {
  const [loading, setLoading] = useState(true)
  const [feedOption, setFeedOption] = useState('forYou')
  const currentUser = useCurrentUser()
  const isLoggedIn = currentUser !== null
  const currentPosts = useCurrentPosts()
  const currentPostsDispatch = useCurrentPostsDispatch()

  useEffect(() => {
    setLoading(true)
    getPosts().then((resp) => {
      currentPostsDispatch(resp.data)
    }).catch((error) => {
      console.error('Error fetching posts:', error)
    }).finally(() => {
      setLoading(false)
    })
  }, [currentPostsDispatch])

  const refreshSinglePost = (id) => {
    fetchPost(id).then((resp) => {
      currentPostsDispatch(currentPosts.map((p) => {
        if (p.id === resp.data.id) {
          return resp.data
        }
        return p
      }))
    })
  }

  const refreshPosts = () => {
    setLoading(true)
    getPosts().then((resp) => {
      currentPostsDispatch(resp.data)
    }).catch((error) => {
      console.error('Error fetching posts:', error)
    }).finally(() => {
      setLoading(false)
    })
  }
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
        {isLoggedIn && (
          <div className={styles.postForm}>
            <PostForm onSuccess={refreshPosts} />
          </div>
        )}
        <div className={styles.feedContent}>
        </div>
        <div className={styles.feedPosts}>
          {loading && <Spinner />}
          {!loading && currentPosts.map((post) => (
            <Post key={post.id} post={post} context="feed" onPostUpdated={() => refreshSinglePost(post.id)} />
          ))}
        </div>
      </div>
    </Page>
  )
}
export default Feed