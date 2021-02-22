import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/main.scss"

function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
