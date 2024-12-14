import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import ChatRoom from './components/ChatRoom/ChatRoom'
import AuthProvider from './Context/AuthProvider'
import AppProvider from './Context/AppProvider'
import AddRoomModal from './components/Modals/AddRoomModal'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<ChatRoom />} path='/' />
            <Route element={<Login />} path='/login' />
          </Routes>
          <AddRoomModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
