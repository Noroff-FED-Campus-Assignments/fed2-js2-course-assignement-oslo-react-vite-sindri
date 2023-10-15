import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function Signout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("access_token");
    navigate({ to: "/login" });
  }, []);
  return <div>Logging you out</div>;
}
