import styles from './Post.module.css'
import Button from '../common/Button/Button.js'

function Post({ post }) {
  return (
    <div className={styles.post}>
      <div className={styles.imageContainer}>
        <img src={`/images/avatars/${post.user.avatar || 'default.png'}`} alt="User Avatar" />
      </div>
      <div className={styles.postContent}>
        <div className={styles.postHeader}>
          <div><strong>{post.user.name}</strong> <span className={styles.greyText}>{post.user.handle}</span></div>
          <Button type="bare" size="small" colour="transparent" width="auto">...</Button>
        </div>
        <div>{post.content}</div>
      </div>
    </div>
  )
}
export default Post