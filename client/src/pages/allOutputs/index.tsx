import React, { useEffect, useState } from "react"
import { message, Spin, Table, Menu, Dropdown, Button, Avatar } from "antd"
import { DownOutlined } from "@ant-design/icons"
import UserLayout from "../../components/Layout/UserLayout"
import { axios } from "../../services"

interface UnknownObject {
  [key: string]: any
}

const AllOutputs = () => {
  const [isLoading, setLoading] = useState(true)
  const [users, setUsers] = useState<UnknownObject[]>([])
  const [outputs, setOutputs] = useState<UnknownObject[]>([])

  const fetchData = async () => {
    try {
      let { data }: UnknownObject = await axios.get("/output/all")
      let outputData = data.output.map(function (el: any, index: number) {
        var o = Object.assign({}, el)
        o.key = index
        return o
      })
      setUsers(data.user)
      setOutputs(outputData)
      setLoading(false)
    } catch (err) {
      message.error(err.message || err)
    } finally {
      setLoading(false)
    }
  }

  const getUserInfo = (userId: any) => {
    const user = users.filter((user) => user._id === userId)
    return {
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      photo: user[0].profilePhotoURL,
    }
  }

  const getLinkToEvidenceLibrary = (rowId: any) => {
    const outputRow = outputs.filter((output) => output._id === rowId)
    return outputRow[0].linkToLibrary
  }

  const handleCopyToClipboard = (rowId: any) => {
    const outputRow = outputs.filter((output) => output._id === rowId)
    navigator.clipboard.writeText(outputRow[0].citation || "")
    message.success("Copied to clipboard. You can paste it in a document")
  }
  const menu = (id: any) => {
    return (
      <Menu>
        <Menu.Item key="1">
          <a
            href={getLinkToEvidenceLibrary(id)}
            target="_blank"
            rel="noreferrer"
          >
            Link to Library
          </a>
        </Menu.Item>
        <Menu.Item key="2">Update status</Menu.Item>
        <Menu.Item key="3">Activate DOI</Menu.Item>
        <Menu.Item key="4">Update metadata</Menu.Item>
        <Menu.Item key="5">Reserve new DOI</Menu.Item>
        <Menu.Item key="6" onClick={() => handleCopyToClipboard(id)}>
          Copy citation
        </Menu.Item>
      </Menu>
    )
  }
  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "DOI",
      dataIndex: "doi",
      key: "doi",
    },
    {
      title: "Created By",
      dataIndex: "userId",
      key: "createdBy",
      render: (userId: any) => {
        const { firstName, lastName, photo } = getUserInfo(userId)
        return (
          <>
            <Avatar src={`${photo}`} alt="Profile" />
            &nbsp; &nbsp;
            {`${firstName} ${lastName}`}
          </>
        )
      },
    },
    {
      title: "Actions",
      dataIndex: "_id",
      key: "actions",
      render: (id: any) => (
        <Dropdown overlay={menu(id)}>
          <Button>
            Actions <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ]

  return (
    <UserLayout>
      <div>
        <div>
          <h1 className="uppercase font-thin">Created Outputs</h1>
          <p className="text-xs text-gray-500">List of All Outputs</p>
        </div>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin tip="Loading..." size="large"></Spin>
          </div>
        ) : (
          <Table dataSource={outputs} columns={columns} />
        )}
      </div>
    </UserLayout>
  )
}

export default AllOutputs
