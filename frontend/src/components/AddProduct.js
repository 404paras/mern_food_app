import React from 'react'
import '../styles/addProduct.css'

const AddProduct = () => {
  return (
    <div className='addProduct'>
<h1>Admin : Add food items!</h1>
<form >

    <input type="text" placeholder='Name' />
    <input type="file" name=""  placeholder="Images" id="" />
    <input type="text" placeholder='Outlet' />
    <input type="text" placeholder='Categories' />
    <button type="submit">Submit</button>
</form>

    </div>
  )
}

export default AddProduct