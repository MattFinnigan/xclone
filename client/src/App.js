import styles from './App.module.css'
import { useModal } from './context/ModalContext'
import Login from './components/modals/Login/Login.js'
import SideMenu from './components/layout/SideMenu/SideMenu.js'
import SideFeatures from './components/layout/SideFeatures/SideFeatures.js'
function App({ children }) {
  const modalState = useModal()
  // const dispatch = useModalDispatch()

  const renderModal = () => {
    if (modalState === 'SHOW_LOGIN') {
      return <Login />
    }
  }
  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <SideMenu />
        <div className={styles.appContent}>
          {children}
        </div>
        <small>test</small>
        <p>123</p>
        <SideFeatures />
      </div>
      {renderModal()}
    </div>
  )
}

export default App
