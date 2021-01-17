import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, user, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <button onClick={onLogout}>
        <a href="#!">Logout</a>
      </button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      <hr />
    </div>
  );
};

export default Navbar;
