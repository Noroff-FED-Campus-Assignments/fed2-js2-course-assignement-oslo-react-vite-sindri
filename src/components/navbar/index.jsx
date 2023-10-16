import { Link } from "@tanstack/react-router";
import { NAVIGATION } from "../../lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isLargerThanTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const accessToken = localStorage.getItem("access_token");

  const showMenuItems = () => {
    if (menuOpen || isLargerThanTablet) {
      const showMenuItems = NAVIGATION.filter((item) => {
        if (item.userMustBeLoggedIn) {
          if (accessToken) {
            return item;
          }
        } else {
          return item;
        }
      });

      return showMenuItems.map((item) => (
        <li key={item.href} onClick={toggleMenu}>
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
            <Link to="/" className="logo">
              S
            </Link>
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
            <Link to="/">
              <span>S</span> <span className="logo-color">indri</span>
            </Link>
          </div>

          <nav>
            <ul> {showMenuItems()}</ul>
          </nav>
        </div>
      )}
    </>
  );
}
