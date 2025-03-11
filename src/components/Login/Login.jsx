import { Col, Row } from 'antd'
import { Typography } from "antd"
import { Button } from "antd"
const { Title } = Typography
import firebase, { auth } from '../firebase/config'
import { addDocument, generateKeywords } from '../firebase/service'

const fbProvider = new firebase.auth.FacebookAuthProvider();

const Login = () => {
  const handleLogin = async () => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider)
      if (additionalUserInfo?.isNewUser) {
        addDocument('users', {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: additionalUserInfo.providerId,
          keywords: generateKeywords(user.displayName)
        })
      }
    } catch (error) {
      console.log('🚀 ~ handleLogin ~ error:', error)
    }
  }

  return (
    <Row justify={'center'} style={{ height: '800px' }}>
      <Col span={8}>
        <Title style={{ textAlign: 'center' }} level={3}>Funny Chat</Title>
        <Button style={{ width: '100%', marginBottom: 5 }}>Đăng nhập bằng Google</Button>
        <Button style={{ width: '100%' }} onClick={handleLogin}>Đăng nhập bằng Facebook</Button>
      </Col>
    </Row>
  )
}

export default Login