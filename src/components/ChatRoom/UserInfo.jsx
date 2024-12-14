import { Avatar, Button, Typography } from "antd"
import styled from "styled-components"
import { auth, db } from "../firebase/config"
import { useEffect } from "react"

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

  useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data,
        id: doc.id
      }))

      console.log({data, snapshot, doc: snapshot.docs})
    })
  }, [])

  return (
    <WrapperStyled>
      <div className="">
        <Avatar src={''} />
        <Typography.Text className="userName">cdd</Typography.Text>
      </div>
      <Button ghost onClick={() => auth.signOut()}>Đăng xuất</Button>
    </WrapperStyled>
  )
}

export default UserInfo