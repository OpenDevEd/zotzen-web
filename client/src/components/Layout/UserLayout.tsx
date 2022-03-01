import React from 'react';
import { Navigate } from 'react-router-dom';
import UserSidebar from '../Sidebars/UserSidebar';

interface Props {
  children: React.ReactElement | React.ReactElement[]
}

const UserLayout: React.FC<Props> = ({ children }) => (
  <div>
    {!localStorage.getItem('token') ? (
      <Navigate to="/" />
    ) : (
      <div className="container mx-auto my-12">
        <div className="flex flex-row">
          <div className="w-4/12">
            <UserSidebar />
          </div>
          <div className="w-8/12">{children}</div>
        </div>
      </div>
    )}
  </div>
);

export default UserLayout;
