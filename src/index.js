import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './comp/Home';
import About from './comp/About';
import Add from './comp/Add';
import Update from './comp/Update';
import View from './comp/View';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/addedit' element={<Add />} />
      <Route path='/update/:id' element={<Update />} />
      <Route path='/view/:id' element={<View />} />
    </Route>
  )
)


root.render(
  <React.StrictMode>
   <RouterProvider  router={router} />
  </React.StrictMode>
);


