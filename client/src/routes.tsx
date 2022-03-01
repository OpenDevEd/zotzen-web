import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/Layout';
import PageLoading from './components/ActivityIndicator/PageLoading';

const LoginPage = React.lazy(() => import('./pages/auth/login'));
const Logout = React.lazy(() => import('./pages/auth/logout'));
const AuthorizeUser = React.lazy(() => import('./pages/auth/authorizeUser'));
const DashboardPage = React.lazy(() => import('./pages/dashboard'));
const OutputPage = React.lazy(() => import('./pages/outputs'));
const AllOutputPage = React.lazy(() => import('./pages/allOutputs'));
const UsersPage = React.lazy(() => import('./pages/users'));

const AppRoutes: React.FC = () => (
  <Suspense fallback={<PageLoading />}>
    <Router>
      <AppLayout>
        <Routes>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="outputs" element={<OutputPage />} />
          <Route path="all-outputs" element={<AllOutputPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="authorize/:token" element={<AuthorizeUser />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </AppLayout>
    </Router>
  </Suspense>
);

export default AppRoutes;
