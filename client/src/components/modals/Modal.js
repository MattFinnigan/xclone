import styles from './Modal.module.css'
import { useModalDispatch } from '../../context/ModalContext'
import Button from '../common/Button/Button'
import Icon from '../common/Icon/Icon'

function Modal({ header, content }) {
  const dispatch = useModalDispatch()
  function hideModal() {
    dispatch(null)
  }
  return (
    <>
      <div className={styles.overlay} onClick={hideModal}></div>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          {
            header
            ||
            <>
              <div className={styles.closeButton}>
                <Button colour="transparent" type="icon" size="med" onClick={hideModal}>
                  <Icon name="close" size="20px" maskSize="20px" colour="white" />
                </Button>
              </div>
              <Icon name="logo" size="32px" maskSize="32px" colour="white" />
            </>
          }
        </div>
        <div className="modal-content">
          {content}
        </div>
      </div>
    </>
  )
}

export default Modal