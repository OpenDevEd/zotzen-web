import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

export default () => (
  <div className="screen-center">
    <Spin indicator={antIcon} size="large" />
  </div>
)
