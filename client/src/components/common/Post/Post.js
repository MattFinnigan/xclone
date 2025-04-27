import styles from './Post.module.css'
import PostContent from '../PostContent/PostContent.js'
import { useModalDispatch } from '../../../context/ModalContext.js'
import { deletePost, toggleLike } from '../../../utils/api.js'
import { useState } from 'react'

function Post({ post, context, onPostUpdated }) {
  const [canToggleLike, setCanToggleLike] = useState(true)
  const modalDispatch = useModalDispatch()

  const handleComment = () => {
    modalDispatch({ type: 'COMMENT_MODAL', data: post })
  }

  const handleRepost = () => {
    modalDispatch({ type: 'REPOST_MODAL', data: post })
  }

  const navigateToPost = (id) => {
    window.location.href = `/post/${id}`
  }

  const handleDeletePost = () => {
    deletePost(post.id).then(() => {
      window.location.reload('/')
    }).catch((error) => {
      console.error('Error deleting post:', error)
    })
  }

  const handleToggleLike = () => {
    setCanToggleLike(false)
    toggleLike(post.id).then((resp) => {
      onPostUpdated()
      setCanToggleLike(true)
    })
  }

  return (
    <div className={styles.post}>
      <PostContent
        post={post}
        context={context}
        toggleLike={handleToggleLike}
        deletePost={handleDeletePost}
        navigateToPost={navigateToPost}
        handleComment={handleComment}
        handleRepost={handleRepost}
        canToggleLike={canToggleLike}
        onPostUpdated={onPostUpdated}/>
    </div>
  )
}
export default Post