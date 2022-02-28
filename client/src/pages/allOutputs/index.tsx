import React from 'react';
import {
  message, Spin, Table, Menu, Dropdown, Button, Avatar,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

import UserLayout from '../../components/Layout/UserLayout';
import Requests from '../../services/requests';

const AllOutputs: React.FC = () => {
  let users: Array<Record<string, any>> = [];
  let outputs: Array<Record<string, any>> = [];

  const {
    data,
    isLoading,
    isSuccess,
  } = useQuery<any>('all outputs', () => Requests.getAllOutputs());

  if (isSuccess && data) {
    users = data?.data?.user;
    outputs = data?.data?.output;
    // users = [...users, users];
    outputs = [
      ...outputs,
      outputs.map((el: any, index: number) => {
        const o = { ...el };
        o.key = index;
        return o;
      }),
    ];
  }

  const getUserInfo = (userId: string): Record<string, any> => {
    const user = users.filter((userr): boolean => userr._id === userId);
    return {
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      photo: user[0].profilePhotoURL,
    };
  };

  const getLinkToEvidenceLibrary = (rowId: string): string => {
    const outputRow = outputs.filter((output): boolean => output._id === rowId);
    return outputRow[0].linkToLibrary;
  };

  const handleCopyToClipboard = (rowId: string): void => {
    const outputRow = outputs.filter((output) => output._id === rowId);
    navigator.clipboard.writeText(outputRow[0].citation || '');
    message.success('Copied to clipboard. You can paste it in a document');
  };
  const menu = (id: string): React.ReactElement => (
    <Menu>
      <Menu.Item key="1">
        <a
          href={getLinkToEvidenceLibrary(id)}
          target="_blank"
          rel="noreferrer"
        >
          Link to Library
        </a>
      </Menu.Item>
      <Menu.Item key="2">Update status</Menu.Item>
      <Menu.Item key="3">Activate DOI</Menu.Item>
      <Menu.Item key="4">Update metadata</Menu.Item>
      <Menu.Item key="5">Reserve new DOI</Menu.Item>
      <Menu.Item key="6" onClick={() => handleCopyToClipboard(id)}>
        Copy citation
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'DOI',
      dataIndex: 'doi',
      key: 'doi',
    },
    {
      title: 'Created By',
      dataIndex: 'userId',
      key: 'createdBy',
      render: (userId: string) => {
        const { firstName, lastName, photo } = getUserInfo(userId);
        return (
          <>
            <Avatar src={`${photo}`} alt="Profile" />
            &nbsp; &nbsp;
            {`${firstName} ${lastName}`}
          </>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      key: 'actions',
      render: (id: any) => (
        <Dropdown overlay={menu(id)}>
          <Button>
            Actions
            {' '}
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <UserLayout>
      <div>
        <div>
          <h1 className="uppercase font-thin">Created Outputs</h1>
          <p className="text-xs text-gray-500">List of All Outputs</p>
        </div>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin tip="Loading..." size="large" />
          </div>
        ) : (
            // eslint-disable-next-line react/jsx-indent
            <Table
              dataSource={outputs}
              columns={columns}
            />
        )}
      </div>
    </UserLayout>
  );
};

export default AllOutputs;
