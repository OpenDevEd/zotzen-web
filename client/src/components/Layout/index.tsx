import React from 'react';
import AppHeader from '../AppHeader';
import AppFooter from '../Footer';

interface Props {
  children?: string | string[] | React.ReactElement | React.ReactElement[];
}
export const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      {<AppHeader />}
      {children}
      {<AppFooter />}
    </>
  );
};
