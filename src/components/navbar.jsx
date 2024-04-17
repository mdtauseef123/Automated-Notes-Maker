import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/cats">Speech To Text</Link>
    </li>
    <li>
      <Link to="/sheeps">About Us</Link>
    </li>
    <li>
      <Link to="/goats">Downloads</Link>
    </li>
  </div>
  );
}
export default navbar;