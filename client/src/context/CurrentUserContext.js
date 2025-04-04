import { createContext, useContext, useReducer } from 'react'

export const CurrentUserContext = createContext(null)
export const CurrentUserDispatchContext = createContext(null)

export function CurrentUserProvider({ children }) {
  const [currentUser, dispatch] = useReducer(currentUserReducer, null)

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserDispatchContext.Provider value={dispatch}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUser() {
  return useContext(CurrentUserContext)
}

export function useCurrentUserDispatch() {
  return useContext(CurrentUserDispatchContext)
}

function currentUserReducer(currentUser, action) {
  return action
}