import React, { Suspense } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AppLayout } from "./components/Layout"
import PageLoading from "./components/ActivityIndicator/PageLoading"

const LoginPage = React.lazy(() => import("./pages/auth/login"))
const Logout = React.lazy(() => import("./pages/auth/logout"))
const AuthorizeUser = React.lazy(() => import("./pages/auth/authorizeUser"))
const DashboardPage = React.lazy(() => import("./pages/dashboard"))
const OutputPage = React.lazy(() => import("./pages/outputs"))
const UsersPage = React.lazy(() => import("./pages/users"))

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Router>
        <Switch>
          <AppLayout>
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
            <Route path="/outputs">
              <OutputPage />
            </Route>
            <Route path="/users">
              <UsersPage />
            </Route>
            <Route path="/authorize/:token">
              <AuthorizeUser />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route exact path="/">
              <LoginPage />
            </Route>
          </AppLayout>
        </Switch>
      </Router>
    </Suspense>
  )
}

export default AppRoutes
