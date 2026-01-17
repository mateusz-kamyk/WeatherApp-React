import "./headerButtons.css"
import { useNavigate } from "react-router-dom";

export function SettingsButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/settings");
  }

  return (
      <button id="settings-button" className="header-button" onClick={handleClick}>
        <span className="material-symbols-outlined icon">menu</span>
      </button>
  );
}