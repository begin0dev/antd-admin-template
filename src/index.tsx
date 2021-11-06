import "antd/dist/antd.css";

import React from "react";
import ReactDOM from "react-dom";
import { Global } from "@emotion/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { globalStyles } from "./styles/global.styles";
import { store } from "./stores";

const queryClient = new QueryClient({
  defaultOptions: {},
});

ReactDOM.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
