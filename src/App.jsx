import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import ChatRoom from './components/ChatRoom/ChatRoom'
import AuthProvider from './Context/AuthProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<ChatRoom />} path='/' />
          <Route element={<Login />} path='/login' />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
