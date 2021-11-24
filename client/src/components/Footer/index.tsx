import React from "react"
import Moment from "react-moment"
import moment from "moment"
import classnames from "classnames"
import { Link } from "react-router-dom"
import LogoIcon from "../../assets/Icons/logo.png"

const AppFooter = () => {
  const footerClasses = classnames("bg-red-light w-full")
  return (
    <footer className={footerClasses}>
      <div className="container mx-auto">
        <div className="py-12 font-thin text-center sm:text-left">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 content-center mt-12">
            <div className="flex items-start  justify-center md:justify-start">
              <ul>
                <li className="flex">
                  <img src={LogoIcon} alt="logo" className="h-10" />
                </li>
                <li className="my-5">
                  <p>Clear evidence, beter decisions, more learning</p>
                </li>
              </ul>
            </div>
            <div className=" flex items-start justify-center px-2">
              <ul>
                <li className="mb-2 font-medium">About</li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname: "https://edtechhub.org/about-edtech-hub/",
                    }}
                    target="_blank"
                  >
                    About EdTech Hub
                  </Link>
                </li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname:
                        "https://edtechhub.org/about-edtech-hub/directors-team",
                    }}
                    target="_blank"
                  >
                    Team
                  </Link>
                </li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname: "https://edtechhub.org/contact-us/",
                    }}
                    target="_blank"
                  >
                    Contact us
                  </Link>
                </li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname: "https://edtechhub.org/jobs",
                    }}
                    target="_blank"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-start justify-center px-2">
              <ul>
                <li className="mb-2 font-medium">Our work</li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname: "http://docs.edtechhub.org/lib/",
                    }}
                    target="_blank"
                  >
                    Evidence Library
                  </Link>
                </li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname: "https://edtechhub.org/helpdesk",
                    }}
                    target="_blank"
                  >
                    Helpdesk
                  </Link>
                </li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname: "https://edtechhub.org/blog",
                    }}
                    target="_blank"
                  >
                    Blog
                  </Link>
                </li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname: "https://edtechhub.org/newsletter/",
                    }}
                    target="_blank"
                  >
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-star justify-center px-2">
              <ul>
                <li className="font-medium">Site</li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname:
                        "https://edtechhub.org/about-edtech-hub/directors-team/#",
                    }}
                    target="_blank"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname:
                        "https://edtechhub.org/frequently-asked-questions",
                    }}
                    target="_blank"
                  >
                    Cookies policy
                  </Link>
                </li>
                <li className="my-1">
                  <Link
                    to={{
                      pathname:
                        "https://edtechhub.org/frequently-asked-questions",
                    }}
                    target="_blank"
                  >
                    Terms and conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid lg:grid-cols-1 sm:grid-cols-1 content-center mt-12">
            <div className=" flex items-start justify-center px-2"></div>
          </div>
          <div className="grid lg:grid-cols-1 sm:grid-cols-1 content-center mt-12">
            <div className=" flex items-start justify-center px-2">
              <ul>
                <li className="mb-2 font-medium">
                  EdTech Hub &copy; <Moment date={moment()} format="YYYY" />.
                  Creative Commons Attribution 4.0 International License.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
