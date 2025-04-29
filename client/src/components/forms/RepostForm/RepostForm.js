import { useCurrentUser } from '../../../context/CurrentUserContext.js'
import styles from './RepostForm.module.css'
import { useState } from 'react'
import Input from '../../common/Input/Input.js'
import Button from '../../common/Button/Button.js'
import { createRepost } from '../../../utils/api.js'
import PostContent from '../../common/PostContent/PostContent.js'

function RepostForm({ post, onSuccess }) {
  const currentUser = useCurrentUser()
  const [commentContent, setCommentContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (submitting) {
      return
    }
    setSubmitting(true)
    createRepost({ content: commentContent, user_id: currentUser.id, post_id: post.id }).then((res) => {
      setSubmitting(false)
      setCommentContent('')
      console.log(res.data)
      onSuccess(res.data)
    }).catch((error) => {
      setSubmitting(false)
      console.error(error)
    })
  }
  return (
    <div className={styles.commentFormContainer}>
      <div className={styles.commentForm}>
        <div className={styles.imageContainer}>
          <img src={`/images/avatars/${currentUser.avatar || 'default.png'}`} alt="avatar" />
        </div>
        <div className={styles.formWrapper}>
          <form onSubmit={handleCommentSubmit}>
            <Input
              type="textarea"
              size="large"
              styling="bare"
              placeholder="Add a comment"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)} />
            <div className={styles.postContainer}>{<PostContent context="reposting" post={post} hideActions={true}/>}</div>
            <div className={styles.buttonContainer}>
              <div></div>
              <div className={styles.commentButton}>
                <Button
                  colour="primary"
                  size="md"
                  type="submit"
                  disabled={!commentContent}>
                  Reply
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default RepostForm;