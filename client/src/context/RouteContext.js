import { createContext, useContext, useReducer } from 'react'

export const RouteContext = createContext(null)
export const RouteDispatchContext = createContext(null)

export function CurrentRouteProvider({ children }) {
  const [route, dispatch] = useReducer(routeReducer, null)

  return (
    <RouteContext.Provider value={route}>
      <RouteDispatchContext.Provider value={dispatch}>
        {children}
      </RouteDispatchContext.Provider>
    </RouteContext.Provider>
  )
}

export function useCurrentRoute() {
  return useContext(RouteContext)
}

export function useCurrentRouteDispatchContext() {
  return useContext(RouteDispatchContext)
}

function routeReducer(route, action) {
  return action
}