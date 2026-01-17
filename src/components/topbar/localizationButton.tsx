import "./headerButtons.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function LocalizationButton() {
  const navigate = useNavigate();
  const [city, setCity] = useState("Warszawa, Polska");

  useEffect(() => {
    const saved = localStorage.getItem("currentCity");
  
    if (saved) {
      const city = JSON.parse(saved);
      setCity(`${city.name}, ${city.country}`);
    }
  }, []);

  function handleClick() {
    navigate("/localization");
  }

  return (
    <button
      id="localization-button"
      className="header-button"
      onClick={handleClick}
    >
      <span className="material-symbols-outlined locale-icon">location_on</span>
      {city}
    </button>
  );
}