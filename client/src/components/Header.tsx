import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import { Menu, X } from 'react-feather';
import Clock from './Clock';

const Header: React.FC = () => {
  const [menuCollapse, setmenuCollapse] = useState(false);

  useEffect(() => {
    //Sticky Header
    const scrollEvent = (e: Event) => {
      const header = document.querySelector('.header');

      if (window.scrollY > 0) {
        header?.classList.add('header--active');
      } else {
        header?.classList.remove('header--active');
      }
    };
    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  //to remove mobile menu when a link is clicked or a search occurs
  const handleLinkClicks = (): void => {
    if (menuCollapse) {
      setmenuCollapse(!menuCollapse);
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className="header">
      <div className="header__logo">
        <a href="/">
          <span className={'header__underline-color'}>Newsapp</span>
        </a>
        <Clock />
      </div>

      <nav
        className={
          'header__navbar header__navbar-mobile ' +
          (menuCollapse
            ? 'header__navbar-mobile--visible'
            : 'header__navbar-mobile--hidden')
        }
      >
        <ul>
          <li className="header__navbar-li">
            <NavLink to="business" onClick={() => handleLinkClicks()}>
              Business
            </NavLink>
          </li>
          <li className="header__navbar-li">
            <NavLink to="technology" onClick={() => handleLinkClicks()}>
              Tech
            </NavLink>
          </li>
          <li className="header__navbar-li">
            <NavLink to="health" onClick={() => handleLinkClicks()}>
              Health
            </NavLink>
          </li>
          <li className="header__navbar-li">
            <NavLink to="science" onClick={() => handleLinkClicks()}>
              Science
            </NavLink>
          </li>
          <li className="header__navbar-li">
            <NavLink to="entertainment" onClick={() => handleLinkClicks()}>
              Entertainment
            </NavLink>
          </li>
          <li className="header__navbar-li">
            <NavLink to="politics" onClick={() => handleLinkClicks()}>
              Politics
            </NavLink>
          </li>
          <li className="header__navbar-li searchbar">
            <SearchBar
              handleLinkClicks={() => handleLinkClicks()}
              menuCollapse={menuCollapse}
            />
          </li>
        </ul>
      </nav>
      <Menu
        onClick={() => setmenuCollapse(!menuCollapse)}
        className={menuCollapse ? 'header__menu--disabled' : 'header__menu'}
      />
      <X
        onClick={() => setmenuCollapse(!menuCollapse)}
        className={menuCollapse ? 'header__exit--enabled' : 'header__exit'}
      />
    </header>
  );
};

export default Header;
