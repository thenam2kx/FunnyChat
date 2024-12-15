import { UserAddOutlined } from "@ant-design/icons"
import { Avatar, Button, Input, Tooltip } from "antd"
import { Alert } from "antd"
import { Form } from "antd"
import styled from "styled-components"
import Message from "./Message"
import { useContext, useMemo, useState } from "react"
import { AppContext } from "~/Context/AppProvider"
import { addDocument } from "../firebase/service"
import { AuthContext } from "~/Context/AuthProvider"
import useFirestore from "~/hooks/userFireStore"

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-item: center;
  border-bottom: 1px solid rgba(230, 230, 230);

  .header {
    &__infor {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &_desc {
    font-size: 12px;
    }
  }
`

const ButtonGroupStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ContentStyle = styled.div`
  height: calc(100vh - 58px);
  display: flex;
  flex-direction: column;
  padding: 0 11px;
  justify-content: flex-end;
`

const MessageListStyle = styled.div`
  max-height: 100%;
  overflow-y:auto;
`

const WrapperStyle = styled.div`
  height: 100vh;
`

const FormStyle = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgba(230, 230, 230);
  border-radius: 2px;
  margin-bottom: 10px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0
  }
`

const ChatWindows = () => {
  const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext)
  const { user: { uid, photoURL, displayName } } = useContext(AuthContext)
  const [inputValue, setInputValue] = useState('')
  const [form] = Form.useForm()

  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName
    })

    form.resetFields()
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }


  // Get message
  const condition = useMemo(() => ({
    fieldName: 'roomId',
    operator: '==',
    compareValue: selectedRoom.id
  }), [selectedRoom.id])

  const messages = useFirestore('messages', condition)

  return (
    <WrapperStyle>
      {
        selectedRoom?.id ? (
          <>
            <HeaderStyle>
              <div className="header__infor">
                <p className="header__title">{selectedRoom?.name}</p>
                <span className="header__desc">{selectedRoom?.desc}</span>
              </div>
              <ButtonGroupStyle>
                <Button type="text" icon={<UserAddOutlined />} onClick={() => setIsInviteMemberVisible(true)}>Mời</Button>
                <Avatar.Group size={"small"} max={2}>
                  {
                    members.map(member => (
                      <Tooltip title={member?.displayName} key={member?.id}>
                        <Avatar src={member?.photoURL}>{member?.photoURL ? '' : member?.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                      </Tooltip>
                    ))
                  }
                </Avatar.Group>
              </ButtonGroupStyle>
            </HeaderStyle>

            <ContentStyle>
              <MessageListStyle>
                {
                  messages.map(message => (
                    <Message
                      key={message?.id}
                      text={message?.text}
                      photoURL={message?.photoURL}
                      displayName={message?.displayName}
                      createAt={message?.createdAt}
                    />
                  ))
                }
              </MessageListStyle>
              <FormStyle form={form}>
                <Form.Item>
                  <Input
                    placeholder="Tin nhắn"
                    name="message"
                    autoComplete="off"
                    variant="borderless"
                    onChange={handleInputChange}
                    onPressEnter={handleOnSubmit}
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit" onClick={handleOnSubmit}>Gửi</Button>
              </FormStyle>
            </ContentStyle>
          </>
        ) : <Alert message="Chọn phòng để trò chuyện" type="info" showIcon style={{ margin: 5 }} closable />
      }
    </WrapperStyle>
  )
}

export default ChatWindows