import React, { useState } from 'react';
import {
  message,
  Spin,
  Table,
  Menu,
  Dropdown,
  Button,
} from 'antd';
import { useQuery } from 'react-query';

import { DownOutlined } from '@ant-design/icons';
import UserLayout from '../../components/Layout/UserLayout';
import Requests from '../../services/requests';
import PopUpModal from '../../components/TaggingModal/PopUpModal';

const MyOutputs: React.FC = () => {
  let outputs: Array<Record<string, any>> = [];
  const [selectedOutPut, setSelectedOutPut] = useState<Array<string | number>>([]);
  const [showEditModal, setIsModalVisible] = useState(false);

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };
  const { data, isSuccess, isLoading } = useQuery<any>('output', () => Requests.getOutput());

  if (isSuccess && data) {
    outputs = data?.data;
    outputs = [...outputs, outputs.map((el: any, index: number) => {
      const o = { ...el };
      o.key = index;
      return o;
    })];
  }

  const handleCopyToClipboard = (rowId: string): void => {
    const outputRow = outputs.filter((output) => output._id === rowId);
    navigator.clipboard.writeText(outputRow[0].citation || '');
    message.success('Copied to clipboard. You can paste it in a document');
  };

  const getLinkToEvidenceLibrary = (rowId: string): string => {
    const outputRow = outputs.filter((output): boolean => output._id === rowId);
    return outputRow[0].linkToLibrary;
  };

  const handleEdit = async (id: any): Promise<void> => {
    const linkToLibrary = getLinkToEvidenceLibrary(id);
    setSelectedOutPut([linkToLibrary.split('/lib/')[1], Math.random()]);
    setIsModalVisible(true);
  };
  const menu = (id: string): React.ReactElement => (
    <Menu>
      <Menu.Item key="1">Update status</Menu.Item>
      <Menu.Item key="2">Activate DOI</Menu.Item>
      <Menu.Item key="3">Update metadata</Menu.Item>
      <Menu.Item key="4">Reserve new DOI</Menu.Item>
      <Menu.Item key="5" onClick={() => handleCopyToClipboard(id)}>
        Copy citation
      </Menu.Item>
      <Menu.Item
        key="7"
        onClick={() => {
          handleEdit(id);
        }}
      >
        Tags
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
      title: 'Link',
      dataIndex: 'linkToLibrary',
      key: 'linkToLibrary',
      render: (linkToLibrary: any) => (
        <a target="_blank" rel="noreferrer" href={linkToLibrary}>
          {linkToLibrary}
        </a>
      ),
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
    <>
      <UserLayout>
        <div>
          <div>
            <h1 className="uppercase font-thin">Created Outputs</h1>
            <p className="text-xs text-gray-500">List of My Outputs</p>
          </div>
        </div>
        <div className="mt-6">
          {isLoading ? (
            <div style={{ textAlign: 'center' }}>
              <Spin tip="Loading..." size="large" />
            </div>
          ) : (
            <Table dataSource={outputs} columns={columns} />
          )}
        </div>
      </UserLayout>
      {
        selectedOutPut && (
          <PopUpModal
            outPutId={selectedOutPut[0]}
            refreshModal={selectedOutPut[1]}
            isVisible={showEditModal}
            handleCancel={handleCancel}
          />
        )
      }
    </>
  );
};

export default MyOutputs;
