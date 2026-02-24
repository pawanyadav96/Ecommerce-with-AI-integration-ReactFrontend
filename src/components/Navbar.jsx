import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Shop<span>Zone</span>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/category" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Category
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}