import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Dropdown, Menu, Avatar, message, Spin } from "antd"
import { UnknownObject } from "../../utils/types"

const UserMenu = () => {
  const distpach = useDispatch()

  const [loggingOut, setLogout] = useState(false)

  const handleLogout = async () => {
    <Redirect to={'/logout'} />
  }

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center">
        <span className="text-sm font-bold">Fname</span>
      </div>
      <div className="mx-1">
        <Dropdown
          overlay={() => (
            <Menu>
              <Menu.Item>
                <Link to="/">
                  <span className="mx-4">Profile</span>
                </Link>
              </Menu.Item>
              <Menu.Item danger onClick={handleLogout} disabled={loggingOut}>
                <Spin spinning={loggingOut}>
                  <span className="mx-4 capitalize">Log out</span>
                </Spin>
              </Menu.Item>
            </Menu>
          )}
          className="cursor-pointer"
        >
          <div className="mx-1">
            <Avatar>U</Avatar>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default UserMenu
