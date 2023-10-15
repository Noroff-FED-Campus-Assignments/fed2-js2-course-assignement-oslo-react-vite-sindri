import { useState, useEffect } from "react";
import "./toTop.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
/**
 * to top button that shows up on scroll, and scrolls the user to top when clicked
 */
export default function ToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 200 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return isVisible ? (
    <div className="to-top-container">
      <button className="to-top visible" onClick={scrollToTop}>
        to top <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  ) : null;
}
