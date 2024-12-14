import { Form, Input, Modal } from "antd"
import { useContext } from "react"
import { AppContext } from "~/Context/AppProvider"
import { addDocument } from "../firebase/service"
import { AuthContext } from "~/Context/AuthProvider"


const AddRoomModal = () => {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const [form] = Form.useForm()

  const handleOk = () => {
    addDocument('rooms', { ...form.getFieldValue(), members: [user?.uid] })
    setIsAddRoomVisible(false)
  }

  const handleCancel = () => {
    setIsAddRoomVisible(false)
  }


  return (
    <div>
      <Modal
        title='Tạo phòng'
        open={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label='Tên phòng' name={'name'}>
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label='Mô tả' name={'desc'}>
            <Input placeholder="Nhập mô tảtả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddRoomModal