import { NavLink } from "react-router-dom";

const CustomNavLink = (props) => {
  return (
    <NavLink
      activeStyle={{ color: "#ff5c00" }}
      {...props}
      isActive={(path) => path?.url === props?.to}
      activeClassName="nav-item--active"
    >
      {props.children}
    </NavLink>
  );
};

export default CustomNavLink;
