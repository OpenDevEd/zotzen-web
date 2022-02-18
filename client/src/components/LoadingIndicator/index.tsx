import React from 'react';
import { Spin, Space } from 'antd';

const LoadingIndicator: React.FC = () => (
  <Space size="middle">
    <Spin size="large" />
  </Space>
);

export default LoadingIndicator;
