import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
//import css
import "../pages/styles/home.css";

function Navbar() {
  const { user, logout } = useAuth();






  return (
    <header className="header">
      <div className="logo header__logo">
        <div className="letterT header__logoLetterT">H</div>
        <div className="logoName header__logoName">HealthHub</div>
      </div>


      {!user ? (
        <div className="header__nav">
          <Link to="/" className="header__navLinkHome">Home</Link>
          <Link to="/login" className="header__navLink">Login</Link>
          <Link to="/register" className="header__navLink">Register</Link>
          <Link to="#" class="header__navLink">Testimonials</Link>
          <Link to="#" class="header__navLink">About us</Link>
        </div>
      ) : user.isDoctor ? (
        <div className="header__nav">
          <Link to="/" className="header__navLinkHome">Home</Link>
          <Link to="/dashboard" className="header__navLink">Dashboard</Link>
          <Link to="/doctor" className="header__navLink">Find a doctor</Link>
          <Link to="#" class="header__navLink">Testimonials</Link>
          <Link to="#" class="header__navLink">About us</Link>
          <Link to="/" onClick={logout} class="header__navLink">Logout</Link>
        </div>
      )
        : !user.isDoctor ? (
          <div className="header__nav">
            <Link to="/" className="header__navLinkHome">Home</Link>
            <Link to="/dashboard" className="header__navLink">Dashboard</Link>
            <Link to="/doctor" className="header__navLink">Find a doctor</Link>
            <Link to="#" class="header__navLink">Testimonials</Link>
            <Link to="#" class="header__navLink">About us</Link>
            <Link to="/" onClick={logout} class="header__navLink">Logout</Link>
          </div>
        ) : null}


    </header>
  );
}

export default Navbar;
