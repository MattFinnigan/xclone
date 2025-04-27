import styles from './PostContent.module.css'
import Button from '../Button/Button.js'
import { sanitize, formatDate, formatTime } from '../../../utils/helpers.js'
import { useEffect, useState } from 'react'
import Icon from '../Icon/Icon.js'

function PostContent({ post, context, toggleLike, deletePost, navigateToPost, handleComment, handleRepost, canToggleLike, hideActions }) {
  const [postContent, setPostContent] = useState(post.content)
  const [hovering, setHovering] = useState(null)
  const [showExtra, setShowExtra] = useState(false)

  const commenting = context === 'commenting'
  const page = context === 'page'
  const repost = context.indexOf('repost') !== -1
  const navigatable = !page && context !== 'reposting' && !commenting

  useEffect(() => {
    setPostContent(sanitize(post.content))
  }, [post.content])

  const toggleExtras = () => {
    setShowExtra(!showExtra)
  }

  const handleNavigate = (postId) => {
    if (!navigatable) {
      return
    }
    navigateToPost(postId)
  }

  return (
    <>
      <div className={[styles.post, navigatable ? styles.clickable : '', repost ? styles.repost : ''].join(' ')} onClick={(e) => { handleNavigate(post.id) }}>
        <div className={styles.postContainer}>
          <div className={styles.postHeader}>
            <div className={[styles.imageContainer, repost ? styles.smallImg : ''].join(' ')}>
              <img src={`/images/avatars/${post.user.avatar || 'default.png'}`} alt="User Avatar" />
            </div>
            <div className={[styles.userDetails, page ? styles.flexCol : '', repost ? styles.repost : ''].join(' ')}>
              <strong className={styles.userName}>{post.user.name}</strong>
              <span className={styles.greyText}>{!page && <>&nbsp;</>}{post.user.handle}{!page && <> · {formatDate(post.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}</>}</span>
            </div>
            {!commenting && !hideActions &&
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
            } 
            {showExtra && (
              <div className={styles.extras}>
                {post.canDelete && (
                  <Button size='md' type='listitem' colour='transparent' width='100%' onClick={() => { deletePost() }} >
                    <Icon name="delete" size="20px" maskSize="cover" colour="danger" />
                    <span className={styles.deleteText}>Delete</span>
                  </Button>
                )}
              </div>
            )}
          </div>
          {commenting && <div className={styles.threadLine} />}
          <div className={[styles.postContent, page ? styles.onPage : '', repost ? styles.repost : ''].join(' ')}>
            <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
            {post.repost && <PostContent post={post.repost} context={'repost'} hideActions={true} navigateToPost={() => { handleNavigate(repost.id) }}/>}
          </div>
          {page && (
            <div className={styles.postDetails}>
              {formatTime(post.createdAt, { hour: '2-digit', minute: '2-digit' })}&nbsp;·&nbsp;
              {formatDate(post.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}&nbsp;·&nbsp;
              <span className={styles.greyText}><strong style={{ color: 'white' }}>165</strong> Views</span>
            </div>
          )}
          {!commenting && !hideActions && (
            <div className={[styles.buttonContainer, page ? styles.onPage : ''].join(' ')}>
              <div className={[styles.button, page ? styles.onPage : ''].join(' ')}>
                <Button
                  type="icon"
                  colour="transparent"
                  width="auto"
                  highlight="primary-alt"
                  onMouseEnter={() => { setHovering('comment') }}
                  onMouseLeave={() => { setHovering(null) }}
                  onClick={() => { handleComment() }}>
                  <Icon name="comment" size={page ? '23px' : '18px'} maskSize="cover" colour={hovering === 'comment' ? 'primary' : 'grey'} />
                  {post.comments?.length > 0 && (<span className={[styles.buttonText, hovering === 'comment' ? styles.primary : ''].join(' ')}>{post.comments?.length || ''}</span>)}
                </Button>
              </div>
              <div className={[styles.button, page ? styles.onPage : ''].join(' ')}>
                <Button
                  type="icon"
                  colour="transparent"
                  width="auto"
                  highlight="green"
                  onMouseEnter={() => { setHovering('repost') }}
                  onMouseLeave={() => { setHovering(null) }}
                  onClick={() => { handleRepost() }}>
                  <Icon name="repost" size={page ? '23px' : '19px'}  maskSize="cover" colour={hovering === 'repost' || post.reposted ? 'green' : 'grey'} />
                  {post.reposts && (<span className={[styles.buttonText, hovering === 'repost' || post.reposted ? styles.green : ''].join(' ')}>{post.reposts.length > 0 ? post.reposts.length : ''}</span>)}
                </Button>
              </div>
              <div className={[styles.button, page ? styles.onPage : ''].join(' ')}>
                <Button
                  type="icon"
                  colour="transparent"
                  width="auto"
                  highlight="liked"
                  disabled={!canToggleLike}
                  onMouseEnter={() => { setHovering('like') }}
                  onMouseLeave={() => { setHovering(null) }}
                  onClick={() => { toggleLike(); setHovering(null) }}>
                  <Icon name="like" size={page ? '23px' : '19px'} maskSize="cover" colour={hovering === 'like' || post.liked ? 'liked' : 'grey'} />
                  {post.likes && (<span className={[styles.buttonText, (hovering === 'like' || post.liked) ? styles.liked : ''].join(' ')}>{post.likes.length > 0 ? post.likes.length : ''}</span>)}
                </Button>
              </div>
              {page && (
                <>
                  <div></div>
                  <div></div>  
                </>
              )}
            </div>
          )}
          {commenting && (
            <div className={styles.replyingTo}>
              <p className={styles.greyText}>Replying to <Button type="link">{post.user.handle}</Button></p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default PostContent