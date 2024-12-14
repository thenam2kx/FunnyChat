import { UserAddOutlined } from "@ant-design/icons"
import { Avatar, Button, Input, Tooltip } from "antd"
import { Form } from "antd"
import styled from "styled-components"
import Message from "./Message"

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

  return (
    <WrapperStyle>
      <HeaderStyle>
        <div className="header__infor">
          <p className="header__title">Room 1</p>
          <span className="header__desc">day la room 1</span>
        </div>
        <ButtonGroupStyle>
          <Button type="text" icon={<UserAddOutlined />}>Mời</Button>
          <Avatar.Group size={"small"} max={2}>
            <Tooltip title='A'>
              <Avatar />
            </Tooltip>
            <Tooltip title='A'>
              <Avatar />
            </Tooltip>
            <Tooltip title='A'>
              <Avatar />
            </Tooltip>
          </Avatar.Group>
        </ButtonGroupStyle>
      </HeaderStyle>

      <ContentStyle>
        <MessageListStyle>
          <Message text={'test'} photoURL={null} displayName={'The Nam'} createAt={'122232'} />
          <Message text={'test'} photoURL={null} displayName={'The Nam'} createAt={'122232'} />
          <Message text={'test'} photoURL={null} displayName={'The Nam'} createAt={'122232'} />
          <Message text={'test'} photoURL={null} displayName={'The Nam'} createAt={'122232'} />
          <Message text={'test'} photoURL={null} displayName={'The Nam'} createAt={'122232'} />
        </MessageListStyle>
        <FormStyle>
          <Form.Item>
            <Input placeholder="Tin nhắn" autoComplete="off" variant="borderless"/>
          </Form.Item>
          <Button type="primary" htmlType="submit">Gửi</Button>
        </FormStyle>
      </ContentStyle>
    </WrapperStyle>
  )
}

export default ChatWindows