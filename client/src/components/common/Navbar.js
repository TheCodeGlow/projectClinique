import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
//import css
import "../../pages/styles/home.css";

function Navbar() {
  const { user, DeleteToken } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const logout = () => {
    DeleteToken();
    setCurrentUser(null);
  };

  return (
    <header className="header">
      <div className="logo header__logo">
        <div className="letterT header__logoLetterT">H</div>
        <div className="logoName header__logoName">HealthHub</div>
      </div>


      {!currentUser ? (
        <div className="header__nav">
          <Link to="/" className="header__navLinkHome">Home</Link>
          <Link to="/login" className="header__navLink">Login</Link>
          <Link to="/register" className="header__navLink">Register</Link>
          <Link to="#" class="header__navLink">Testimonials</Link>
          <Link to="#" class="header__navLink">About us</Link>
        </div>
      ) : currentUser.isDoctor ? (
        <div className="header__nav">
          <Link to="/" className="header__navLinkHome">Home</Link>
          <Link to="/dashboard" className="header__navLink">Dashboard</Link>
          <Link to="/doctors" className="header__navLink">Find a doctor</Link>
          <Link to={`/doctor/${currentUser.doctor}`} className="header__navLink">Profile</Link>
          <Link to="/Chat" className="header__navLink">Chat</Link>
          <Link to="#" class="header__navLink">Testimonials</Link>
          <Link to="#" class="header__navLink">About us</Link>
          <Link to="/" onClick={logout} class="header__navLink">Logout</Link>
        </div>
      )
        : !currentUser.isDoctor ? (
          <div className="header__nav">
            <Link to="/" className="header__navLinkHome">Home</Link>
            <Link to="/dashboard" className="header__navLink">Dashboard</Link>
            <Link to="/doctors" className="header__navLink">Find a doctor</Link>
            <Link to={`/patient/${currentUser.patient}`} className="header__navLink">Profile</Link>
            <Link to="/Chat" className="header__navLink">Chat</Link>
            <Link to="#" class="header__navLink">Testimonials</Link>
            <Link to="#" class="header__navLink">About us</Link>
            <Link to="/" onClick={logout} class="header__navLink">Logout</Link>
          </div>
        ) : null}
    </header>
  );
}

export default Navbar;
