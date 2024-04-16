import React from 'react';
import AdminPageCard from '../components/AdminPageCards.js'; // Adjust the path as per your project structure
import manageRest from '../assets/adminPage/manageRestaurant.webp';
import manageCustomer from '../assets/adminPage/manageCustomer.jpeg';
import manageOffer from '../assets/adminPage/manageOffer.jpeg';

const AdminPage = () => {
  return (
    <div className="admin-page" style={{ paddingTop: "60px", backgroundColor: "white", width: "80%", margin: "auto", minHeight: "80vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Admin Dashboard</h1>

      <div style={{ flexWrap: "wrap", display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }}>
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
        {/* Add more Card components for other functionalities */}
      </div>
    </div>
  );
}

export default AdminPage;
