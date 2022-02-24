import React from 'react';
import { Avatar } from 'antd';
import classnames from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import Requests from '../../services/requests';

import * as Icons from '../../assets/Icons';

const UserSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (url: string): void => navigate(url);
  let userInformation: Record<string, any> = {};

  const handleLogout = async (): Promise<void> => {
    window.location.href = 'logout';
  };

  const { data, isSuccess } = useQuery<any>('user info', () => Requests.getUserInfo());

  if (isSuccess && data) {
    userInformation = data;
  }

  return (
    <div>
      {userInformation && (
        <div className="w-10/12">
          <div>
            <Avatar src={`${userInformation.photo || ''}`} alt="Profile" />
            <h1 className="text-lg">
              Welcome
              {' '}
              {`${userInformation.lastName || ''} `}
              {' '}
              !
            </h1>
            <p className="uppercase text-xs">
              {`${
                userInformation.role || ''
              } `}

            </p>
          </div>
          {[
            {
              key: 'nav-1',
              title: 'Create Record',
              description: 'New Zotero / Zenodo Record',
              icon: Icons.MenuIcon,
              path: '/dashboard',
              action: () => handleNavigation('/dashboard'),
            },
            {
              key: 'nav-2',
              title: 'Created Records',
              description: 'List of my Zotero / Zenodo Records',
              icon: Icons.MenuIcon,
              active: true,
              path: '/outputs',
              action: () => handleNavigation('/outputs'),
            },
            {
              key: 'nav-3',
              title: 'All Created Records',
              description: 'List of all Zotero / Zenodo Records',
              icon: Icons.MenuIcon,
              active: true,
              hide: userInformation.role !== 'Administrator',
              path: '/all-outputs',
              action: () => handleNavigation('/all-outputs'),
            },
            {
              key: 'nav-4',
              title: 'Users',
              description: 'List of all users',
              icon: Icons.MenuIcon,
              active: true,
              hide: userInformation.role !== 'Administrator',
              path: '/users',
              action: () => handleNavigation('/users'),
            },
            {
              key: 'nav-5',
              title: 'Logout',
              icon: Icons.LogoutIcon,
              action: handleLogout,
            },
          ].map((item: any) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={item.key}>
                {!item.hide && (
                  <div
                    className={classnames(
                      `flex flex-row items-center justify-between my-4 p-2 rounded-md 
                      hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer`,
                      {
                        'bg-blue-200 bg-opacity-75': isActive,
                      },
                    )}
                    onClick={item.action}
                    onKeyDown={item.action}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="w-2/12">
                      <item.icon color={isActive ? '#3182ce' : 'black'} />
                    </div>
                    <div className="w-8/12">
                      <h6
                        className={classnames('leading-none', {
                          'text-blue-600': isActive,
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
                        color={isActive ? '#3182ce' : 'black'}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserSidebar;
