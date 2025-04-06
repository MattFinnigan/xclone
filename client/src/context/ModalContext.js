import { createContext, useContext, useReducer } from 'react'

export const ModalContext = createContext({ type: null })
export const ModalDispatchContext = createContext(null)

export function ModalProvider({ children }) {
  const [modal, dispatch] = useReducer(modalReducer, { type: null })

  return (
    <ModalContext.Provider value={modal}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}

export function useModalDispatch() {
  return useContext(ModalDispatchContext)
}

function modalReducer(modal, action) {
  return action
}