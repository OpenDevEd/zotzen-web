import React, { useMemo, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Dropdown, Menu, Avatar, Spin,
} from 'antd';

const UserMenu: React.FC = () => {
  const [loggingOut] = useState(false);

  const handleLogout = async (): Promise<any> => {
    <Redirect to="/logout" />;
  };

  const overlay = useMemo((): React.ReactElement => (
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
  ), [loggingOut]);

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center">
        <span className="text-sm font-bold">Fname</span>
      </div>
      <div className="mx-1">
        <Dropdown
          overlay={overlay}
          className="cursor-pointer"
        >
          <div className="mx-1">
            <Avatar>U</Avatar>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserMenu;
