import React, { useState } from 'react';
import {
  Spin, Table, Tag, Modal, Select,
} from 'antd';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { EditOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import UserLayout from '../../components/Layout/UserLayout';
import Requests from '../../services/requests';

const { Option } = Select;

const INITIAL_VALUES = {
  role: '',
};

const validationSchema = yup.object().shape({
  role: yup.string().required('* required'),
});

const Outputs: React.FC = () => {
  // const [options, setOptions] = useState<Array<Record<string, any>>>([]);
  let user: Record<string, any>[] = [];

  const [selectedRole, setselectedRole] = useState<string>('');
  const [, setselectedUser] = useState<string>('');
  const [showEditModal, setIsModalVisible] = useState(false);

  const { data, isSuccess, isLoading } = useQuery<any>('get user', () => Requests.getUser());
  if (isSuccess && data) {
    user = data?.data;
    user = [
      ...user,
      user?.map((el: any, index: number) => {
        const o = { ...el };
        o.key = index;
        return o;
      }),
    ];
    // setOptions(user);
  }

  // const { isLoading: hIsLoading,
  // mutate
  // } = useMutation((userSelected: string, values: Record<string, any>) =>
  //   Requests.handleOk(user, values)
  // )

  const handleEdit = (): void => {
    setIsModalVisible(true);
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  const handleOk = async (): Promise<void> => {
    // const res: any = await axios.put(`/user/${selectedUser}`, {
    //   ...values,
    // })

    handleCancel();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { values, setFieldValue } = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: handleOk,
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (firstName: any, row: any) => `${row.firstName} ${row.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: any, row: any) => (
        <>
          <Tag color={row.role === 'Standard' ? 'geekblue' : 'green'}>
            {row.role}
            {' '}
            {'  '}
          </Tag>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleEdit();
              setselectedRole(row.role);
              setselectedUser(row._id);
            }}
            onKeyDown={() => {
              handleEdit();
              setselectedRole(row.role);
              setselectedUser(row._id);
            }}
            role="button"
            tabIndex={0}

          >
            <EditOutlined />
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <UserLayout>
        <div>
          <div>
            <h1 className="uppercase font-thin">Users</h1>
            <p className="text-xs text-gray-500">List of Users</p>
          </div>
        </div>
        <div className="mt-6">
          {isLoading ? (
            <div style={{ textAlign: 'center' }}>
              <Spin tip="Loading..." size="large" />
            </div>
          ) : (
              // eslint-disable-next-line react/jsx-indent
              <Table dataSource={user} columns={columns} />
          )}
        </div>
      </UserLayout>
      <Modal
        title="Edit user role"
        visible={showEditModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="magnetic-form w-6/12">
          <div className="row">
            <Select
              className="floating-input rounded-md"
              placeholder="Select Role"
              style={{ width: '100%' }}
              defaultValue={selectedRole}
              onChange={(value) => setFieldValue('role', value)}
            >
              {[
                { key: 1, name: 'Standard' },
                { key: 2, name: 'Administrator' },
              ].map((item) => (
                <Option value={item.name} key={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Outputs;
