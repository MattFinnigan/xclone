import { useCurrentUser } from '../../../context/CurrentUserContext.js'
import styles from './PostForm.module.css'
import { useState } from 'react'
import Input from '../../common/Input/Input.js'
import Button from '../../common/Button/Button.js'
import Icon from '../../common/Icon/Icon.js'
import { createPost } from '../../../utils/api'

function PostForm() {
  const currentUser = useCurrentUser()
  const [postContent, setPostContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (submitting) {
      return
    }
    setSubmitting(true)
    createPost({ content: postContent, user_id: currentUser.id }).then(() => {
      setSubmitting(false)
      setPostContent('')
    }).catch((error) => {
      setSubmitting(false)
      console.error(error)
    })
  }
  return (
    <div className={styles.postForm}>
      <div className={styles.imageContainer}>
        <img src={`/images/avatars/${currentUser.avatar || 'default.png'}`} alt="avatar" />
      </div>
      <div className={styles.formWrapper}>
        <form onSubmit={handlePostSubmit}>
          <Input
            type="textarea"
            size="large"
            styling="bare"
            placeholder="What's happening?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)} />
          <div className={styles.replyOptions}>
            <Button colour="primary-alt" type="bare" size="sm" onClick={() => { }}>
              <Icon name="globe" size="16px" maskSize="16px" colour="primary" />
              &nbsp;&nbsp;Everyone can reply
            </Button>
          </div>
          <div className={styles.buttonContainer}>
            <div></div>
            <div className={styles.postButton}>
              <Button
                colour="primary"
                size="md"
                type="submit"
                disabled={!postContent}>
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default PostForm;