import "./assets/css/ant.less"
import "./assets/css/index.css"
import "./assets/css/global.scss"
import React from "react"
import ReactDOM from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

import App from "./App"
import reportWebVitals from "./reportWebVitals"

const queryClientConfig: Record<string, any> = {
  defaultOptions: {
    queries: {
      // keepPreviousData: true,
      retry: 2,
      staleTime: 1000 * 30, // 30 seconds
      cacheTime: 1000 * 30, // 30 seconds
      refetchOnMount: false,
      refetchOnWindowFocus: "always",
      refetchOnReconnect: "always",
      refetchInterval: 1000 * 30, // 30 seconds
      refetchIntervalInBackground: true,
      suspense: false,
    },
    mutations: {
      retry: 2,
    },
  },
}

const queryClient = new QueryClient(queryClientConfig)


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
;<App />

      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

