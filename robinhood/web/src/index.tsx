import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Query } from './pages/Query';
import { Buy } from './pages/Buy';
import { Portfolio } from './pages/Portfolio';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/query", element: <Query /> },
  { path: "/buy", element: <Buy /> },
  { path: "/portfolio", element: <Portfolio /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
