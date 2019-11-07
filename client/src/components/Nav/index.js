import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books API Helper
      </a>
      <ul className="navbar-nav">
        <li className="nav-item">
        <a className="nav-link" href="/search">
        <span class="navbar-text">
          Search
        </span>
        </a>
        </li>
      
        <li className="nav-item">
        <a className="nav-link" href="/saved">
        <span class="navbar-text">
          Saved
        </span>
        </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
