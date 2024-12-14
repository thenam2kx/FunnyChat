import { Col, Row } from "antd"
import Sidebar from "./Sidebar"
import ChatWindows from "./ChatWindows"


const ChatRoom = () => {
  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col span={6}>
        <Sidebar />
      </Col>
      <Col span={18}>
        <ChatWindows />
      </Col>
    </Row>
  )
}

export default ChatRoom