import { Link } from "@tanstack/react-router";
import { NAVIGATION } from "../../lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { useMediaQuery } from "react-responsive";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isLargerThanTablet = useMediaQuery({ query: "(min-width: 768px)" });

  const showMenuItems = () => {
    if (menuOpen || isLargerThanTablet) {
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
      {isTabletOrMobile && (
        <>
          <div className="header-container">
            <div className="logo">S</div>
            <nav>
              <div onClick={toggleMenu} className="bars">
                <FontAwesomeIcon icon={faBars} size="2x" />
              </div>
              <ul> {showMenuItems()}</ul>
            </nav>
          </div>
        </>
      )}

      {isLargerThanTablet && (
        <div className="header-container">
          <div className="logo">
            <span>S</span> <span className="logo-color">indri</span>
          </div>

          <nav>
            <ul> {showMenuItems()}</ul>
          </nav>
        </div>
      )}
    </>
  );
}
