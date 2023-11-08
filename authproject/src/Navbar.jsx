import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/navbar">
          Navbar
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex">
            <Link to="/signup" className="navbar-brand">
              Signup
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
