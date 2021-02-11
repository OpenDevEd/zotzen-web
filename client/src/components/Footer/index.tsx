import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/Icons/logo.png';

const AppFooter = () => {
  const footerClasses = classnames('bg-red-light w-full');
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
                  <Link to="/">
                  About EdTech Hub
                  </Link>
                </li>
                <li className="my-1">
                  <Link to="/">
                  Team
                  </Link>
                </li>
                <li className="my-1">
                  <Link to="/">
                  Contact us
                  </Link>
                </li>
                <li className="my-1">
                  <Link to="/">
                  Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-start justify-center px-2">
              <ul>
                <li className="mb-2 font-medium">Our work</li>
                <li className="my-1">
                  <Link to="/">
                    Evidence Library
                  </Link>
                </li>
                <li className="my-1">
                  <Link to="/">
                    Helpdesk
                  </Link>
                </li>
                <li className="my-1">
                  <Link to="/">
                    Blog
                  </Link>
                </li>
                <li className="my-1">
                  <Link to="/">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-star justify-center px-2">
              <ul>
                <li className="font-medium">Site</li>
                <li className="my-1">
                  <Link to="/">
                    Privacy policy
                  </Link>
                </li>
                <li className="my-1">
                  <Link to="/frequently-asked-questions">
                    Cookies policy
                  </Link>
                </li>
                <li className="my-1">
                  <Link to="/frequently-asked-questions">
                    Terms and conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid lg:grid-cols-1 sm:grid-cols-1 content-center mt-12">
            <div className=" flex items-start justify-center px-2">
                
            </div>
          </div>
          <div className="grid lg:grid-cols-1 sm:grid-cols-1 content-center mt-12">
            <div className=" flex items-start justify-center px-2">
              <ul>
                <li className="mb-2 font-medium">EdTech Hub &copy; <Moment date={moment()} format="YYYY" />. Creative Commons Attribution 4.0 International License.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
