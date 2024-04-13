import React from 'react';
import { FaRegUser } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../store/store.js';
import { MdAdminPanelSettings } from "react-icons/md";

const Navbar = ({ onSignIn }) => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const isAdmin = useSelector(state => state.role==='admin');
 const dispatch = useDispatch();
  const signInHandler = () => {
    onSignIn();
  }

const logOutHandler = ()=>{

  sessionStorage.clear();
  dispatch(logout())
}

  return (
    <div className="navbar" id="nav">
      <div className="logo">
        Food App
      </div>
      <div className="nav-items">
        <ul>
          <Link to='/'> <li> <IoHomeOutline /> &nbsp;Home</li></Link>
          <Link to='/search'> <li><CiSearch /> &nbsp; Search</li></Link>
          {!isAdmin && <Link to='/offers'> <li> < BiSolidOffer /> &nbsp; Offers</li></Link>}
          {!isAdmin && <Link to='/cart'> <li> <RiShoppingCartLine /> &nbsp;Cart</li></Link>}
        {isAdmin &&  <Link to='/admin'><li> < MdAdminPanelSettings/> &nbsp;Admin</li> </Link>}
          {isAuthenticated ? <li onClick={logOutHandler}><BiLogOut /> &nbsp; LogOut</li>: <li onClick={signInHandler}> <FaRegUser /> &nbsp; SignIn</li>
         }
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
