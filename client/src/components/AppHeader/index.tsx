import React from "react"
import { Link, useLocation } from "react-router-dom"
import classnames from "classnames"
import LogoIcon from "../../assets/Icons/logo.png"

const NAV_LINKS = [
  { name: "HOME", path: "/" },
  { name: "ABOUT US", path: "https://edtechhub.org/about-edtech-hub/" },
  { name: "TOOLS", path: "/dashboard" },
  { name: "EVIDENCE", path: "/outputs" },
  { name: "BLOG", path: "https://edtechhub.org/blog/" },
  { name: "CONTACT US", path: "https://edtechhub.org/contact-us/" },
]

interface Props {}
const AppHeader: React.FC<Props> = () => {
  const location = useLocation()

  return (
    <div>
      <div className="container mx-auto">
        <nav className="flex flex-row py-6 justify-between ">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to="/">
              <img src={LogoIcon} alt="logo" sizes="30" className="h-10 mr-2" />
            </Link>
          </div>
          <div className="md:visible hidden w-full  flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm text-center lg:flex-grow">
              {NAV_LINKS.map((page) => {
                const className = classnames(
                  "block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-gray-700 mr-10 capitalize pb-1",
                  {
                    "nav-active": page.path === location.pathname,
                  }
                )
                return (
                  <Link
                    key={page.name}
                    className={className}
                    to={{
                      pathname: `${page.path}`,
                    }}
                    target="_blank"
                  >
                    <p>{page.name}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default AppHeader
