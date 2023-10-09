import { Link } from "@tanstack/react-router";
import { NAVIGATION } from "../../lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const showMenuItems = () => {
    if (menuOpen) {
      return NAVIGATION.map((item) => (
        <li key={item.href}>
          <Link to={item.href}>{item.label}</Link>
        </li>
      ));
    }
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className="magnify">
        <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
      </div>
      <div className="logo">S</div>
      <nav>
        <div onClick={toggleMenu} className="bars">
          <FontAwesomeIcon icon={faBars} size="2x" />
        </div>
        <ul> {showMenuItems()}</ul>
      </nav>
    </>
  );
}
