// Card.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminPageCard = ({ title, description, link, img }) => {
  return (
    <div className="card" style={styles.card}>
      <img src={img} alt="" style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        <Link to={link} style={styles.link}>View</Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
   
    height: "70vh",
    width: "30%",
 
    margin: "2rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
  },
  image: {
    
    width: "100%",
    height: "65%",
  },
  content: {
    padding: "1rem",
  },
  title: {
    margin: "0",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  description: {
    margin: "0.5rem 0",
  },
  link: {
    display: "block",
    padding: "0.5rem",
    backgroundColor: "rgb(252, 128, 25)",
    color: "#fff",
    textDecoration: "none",
    textAlign: "center",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

// Hover effect
styles.card[':hover'] = {
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
};
styles.link[':hover'] = {
  backgroundColor: "#0056b3",
  
};

export default AdminPageCard;
