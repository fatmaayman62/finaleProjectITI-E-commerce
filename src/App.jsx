 
import React from 'react';
import './App.css' 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home/Home'; 
import Products from './Prouducts/Products';
import Categories from './Categories/Categories';
import Brands from './Brands/Brands';
import NotFound from './NotFound/NotFound';
import Register from './Register/Register';
import Login from './Login/Login';
import UserContextProvider from './Context/UserContext'; 
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ProductDetails from './ProductDetails/ProductDetails';
import Contacts from './Contacts/Contacts';
// import Register from './Register/Register'
//<import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
// import ProductDetails from './ProductDetails/ProductDetails';
// Outlet></Outlet>
//Link => react router dom instead of anchor tag
// <Link to=""></Link>
//index:true & empty path 
//wrong path => path:'*'(part of view)
//errorElement (full view)
//NavLink & .active (class)
// (/any name )it replace path parent and put this path
let routingData=createBrowserRouter([{
  path:'',
  element:<Layout />,
  children:[
    {
      index:true,
      element:<ProtectedRoute><Home /></ProtectedRoute>
    },
    {
      path:'contacts',
      element:<ProtectedRoute><Contacts /></ProtectedRoute>
    },
    {
      path:'products',
      element:<ProtectedRoute><Products /></ProtectedRoute>
    },
    {
      path:'categories',
      element:<ProtectedRoute><Categories /></ProtectedRoute>
    },
    {
      path:'brands',
      element:<ProtectedRoute><Brands /></ProtectedRoute>
    },
    {
      path:'productDetails/:id/:category',
      element:<ProtectedRoute><ProductDetails /></ProtectedRoute>
    },
    {
      path:'register',
      element:<Register />
    },
    {
      path:'login',
      element:<Login />
    }, 
    {
      path:'*',
      element:<NotFound />
    },
  ]
}]);
 
function App() { 
 
    return(<>

      <UserContextProvider>
    <RouterProvider router={routingData}></RouterProvider>
      </UserContextProvider>
      </>
    ); 
    }

export default App   
