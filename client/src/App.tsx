import React from 'react';
import AppRoutes from './routes';
interface Props {
  element?: string | string[] | React.ReactElement | React.ReactElement[];
}

const AppContainer: React.FC<Props> = () => {
  return (
    <AppRoutes />
  );
};

export default AppContainer;
