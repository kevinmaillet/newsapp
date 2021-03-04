import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/main.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
