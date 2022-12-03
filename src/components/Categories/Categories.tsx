import React from 'react';
import {NavLink} from "react-router-dom";
import {categories} from '../../constants';
import './Categories.css';

const Categories = () => {
  return (
    <ul className="Categories">
      <NavLink
        to='/quotes'
      >
        All
      </NavLink>
      {categories.map(category => (
        <NavLink
          key={category.id}
          to={'/quotes/' + category.id}
        >
          {category.title}
        </NavLink>
      ))}
    </ul>
  );
};

export default Categories;