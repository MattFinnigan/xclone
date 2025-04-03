import styles from './Modal.module.css'
import { useModalDispatch } from '../../context/ModalContext'

function Modal({ heading, children }) {
  const dispatch = useModalDispatch()

  function hideModal() {
    dispatch(null)
  }
  return (
    <div className={styles.modal}>
      <div className="modal-header">
        <h3>{heading}</h3>
        <button className="bare close" onClick={hideModal}>&times;</button>
      </div>
      <div className="modal-content">
        {children}
      </div>
    </div>
  )
}

export default Modal