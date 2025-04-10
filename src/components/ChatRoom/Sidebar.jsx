import { Col, Row } from "antd"
import UserInfo from "./UserInfo"
import RoomList from "./RoomList"
import styled from "styled-components"

const SidebarStyle = styled.div`
  background: #3f0e40;
  color: white;
  height: 100vh
`;

const Sidebar = () => {
  return (
    <SidebarStyle>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyle>
  )
}

export default Sidebar