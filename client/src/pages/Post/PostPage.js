import { useEffect, useState } from 'react'
import { fetchPost } from '../../utils/api.js'
import { useParams } from 'react-router'
import { formatDate, formatTime, sanitize } from '../../utils/helpers.js'
import styles from './PostPage.module.css'
import Page from '../Page.js'
import Spinner from '../../components/common/Spinner/Spinner.js'
import Button from '../../components/common/Button/Button.js'
import Icon from '../../components/common/Icon/Icon.js'
import CommentForm from '../../components/forms/CommentForm/CommentForm.js'
import Post from '../../components/common/Post/Post.js'

function PostPage() {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  const { postId } = useParams()
  const [hovering, setHovering] = useState(null)
  const postContent = sanitize(post?.content || '')

  const getPost = () => {
    setLoading(true)
    fetchPost(postId).then((resp) => {
      setPost(resp.data)
    }).catch((error) => {
      console.error('Error fetching posts:', error)
    }).finally(() => {
      setLoading(false)
    })
  }
  useEffect(() => {
    setLoading(true)
    fetchPost(postId).then((resp) => {
      setPost(resp.data)
    }).catch((error) => {
      console.error('Error fetching posts:', error)
    }).finally(() => {
      setLoading(false)
    })
  }, [postId])

  return (
    <Page>
      <div className={styles.postContainer}>
        {loading && <Spinner />}
        {!loading && (
          <>
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <Button type="icon" colour="transparent" width="auto" onClick={() => { window.history.back() }}>
                  <Icon name="arrow-left" size="20px" maskSize="cover" colour="white" />
                </Button>
                <h2 className={styles.postTitle}>Post</h2>
              </div>
              <Button size="sm" colour="black" width="auto" onClick={() => { window.location.href = `/post/${postId}/edit` }}>
                Reply
              </Button>
            </div>
            <div className={styles.postWrapper}>
              <div className={styles.topRow}>
                <div className={styles.imageContainer}>
                  <img src={`/images/avatars/${post.user.avatar || 'default.png'}`} alt="User Avatar" />
                </div>
                <div className={styles.userDetails}>
                  <div className={styles.userName}><strong>{post.user.name}</strong></div>
                  <div className={styles.greyText}>{post.user.handle}</div>
                  <div className={styles.dotsContain}>
                    <Button
                      type="icon"
                      highlight="primary-alt"
                      colour="transparent"
                      width="auto"
                      onMouseEnter={() => { setHovering('dots') }}
                      onMouseLeave={() => { setHovering(null) }}>
                      <Icon name="dots" size="19px" maskSize="cover" colour={hovering === 'dots' ? 'primary' : 'grey'} />
                    </Button>
                  </div>
                </div>
              </div>
              <div className={styles.postContainer}>
                <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: postContent }}></div>
                <div className={styles.postDetails}>
                  {formatTime(post.createdAt, { hour: '2-digit', minute: '2-digit' })}&nbsp;·&nbsp;
                  {formatDate(post.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}&nbsp;·&nbsp;
                  <span className={styles.greyText}><strong style={{ color: 'white' }}>165</strong> Views</span>
                </div>
                <div className={styles.buttonContainer}>
                  <div className={styles.button}>
                    <Button
                      type="icon"
                      colour="transparent"
                      width="auto"
                      highlight="primary-alt"
                      onMouseEnter={() => { setHovering('comment') }}
                      onMouseLeave={() => { setHovering(null) }}>
                      <Icon name="comment" size="23px" maskSize="cover" colour={hovering === 'comment' ? 'primary' : 'grey'} />
                    </Button>
                  </div>
                  <div className={styles.button}>
                    <Button
                      type="icon"
                      colour="transparent"
                      width="auto"
                      highlight="green"
                      onMouseEnter={() => { setHovering('repost') }}
                      onMouseLeave={() => { setHovering(null) }}>
                      <Icon name="repost" size="23px" maskSize="cover" colour={hovering === 'repost' ? 'green' : 'grey'} />
                    </Button>
                  </div>
                  <div className={styles.button}>
                    <Button
                      type="icon"
                      colour="transparent"
                      width="auto"
                      highlight="liked"
                      onMouseEnter={() => { setHovering('like') }}
                      onMouseLeave={() => { setHovering(null) }}>
                      <Icon name="like" size="23px" maskSize="cover" colour={hovering === 'like' ? 'liked' : 'grey'} />
                      <span className={[styles.buttonText, hovering === 'like' ? styles.liked : styles.greyText].join(' ')}> </span>
                    </Button>
                  </div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className={styles.replyContainer}>
              <CommentForm post={post} onSuccess={() => getPost()} />
            </div>
            <div className={styles.commentsContainer}>
              {post.comments.map((comment) => (
                <Post key={comment.id} post={comment} onSuccess={() => getPost()} />
              ))}
            </div>
          </>
        )}
      </div>
    </Page>
  )
}
export default PostPage