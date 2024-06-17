import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPageCard.css'; // Import your CSS file

const AdminPageCard = ({ title, description, link, img }) => {
  return (
    <div className="admin-page-card">
      <img src={img} alt="" className="admin-page-image" />
      <div className="admin-page-content">
        <h3 className="admin-page-title">{title}</h3>
        <p className="admin-page-description">{description}</p>
        <Link to={link} className="admin-page-link">View</Link>
      </div>
    </div>
  );
}

export default AdminPageCard;
