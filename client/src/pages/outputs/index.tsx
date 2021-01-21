import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';

const Dashboard = () => {

  return (
    <UserLayout>
      <div>
        <div>
          <h1 className="uppercase font-thin">Created Outputs</h1>
          <p className="text-xs text-gray-500">
            List of My Outputs
          </p>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
