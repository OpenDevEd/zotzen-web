import React, { useEffect, useState } from "react"
import { message, Avatar } from "antd"
import classnames from "classnames"
import { useHistory, useLocation } from "react-router-dom"
import * as Icons from "../../assets/Icons"
import { axios } from "../../services"

interface UnknownObject {
  [key: string]: any
}

const UserSidebar = () => {
  const history = useHistory()
  const location = useLocation()
  const handleNavigation = (url: string) => history.push(url)
  const [userInformation, setUserInformation] = useState<UnknownObject>({})

  const handleLogout = async () => {
    window.location.href = `logout`
  }
  const getUserInfo = async () => {
    try {
      const userInformation: any = await axios.get("/auth/loggedin")
      setUserInformation(userInformation)
    } catch (err) {
      message.error(err.message || err)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div>
      {userInformation && (
        <div className="w-10/12">
          <div>
            <Avatar src={`${userInformation.photo || ""}`} alt="Profile" />
            <h1 className="text-lg">
              Welcome {`${userInformation.lastName || ""} `} !
            </h1>
            <p className="uppercase text-xs">Dashboard</p>
          </div>
          {[
            {
              key: "nav-1",
              title: "Create Record",
              description: "New Zotero / Zenodo Record",
              icon: Icons.MenuIcon,
              path: "/dashboard",
              action: () => handleNavigation("/dashboard"),
            },
            {
              key: "nav-2",
              title: "Created Records",
              description: "List of my Zotero / Zenodo Records",
              icon: Icons.MenuIcon,
              active: true,
              path: "/outputs",
              action: () => handleNavigation("/outputs"),
            },
            {
              key: "nav-3",
              title: "Users",
              description: "List of all users",
              icon: Icons.MenuIcon,
              active: true,
              hide: userInformation.role !== "Administrator",
              path: "/users",
              action: () => handleNavigation("/users"),
            },
            {
              key: "nav-6",
              title: "Logout",
              icon: Icons.LogoutIcon,
              action: handleLogout,
            },
          ].map((item: any) => {
            const isActive = location.pathname === item.path
            return (
              <div key={item.key}>
                {!item.hide && (
                  <div
                    className={classnames(
                      "flex flex-row items-center justify-between my-4 p-2 rounded-md hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer",
                      {
                        "bg-blue-200 bg-opacity-75": isActive,
                      }
                    )}
                    onClick={item.action}
                  >
                    <div className="w-2/12">
                      <item.icon color={isActive ? "#3182ce" : "black"} />
                    </div>
                    <div className="w-8/12">
                      <h6
                        className={classnames("leading-none", {
                          "text-blue-600": isActive,
                        })}
                      >
                        {item.title}
                      </h6>
                      <div className="text-xs leading-none text-gray-500">
                        {item.description}
                      </div>
                    </div>
                    <div className="w-2/12 flex flex-row justify-end ">
                      <Icons.ArrowRight
                        color={isActive ? "#3182ce" : "black"}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default UserSidebar
