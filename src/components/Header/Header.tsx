import React from 'react';
import {NavLink} from "react-router-dom";
import './Header.css';

const Header = () => {
  const navItems = [
    {name: 'Quotes', route: '/quotes'},
    {name: 'Submit new quote', route: '/add-quote'},
  ];
  return (
    <header className="mb-3">
      <div className="HeaderInner Container">
        <NavLink
          to='/'
          className="Logo"
        >
          <b>Quotes Central</b>
        </NavLink>
        <ul className="NavList">
          {navItems.map(item => (
            <li key={Math.random()} className="NavItem">
              <NavLink
                to={item.route}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;