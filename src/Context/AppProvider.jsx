import { createContext, useContext, useMemo, useState } from "react"
import useFirestore from "~/hooks/userFireStore"
import { AuthContext } from "./AuthProvider"

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext()

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  // state of modal add new rooms
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)

  // state of modal invite member
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)

  // state selected room
  const [selectedRoomId, setSelectedRoomId] = useState('')

  // get infor user from AuthContext
  const { user } = useContext(AuthContext)

   // Lấy những rooms mà user là thành viên
  const roomsCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: user?.uid
    }
  }, [])
  const rooms = useFirestore('rooms', roomsCondition)


  // Find room with roomId
  const selectedRoom = useMemo(() => {
    return rooms.find(room => room.id === selectedRoomId) || {}
  }, [rooms, selectedRoomId])

  // get member of room
  const usersCondition = useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members
    }
  }, [selectedRoom.members])
  const members = useFirestore('users', usersCondition)

  return (
    <AppContext.Provider value={{
      rooms,
      members,
      selectedRoom,
      isAddRoomVisible,
      setIsAddRoomVisible,
      selectedRoomId,
      setSelectedRoomId,
      isInviteMemberVisible,
      setIsInviteMemberVisible
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

