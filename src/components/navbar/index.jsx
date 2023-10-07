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
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <div>Logo</div>
      <nav>
        <div onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        {showMenuItems()}
      </nav>
    </>
  );
}
