import styles from './Post.module.css'
import Button from '../Button/Button.js'
import { sanitize, formatDate } from '../../../utils/helpers.js'
import { useEffect, useState } from 'react'
import Icon from '../Icon/Icon.js'
import { useModalDispatch } from '../../../context/ModalContext.js'

function Post({ post, commenting }) {
  const [postContent, setPostContent] = useState(post.content)
  const [hovering, setHovering] = useState(null)
  const modalDispatch = useModalDispatch()

  const handleComment = () => {
    modalDispatch({ type: 'COMMENT_MODAL', data: post })
  }

  useEffect(() => {
    setPostContent(sanitize(post.content))
  }, [post.content])

  return (
    <div className={styles.post}>
      <div className={styles.imageContainer}>
        <img src={`/images/avatars/${post.user.avatar || 'default.png'}`} alt="User Avatar" />
        {commenting && <div className={styles.threadLine} />}
      </div>
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <div><strong>{post.user.name}</strong> <span className={styles.greyText}>{post.user.handle} · {formatDate(post.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
          {!commenting && <Button type="bare" size="small" colour="transparent" width="auto">...</Button>}
        </div>
        <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: postContent }}></div>
        {!commenting ? (
          <div className={styles.buttonContainer}>
            <div className={styles.button}>
              <Button
                type="icon"
                size="small"
                colour="transparent"
                width="auto"
                highlight="primary-alt"
                onMouseEnter={() => { setHovering('comment') }}
                onMouseLeave={() => { setHovering(null) }}
                onClick={() => { handleComment() }}>
                <Icon name="comment" size="19px" maskSize="cover" colour={hovering === 'comment' ? 'primary' : 'grey'} />
                <span className={[styles.buttonText, hovering === 'comment' && styles.primary].join(' ')}>10K</span>
              </Button>
            </div>
            <div className={styles.button}>
              <Button
                type="icon"
                size="small"
                colour="transparent"
                width="auto"
                highlight="green"
                onMouseEnter={() => { setHovering('repost') }}
                onMouseLeave={() => { setHovering(null) }}>
                <Icon name="repost" size="19px" maskSize="cover" colour={hovering === 'repost' ? 'green' : 'grey'} />
                <span className={[styles.buttonText, hovering === 'repost' && styles.green].join(' ')}>10K</span>
              </Button>
            </div>
            <div className={styles.button}>
              <Button
                type="icon"
                size="small"
                colour="transparent"
                width="auto"
                highlight="liked"
                onMouseEnter={() => { setHovering('like') }}
                onMouseLeave={() => { setHovering(null) }}>
                <Icon name="like" size="19px" maskSize="cover" colour={hovering === 'like' ? 'liked' : 'grey'} />
                <span className={[styles.buttonText, hovering === 'like' && styles.liked].join(' ')}>10K</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.replyingTo}>
            <p className={styles.greyText}>Replying to <Button type="link">{post.user.handle}</Button></p>
          </div>
        )
        }
      </div>
    </div>
  )
}
export default Post