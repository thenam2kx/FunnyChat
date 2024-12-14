import { createContext, useContext, useMemo, useState } from "react"
import useFirestore from "~/hooks/userFireStore"
import { AuthContext } from "./AuthProvider"

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext()

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {

    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
  const { user } = useContext(AuthContext)
   // Lấy những rooms mà user là thành viên
  const roomsCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: user.uid
    }
  }, [user.uid])

  // Lấy những rooms mà user là thành viên
  const rooms = useFirestore('rooms', roomsCondition)

  return (
    <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

