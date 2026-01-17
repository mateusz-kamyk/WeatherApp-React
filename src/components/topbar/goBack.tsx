import "./headerButtons.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function GoBack() {
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
    <div className="go-back-header">
      <div className="header">
        <button
          className="header-back-text-button"
          onClick={() => navigate("/")}
        >
          <span className="material-symbols-outlined back-button" onClick={handleClick}>
            arrow_back 
          </span>{city}
        </button>
      </div>
    </div>
  );
}
