import { useEffect, useState } from 'react'
import { fetchPost } from '../../utils/api.js'
import { useParams } from 'react-router'
import styles from './PostPage.module.css'
import Page from '../Page.js'
import Spinner from '../../components/common/Spinner/Spinner.js'
import Button from '../../components/common/Button/Button.js'
import Icon from '../../components/common/Icon/Icon.js'
import CommentForm from '../../components/forms/CommentForm/CommentForm.js'
import Post from '../../components/common/Post/Post.js'
import { useCurrentUser } from '../../context/CurrentUserContext.js'
import { useModalDispatch } from '../../context/ModalContext.js'

function PostPage() {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  const { postId } = useParams()
  const currentUser = useCurrentUser()
  const modalDispatch = useModalDispatch()

  const getPost = () => {
    fetchPost(postId).then((resp) => {
      setPost(resp.data)
    }).catch((error) => {
      console.error('Error fetching posts:', error)
    }).finally(() => {
      setLoading(false)
    })
  }

  const handleComment = () => {
    modalDispatch({ type: 'COMMENT_MODAL', data: post })
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
              <Button size="sm" colour="black" width="auto" onClick={() => { handleComment() }}>
                Reply
              </Button>
            </div>
            <Post key={post.id} post={post} context="post" onPostUpdated={() => getPost()}/>
            {currentUser && (
              <div className={styles.replyContainer}>
                <CommentForm post={post} onSuccess={() => getPost()} />
              </div>
            )}
            {post.comments.length > 0 && (
              <div className={styles.commentsContainer}>
                {post.comments.map((comment, i) => (
                  <Post key={comment.id} styled={i === 0 && 'noBorder'} post={comment} context="post" onPostUpdated={() => getPost()} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Page>
  )
}
export default PostPage