import React from "react";
import Link from "../../common/NavLink";
import { Nav } from "react-bootstrap";
import Button from "../../common/Button";
import "./style.scss";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="image-container">
        <img
          className="profile-image"
          src="https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png"
          alt="user profile"
        />
      </div>
      <span className="py-1">FirstName LastName</span>
      <div>
        <Button to="/logout" variant="light" style={{ float: "none" }}>
          <i className="fas fa-sign-out-alt"></i> LOGOUT
        </Button>
      </div>

      <Nav defaultActiveKey="/home" className="flex-column sidebar-navs">
        <Link to="/new-record">
          <i className="fas fa-plus-circle"></i>
          <span className="nav-label">New record</span>
        </Link>
        <Link to="/view-records">
          <i className="fas fa-list"></i>
          <span className="nav-label">View records</span>
        </Link>
      </Nav>
    </div>
  );
};

export default SideBar;
