import React, { useEffect, useState } from "react"
import {
  message,
  Spin,
  Table,
  Menu,
  Dropdown,
  Button,
} from "antd"
import { DownOutlined } from "@ant-design/icons"
import UserLayout from "../../components/Layout/UserLayout"
import { axios } from "../../services"

interface UnknownObject {
  [key: string]: any
}

const MyOutputs = () => {
  const [isLoading, setLoading] = useState(true)
  const [outputs, setOutputs] = useState<UnknownObject[]>([])
  const fetchData = async () => {
    try {
      let { data }: UnknownObject = await axios.get("/output")
      data = data.map(function (el: any, index: number) {
        var o = Object.assign({}, el)
        o.key = index
        return o
      })
      setOutputs(data)
      setLoading(false)
    } catch (err: any) {
      message.error(err.message || err)
    } finally {
      setLoading(false)
    }
  }
  const handleCopyToClipboard = (rowId: any) => {
    const outputRow = outputs.filter((output) => output._id === rowId)
    navigator.clipboard.writeText(outputRow[0].citation || "")
    message.success("Copied to clipboard. You can paste it in a document")
  }
  const menu = (id: any) => {
    return (
      <Menu>
        <Menu.Item key="1">Update status</Menu.Item>
        <Menu.Item key="2">Activate DOI</Menu.Item>
        <Menu.Item key="3">Update metadata</Menu.Item>
        <Menu.Item key="4">Reserve new DOI</Menu.Item>
        <Menu.Item key="5" onClick={() => handleCopyToClipboard(id)}>
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
      title: "Link",
      dataIndex: "linkToLibrary",
      key: "linkToLibrary",
      render: (linkToLibrary: any) => (
        <a target="_blank" rel="noreferrer" href={linkToLibrary}>
          {linkToLibrary}
        </a>
      ),
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
          <p className="text-xs text-gray-500">List of My Outputs</p>
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

export default MyOutputs
