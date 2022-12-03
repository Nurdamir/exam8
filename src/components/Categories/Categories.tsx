import React from 'react';
import {NavLink} from "react-router-dom";
import './Categories.css';
import {categories} from '../../constants';

// const categories = [
//   {title: 'Star Wars', id: 'star-wars'},
//   {title: 'Famous people', id: 'famous-people'},
//   {title: 'Saying', id: 'saying'},
//   {title: 'Humour', id: 'humor'},
//   {title: 'Motivational', id: 'motivational'},
// ];

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