import { createContext, useContext, useReducer } from 'react'

export const CurrentPostsContext = createContext([])
export const CurrentPostsDispatchContext = createContext(null)

export function CurrentPostsProvider({ children }) {
  const [currentPosts, dispatch] = useReducer(currentPostsReducer, [])

  return (
    <CurrentPostsContext.Provider value={currentPosts}>
      <CurrentPostsDispatchContext.Provider value={dispatch}>
        {children}
      </CurrentPostsDispatchContext.Provider>
    </CurrentPostsContext.Provider>
  )
}

export function useCurrentPosts() {
  return useContext(CurrentPostsContext)
}

export function useCurrentPostsDispatch() {
  return useContext(CurrentPostsDispatchContext)
}

function currentPostsReducer(currentPosts, action) {
  return action
}