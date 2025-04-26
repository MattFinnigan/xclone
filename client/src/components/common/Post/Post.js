import styles from './Post.module.css'
import Button from '../Button/Button.js'
import { sanitize, formatDate, formatTime } from '../../../utils/helpers.js'
import { useEffect, useState } from 'react'
import Icon from '../Icon/Icon.js'
import { useModalDispatch } from '../../../context/ModalContext.js'
import { deletePost, deleteComment, toggleLike } from '../../../utils/api.js'

function Post({ post, context, comment, onPostUpdated }) {
  const [postContent, setPostContent] = useState(post.content)
  const [hovering, setHovering] = useState(null)
  const modalDispatch = useModalDispatch()
  const navigatable = context === 'feed'
  const commenting = context === 'commenting'
  const page = context === 'page'
  const [showExtra, setShowExtra] = useState(false)
  const [canToggleLike, setCanToggleLike] = useState(true)

  useEffect(() => {
    setPostContent(sanitize(post.content))
  }, [post.content])

  const handleComment = () => {
    modalDispatch({ type: 'COMMENT_MODAL', data: post })
  }

  const navigateToPost = () => {
    if (!navigatable) {
      return
    }
    window.location.href = `/post/${post.id}`
  }

  const handleDeletePost = () => {
    if (comment) {
      deleteComment(post.id).then(() => {
        window.location.reload('/')
      }).catch((error) => {
        console.error('Error deleting comment:', error)
      })
    } else {
      deletePost(post.id).then(() => {
        window.location.reload('/')
      }).catch((error) => {
        console.error('Error deleting post:', error)
      })
    }
  }

  const toggleExtras = () => {
    setShowExtra(!showExtra)
  }

  const handleToggleLike = () => {
    setCanToggleLike(false)
    toggleLike(post.id).then((resp) => {
      onPostUpdated()
      setCanToggleLike(true)
    })
  }

  return (
    <>
      <div className={[styles.post, navigatable && styles.clickable].join(' ')} onClick={(e) => { navigateToPost(e) }}>
        <div className={styles.postContainer}>
          <div className={styles.postHeader}>
            <div className={styles.imageContainer}>
              <img src={`/images/avatars/${post.user.avatar || 'default.png'}`} alt="User Avatar" />
              {commenting && <div className={styles.threadLine} />}
            </div>
            <div className={page && styles.flexCol}>
              <strong className={styles.userName}>{post.user.name}</strong>
              <span className={styles.greyText}>{!page && <>&nbsp;</>}{post.user.handle}{!page && <> · {formatDate(post.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}</>}</span>
            </div>
            <div className={styles.dotsContain}>
              <Button
                type="icon"
                highlight="primary-alt"
                colour="transparent"
                width="auto"
                onMouseEnter={() => { setHovering('dots') }}
                onMouseLeave={() => { setHovering(null) }}
                onClick={() => { toggleExtras(); setHovering(null) }}>
                <Icon name="dots" size="19px" maskSize="cover" colour={hovering === 'dots' ? 'primary' : 'grey'} />
              </Button>
            </div>
            {showExtra && (
              <div className={styles.extras}>
                {post.canDelete && (
                  <Button size='md' type='listitem' colour='transparent' width='100%' onClick={() => { handleDeletePost() }} >
                    <Icon name="delete" size="20px" maskSize="cover" colour="danger" />
                    <span className={styles.deleteText}>Delete</span>
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className={[styles.postContent, page && styles.onPage].join(' ')} dangerouslySetInnerHTML={{ __html: postContent }}></div>
          {page && (
            <div className={styles.postDetails}>
              {formatTime(post.createdAt, { hour: '2-digit', minute: '2-digit' })}&nbsp;·&nbsp;
              {formatDate(post.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}&nbsp;·&nbsp;
              <span className={styles.greyText}><strong style={{ color: 'white' }}>165</strong> Views</span>
            </div>
          )}
          {!commenting ? (
            <div className={[styles.buttonContainer, page && styles.onPage].join(' ')}>
              <div className={[styles.button, page && styles.onPage].join(' ')}>
                <Button
                  type="icon"
                  colour="transparent"
                  width="auto"
                  highlight="primary-alt"
                  onMouseEnter={() => { setHovering('comment') }}
                  onMouseLeave={() => { setHovering(null) }}
                  onClick={() => { handleComment() }}>
                  <Icon name="comment" size={page ? '23px' : '18px'} maskSize="cover" colour={hovering === 'comment' ? 'primary' : 'grey'} />
                  {post.comments?.length > 0 && (<span className={[styles.buttonText, hovering === 'comment' && styles.primary].join(' ')}>{post.comments?.length || ''}</span>)}
                </Button>
              </div>
              <div className={[styles.button, page && styles.onPage].join(' ')}>
                <Button
                  type="icon"
                  colour="transparent"
                  width="auto"
                  highlight="green"
                  onMouseEnter={() => { setHovering('repost') }}
                  onMouseLeave={() => { setHovering(null) }}>
                  <Icon name="repost" size={page ? '23px' : '19px'}  maskSize="cover" colour={hovering === 'repost' ? 'green' : 'grey'} />
                  {post.reposts && (<span className={[styles.buttonText, hovering === 'repost' && styles.green].join(' ')}></span>)}
                </Button>
              </div>
              <div className={[styles.button, page && styles.onPage].join(' ')}>
                <Button
                  type="icon"
                  colour="transparent"
                  width="auto"
                  highlight="liked"
                  disabled={!canToggleLike}
                  onMouseEnter={() => { setHovering('like') }}
                  onMouseLeave={() => { setHovering(null) }}
                  onClick={() => { handleToggleLike(); setHovering(null) }}>
                  <Icon name="like" size={page ? '23px' : '19px'} maskSize="cover" colour={hovering === 'like' || post.liked ? 'liked' : 'grey'} />
                  {post.likes && (<span className={[styles.buttonText, (hovering === 'like' || post.liked) && styles.liked].join(' ')}>{post.likes.length > 0 ? post.likes.length : ''}</span>)}
                </Button>
              </div>
              {page && (
                <>
                  <div></div>
                  <div></div>  
                </>
              )}
            </div>
          ) : (
            <div className={styles.replyingTo}>
              <p className={styles.greyText}>Replying to <Button type="link">{post.user.handle}</Button></p>
            </div>
          )
          }
        </div>
      </div>
    </>
  )
}
export default Post