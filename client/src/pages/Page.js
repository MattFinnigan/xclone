import styles from './Page.module.css'
import { useLocation } from 'react-router-dom'
import { useCurrentRouteDispatchContext } from '../context/RouteContext'
import { useEffect } from 'react'

function Page({ children }) {
  const dispatch = useCurrentRouteDispatchContext()
  const location = useLocation()
  // when the location changes, dispatch the new location
  useEffect(() => {
    if (location?.pathname) {
      dispatch(location.pathname)
    }
  }, [location, dispatch])
  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        {children}
      </div>
    </div>
  )
}
export default Page