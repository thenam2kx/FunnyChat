import { Avatar, Button, Typography } from "antd"
import styled from "styled-components"
import { auth } from "../firebase/config"
import { useContext } from "react"
import { AuthContext } from "~/Context/AuthProvider"

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
  const { user } = useContext(AuthContext)

  return (
    <WrapperStyled>
      <div className="">
        <Avatar src={user?.photoURL}>{user?.photoURL ? '' : user?.displayName?.charAt(0)?.toUpperCase() }</Avatar>
        <Typography.Text className="userName">{user?.displayName}</Typography.Text>
      </div>
      <Button ghost onClick={() => auth.signOut()}>Đăng xuất</Button>
    </WrapperStyled>
  )
}

export default UserInfo