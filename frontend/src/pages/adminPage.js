// AdminPage.js
import React from 'react';
import AdminPageCard from '../components/AdminPageCards.js'; // Adjust the path as per your project structure

const AdminPage = () => {
  return (
    <div className="admin-page">
      <AdminPageCard
        title="Add Product"
        description="Add a new product to the system"
        link="/admin/addProduct"
      />
      <AdminPageCard
        title="Add Restaurant"
        description="Add a new restaurant to the system"
        link="/admin/addRestaurant"
      />
      <AdminPageCard
        title="Manage Customers"
        description="View and manage customer details"
        link="/admin/manageCustomers"
      />
      <AdminPageCard  title="Add Offers"
      description="Add offers for the customers"
      link="/admin/addOffers"
      />
      {/* Add more Card components for other functionalities */}
    </div>
  );
}

export default AdminPage;
