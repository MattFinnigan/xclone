import styles from './Comment.module.css'
import Button from '../Button/Button.js'
import { sanitize } from '../../../utils/helpers.js'
import { useEffect, useState } from 'react'
import Icon from '../Icon/Icon.js'

function Comment({ comment }) {
  const [commentContent, setCommentContent] = useState(comment.content)
  const [hovering, setHovering] = useState(null)

  useEffect(() => {
    setCommentContent(sanitize(comment.content))
  }, [comment.content])

  return (
    <div className={styles.comment}>
      <div className={styles.imageContainer}>
        <img src={`/images/avatars/${comment.user.avatar || 'default.png'}`} alt="User Avatar" />
      </div>
      <div className={styles.commentContainer}>
        <div className={styles.commentHeader}>
          <div><strong>{comment.user.name}</strong> <span className={styles.greyText}>{comment.user.handle}</span></div>
          <Button type="bare" colour="transparent" width="auto">...</Button>
        </div>
        <div className={styles.commentContent} dangerouslySetInnerHTML={{ __html: commentContent }}></div>
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <Button
              type="icon"
              colour="transparent"
              width="auto"
              highlight="primary-alt"
              onMouseEnter={() => { setHovering('comment') }}
              onMouseLeave={() => { setHovering(null) }}>
              <Icon name="comment" size="19px" maskSize="cover" colour={hovering === 'comment' ? 'primary' : 'grey'} />
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              type="icon"
              colour="transparent"
              width="auto"
              highlight="green"
              onMouseEnter={() => { setHovering('recomment') }}
              onMouseLeave={() => { setHovering(null) }}>
              <Icon name="recomment" size="19px" maskSize="cover" colour={hovering === 'recomment' ? 'green' : 'grey'} />
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
              <Icon name="like" size="19px" maskSize="cover" colour={hovering === 'like' ? 'liked' : 'grey'} />
              <span className={[styles.buttonText, hovering === 'like' && styles.liked].join(' ')}></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Comment