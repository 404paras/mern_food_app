import React from 'react'
import { FaRegUser } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import '../styles/navbar.css';
import {Link} from 'react-router-dom';


const navbar = ({onSignIn}) => {


const signInHandler = ()=>{
  onSignIn();
}


  return (
    <div className="navbar" id="nav">
<div className="logo">
Food App
</div>

<div className="nav-items">

    <ul>

      <Link to='/'>  <li > <IoHomeOutline/> &nbsp;Home</li></Link>
      <Link to='/search'>     <li><CiSearch/> &nbsp; Search</li></Link>
      <Link to='/offers'>   <li> < BiSolidOffer/> &nbsp; Offers</li></Link>
         <li onClick={signInHandler}> <FaRegUser /> &nbsp; SignIn</li>
      
      <Link to='/cart'> <li> <RiShoppingCartLine/> &nbsp;Cart</li></Link>
       <li style={{display:"none"}}><BiLogOut/> &nbsp; LogOut</li>
        
    </ul>
</div>

    </div>

  )
}

export default navbar