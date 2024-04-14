import React from 'react'
import {Link} from 'react-router-dom';
const ManageRestaurant = () => {
  return (
    <div>

        <h1>Manage Restaurants</h1>
       <Link to='/admin/addRestaurant'> <button>Add New Restaurant</button></Link>

        <div>
            
        </div>
    </div>
  )
}

export default ManageRestaurant