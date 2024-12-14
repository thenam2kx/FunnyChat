import { Avatar, Form, Modal, Select, Spin } from "antd"
import { useContext, useMemo, useState } from "react"
import { AppContext } from "~/Context/AppProvider"
import { debounce } from "lodash"
import { db } from "../firebase/config"

// eslint-disable-next-line react/prop-types
const DebounceSelect = ({ fetchOptions, debounceTimeout = 300, ...props }) => {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])

  const debounceFetcher = useMemo(() => {
    const loadOption = (value) => {
      setOptions([])
      setFetching(true)
      // eslint-disable-next-line react/prop-types
      fetchOptions(value, props.currentMembers).then(newOption => {
        setOptions(newOption)
        setFetching(false)
      })
    }

    return debounce(loadOption, debounceTimeout)
  // eslint-disable-next-line react/prop-types
  }, [debounceTimeout, fetchOptions, props.currentMembers])

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {
        options.map(option => (
          <Select.Option key={option?.value} value={option?.value} title={option?.label}>
            <Avatar
              size={"small"}
              src={option?.photoURL}
            >
              {option?.photoURL ? '' : option?.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {`${option.label}`}
          </Select.Option>
        ))
      }
    </Select>
  )
}

const fetchUserList = async (search, currentMembers) => {
  return db
    .collection('users')
    .where('keywords', 'array-contains', search)
    .orderBy('displayName')
    .limit(20)
    .get()
    .then(snapShot => {
      return snapShot.docs.map(doc => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL
      })).filter(opt => !currentMembers.includes(opt.value))
    })
}

const InviteMemberModal = () => {
  const [value, setValue] = useState('')
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext)
  const [form] = Form.useForm()



  const handleOk = () => {

    const roomRef = db.collection('rooms').doc(selectedRoomId)
    roomRef.update({
      members: [...selectedRoom.members, ...value.map(v => v.value)]
    })

    // reset form
    form.resetFields()
    // cancel modal
    setIsInviteMemberVisible(false)
  }

  const handleCancel = () => {
    // reset form
    form.resetFields()
    // cancel modal
    setIsInviteMemberVisible(false)
  }

  return (
    <div>
      <Modal
        title='Mời thêm thành viên tham gia'
        open={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode='multiple'
            label='Tên các thành viên'
            value={value}
            placeholder='Nhập tên thành viên'
            fetchOptions={fetchUserList}
            onChange={newValue => setValue(newValue)}
            style={{ width: '100%' }}
            currentMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  )
}

export default InviteMemberModal