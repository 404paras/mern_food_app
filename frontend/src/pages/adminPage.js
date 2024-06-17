import React from 'react';
import AdminPageCard from '../components/AdminPageCards.js'; // Adjust the path as per your project structure
import manageRest from '../assets/adminPage/manageRestaurant.webp';
import manageCustomer from '../assets/adminPage/manageCustomer.jpeg';
import manageOffer from '../assets/adminPage/manageOffer.jpeg';
import orderPageAdmin from '../assets/adminPage/orderPageAdmin.jpeg'
import '../styles/AdminPage.css'; // Import the CSS file for styling

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1 className="admin-page-heading">Admin Dashboard</h1>

      <div className="admin-page-cards">
        <AdminPageCard
          title="Manage Restaurant"
          description="Click here to add a new restaurant to the system."
          link="/admin/manageRestaurant"
          img={manageRest}
        />
        <AdminPageCard
          title="Manage Customers"
          description="View and manage customer details."
          link="/admin/manageCustomers"
          img={manageCustomer}
        />
        <AdminPageCard
          title="Add Offers"
          description="Click here to add offers for the customers."
          link="/admin/addOffers"
          img={manageOffer}
        />
        <AdminPageCard
          title="Manage Orders"
          description="Click here to manage orders."
          link="/admin/manageOrder"
          img={orderPageAdmin}
        />
      </div>
    </div>
  );
}

export default AdminPage;
