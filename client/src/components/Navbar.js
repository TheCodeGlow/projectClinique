import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
//import css
import "../styles.css";

function Navbar() {
  const { user, logout } = useAuth();
 


  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Registration</Link>
            </li>
          </>
        ) : !user.isDoctor ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Patient Dashboard</Link>
            </li>
            <li>
              <Link to="/doctor">Doctor</Link>
            </li>
            <li>
              <Link to="/patient-record">My Records</Link>
            </li>
            <li>
              <Link to="/book-appointment">Book Appointment</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : user.isDoctor ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/doctor">Doctor</Link>
            </li>
            <li>
              <Link to="/patients">Patients</Link>
            </li>
            <li>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;
