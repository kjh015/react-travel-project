import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GlobalNavigator() {
  const navigate = useNavigate();
  useEffect(() => {
    window._navigate = navigate;
  }, [navigate]);
  return null;
}