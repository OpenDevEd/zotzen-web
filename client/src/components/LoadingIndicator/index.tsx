import React from 'react';
import { Spin, Space } from 'antd';

const LoadingIndicator = () => {
  return (
    <Space size="middle">
      <Spin size="large" />
    </Space>
  );
};

export default LoadingIndicator;
