import React, { useEffect, useState } from "react"
import {
  message,
  Spin,
  Table,
  Menu,
  Dropdown,
  Button,
  Space,
  Tooltip,
} from "antd"
import { DownOutlined } from "@ant-design/icons"
import UserLayout from "../../components/Layout/UserLayout"
import { axios } from "../../services"

interface UnknownObject {
  [key: string]: any
}

const Outputs = () => {
  const [isLoading, setLoading] = useState(true)
  const [options, setOptions] = useState<UnknownObject[]>([])
  const fetchData = async () => {
    try {
      let { data }: UnknownObject = await axios.get("/output")
      data = data.map(function (el: any, index: number) {
        var o = Object.assign({}, el)
        o.key = index
        return o
      })
      setOptions(data)
      setLoading(false)
    } catch (err) {
      message.error(err.message || err)
    } finally {
      setLoading(false)
    }
  }
  const handleMenuClick = (e: any) => {
    message.info("Click on menu item.")
    console.log("click", e)
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Update status</Menu.Item>
      <Menu.Item key="2">Activate DOI</Menu.Item>
      <Menu.Item key="3">Update metadata</Menu.Item>
      <Menu.Item key="4">Reserve new DOI</Menu.Item>
      <Menu.Item key="5">Copy citation</Menu.Item>
    </Menu>
  )
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
      dataIndex: "actions",
      key: "actions",
      render: (linkToLibrary: any) => (
        <Dropdown overlay={menu}>
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
          <Table dataSource={options} columns={columns} />
        )}
      </div>
    </UserLayout>
  )
}

export default Outputs
