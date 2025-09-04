import { createContext, useReducer } from "react"
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
      return ''
    default: 
      return state
  }
}



const NotCon = createContext()


export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer,'')

  return (
    <NotCon.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotCon.Provider>
  )
}
export default NotificationContext