import { Col, Row } from 'antd'
import { Typography } from "antd"
import { Button } from "antd"
const { Title } = Typography
import firebase, { auth } from '../firebase/config'

const fbProvider = new firebase.auth.FacebookAuthProvider();

const Login = () => {
  const handleLogin = async () => {
    await auth.signInWithPopup(fbProvider)
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