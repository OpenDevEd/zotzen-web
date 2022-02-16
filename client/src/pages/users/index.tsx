import React, { useState } from "react"
import { Spin, Table, Tag, Modal, Select } from "antd"

import * as yup from "yup"
import { useFormik } from "formik"
import { EditOutlined } from "@ant-design/icons"
import { useQuery } from "react-query"
import UserLayout from "../../components/Layout/UserLayout"
import Requests from "../../services/requests"

const { Option } = Select

const INITIAL_VALUES = {
  role: "",
}

const validationSchema = yup.object().shape({
  role: yup.string().required("* required"),
})

const Outputs = () => {
  const [options, setOptions] = useState<Array<Record<string, any>>>([])
  let user: Record<string, any>[] = []

  const [selectedRole, setselectedRole] = useState<string>("")
  const [, setselectedUser] = useState<string>("")
  const [showEditModal, setIsModalVisible] = useState(false)

  const { data, isSuccess, isLoading } = useQuery("get user", () =>
    Requests.getUser()
  )
  if (isSuccess && data) {
    user = data
    user = [
      ...user,
      user?.map((el: any, index: number) => {
        let o = Object.assign({}, el)
        o.key = index
        return o
      }),
    ]
    setOptions(user)
  }

  // const { isLoading: hIsLoading, mutate } = useMutation((userSelected: string, values: Record<string, any>) =>
  //   Requests.handleOk(user, values)
  // )

  const handleEdit = () => {
    setIsModalVisible(true)
  }
  const handleOk = async () => {
    // const res: any = await axios.put(`/user/${selectedUser}`, {
    //   ...values,
    // })

    handleCancel()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { values, setFieldValue } = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: handleOk,
  })

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (firstName: any, row: any) => {
        return `${row.firstName} ${row.lastName}`
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: any, row: any) => (
        <>
          <Tag color={row.role === "Standard" ? "geekblue" : "green"}>
            {row.role} {"  "}
          </Tag>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleEdit()
              setselectedRole(row.role)
              setselectedUser(row._id)
            }}
          >
            <EditOutlined />
          </span>
        </>
      ),
    },
  ]

  return (
    <>
      <UserLayout>
        <div>
          <div>
            <h1 className="uppercase font-thin">Users</h1>
            <p className="text-xs text-gray-500">List of Users</p>
          </div>
        </div>
        <div className="mt-6">
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spin tip="Loading..." size="large"></Spin>
            </div>
          ) : (
            <Table dataSource={options} columns={columns} />
          )}
        </div>
      </UserLayout>
      <Modal
        title="Edit user role"
        visible={showEditModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="magnetic-form w-6/12">
          <div className="row">
            <Select
              className="floating-input rounded-md"
              placeholder="Select Role"
              style={{ width: "100%" }}
              defaultValue={selectedRole}
              onChange={(value) => setFieldValue("role", value)}
            >
              {[
                { key: 1, name: "Standard" },
                { key: 2, name: "Administrator" },
              ].map((item) => (
                <Option value={item.name} key={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default Outputs
