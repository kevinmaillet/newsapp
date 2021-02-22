import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Menu, X } from "react-feather";
import Clock from './Clock';



const Header = () => {
  const [menuCollapse, setmenuCollapse] = useState(false);

  //to remove mobile menu when a link is clicked or a search occurs
  const handleLinkClicks = () => {
      if (menuCollapse) {
        setmenuCollapse(!menuCollapse)
      }
  };

    return (
      <div className="header">
        <div className="logo">
          <a href="/">
            <span
              className={
                menuCollapse ? "white-logo" : "underline-color"
              }
            >
              Newsapp
            </span>
          </a>
          <Clock />
        </div>

        <nav
          className={
            menuCollapse
              ? "navbar-mobile-visible"
              : "navbar-mobile-hidden"
          }
        >
          <ul>
            <li className="navbar-li">
              <NavLink to="business" onClick={() => handleLinkClicks()}>
                Business
              </NavLink>
            </li>
            <li className="navbar-li">
              <NavLink to="technology" onClick={() => handleLinkClicks()}>
                Tech
              </NavLink>
            </li>
            <li className="navbar-li">
              <NavLink to="health" onClick={() => handleLinkClicks()}>
                Health
              </NavLink>
            </li>
            <li className="navbar-li">
              <NavLink to="science" onClick={() => handleLinkClicks()}>
                Science
              </NavLink>
            </li>
            <li className="navbar-li">
              <NavLink to="entertainment" onClick={() => handleLinkClicks()}>
                Entertainment
              </NavLink>
            </li>
            <li className="navbar-li">
              <NavLink to="politics" onClick={() => handleLinkClicks()}>
                Politics
              </NavLink>
            </li>
            <li className="navbar-li searchbar">
              <SearchBar
                handleLinkClicks={() => handleLinkClicks()}
                menuCollapse={menuCollapse}
              />
            </li>
          </ul>
        </nav>
        <Menu
          onClick={() => setmenuCollapse(!menuCollapse)}
          className={menuCollapse ? "menu-disabled" : "menu"}
        />
        <X
          onClick={() => setmenuCollapse(!menuCollapse)}
          className={menuCollapse ? "exit-enabled" : "exit"}
        />
      </div>
    );
}

export default Header;
