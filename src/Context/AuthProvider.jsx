import { Spin } from "antd"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "~/components/firebase/config"

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({ user: null })

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        const { displayName, email, uid, photoURL } = user
        setUser({ displayName, email, uid, photoURL })
        setIsLoading(false)
        navigate('/')
      } else {
        setUser(null)
        setIsLoading(false)
        navigate('/login')
      }
    })
    return () => {
      unsubscribed()
    }
  }, [navigate]) // Đã loại bỏ navigate khỏi mảng dependencies

  if (isLoading) {
    return <Spin />
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

