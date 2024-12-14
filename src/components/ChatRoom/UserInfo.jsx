import { Avatar, Button, Typography } from "antd"
import styled from "styled-components"

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1ps solid rgba(82, 38, 83);

  .userName {
    color: white;
    margin-left: 5px;
  }
`

const UserInfo = () => {
  return (
    <WrapperStyled>
      <div className="">
        <Avatar src={''} />
        <Typography.Text className="userName">cdd</Typography.Text>
      </div>
      <Button ghost>Đăng xuất</Button>
    </WrapperStyled>
  )
}

export default UserInfo