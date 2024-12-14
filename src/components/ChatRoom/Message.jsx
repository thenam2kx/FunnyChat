import { Typography } from "antd"
import Avatar from "antd/es/avatar/avatar"
import styled from "styled-components"

const WrapperStyle = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }
  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }

`

// eslint-disable-next-line react/prop-types
const Message = ({ text, displayName, createAt, photoURL }) => {
  return (
    <WrapperStyle>
      <div>
        <Avatar size={"small"} src={photoURL}>a</Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">{createAt}</Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </WrapperStyle>
  )
}

export default Message