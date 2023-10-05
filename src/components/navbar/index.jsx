import { Link } from "@tanstack/react-router";
import { NAVIGATION } from "../../lib/constants";

export default function Navigation() {
  return (
    <nav>
      {NAVIGATION.map((item) => (
        <li key={item.href}>
          <Link to={item.href}>{item.label}</Link>
        </li>
      ))}
    </nav>
  );
}
