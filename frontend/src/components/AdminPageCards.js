// Card.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminPageCard = ({ title, description, link }) => {
  return (
    <div className="card" style={{height:"20vh" , width:"20vh" , border:"1px solid black",margin:"2rem"}}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link}>View</Link>
    </div>
  );
}

export default AdminPageCard;
