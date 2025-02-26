import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { categories, dispatch } = useAppContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={() => dispatch({ type: "SET_SELECTED_CATEGORY", payload: "" })}>
          ShopKart
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => dispatch({ type: "SET_SELECTED_CATEGORY", payload: "" })}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart"> YourCart</Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle btn btn-link" id="categoryDropdown" data-bs-toggle="dropdown">
                Categories
              </button>
              <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className="dropdown-item"
                      onClick={() => dispatch({ type: "SET_SELECTED_CATEGORY", payload: category })}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
