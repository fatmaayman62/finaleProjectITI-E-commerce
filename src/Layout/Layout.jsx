import React from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
function Layout(){
  return (
    <div>
      <Nav />
      <div>
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
