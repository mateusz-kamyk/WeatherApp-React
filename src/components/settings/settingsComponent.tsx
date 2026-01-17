import "./settingsComponent.css"
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setUnit } from "../../store/unitSlice";

export function SettingsComponent() {
    const unit = useSelector((state: RootState) => state.unit);
    const dispatch = useDispatch();

    return (
        <div className="unit-settings-section">
            <div className="temperature-settings">
                <div className="temperature-settings-info">
                    <span className="material-symbols-outlined temperature-settings-icon">
                        device_thermostat
                    </span>
                    <p className="temperature-settings-header">Temperatura</p>
                </div>
                <div className="temperature-settings-toggle">
                    <button
                        className={`temperature-settings-celsius-degree ${unit === "C" ? "active" : ""}`}
                        onClick={() => dispatch(setUnit("C"))}
                    >
                        °C
                    </button>

                    <button
                        className={`temperature-settings-fahrenheit-degree ${unit === "F" ? "active" : ""}`}
                        onClick={() => dispatch(setUnit("F"))}
                    >
                        °F
                    </button>
                </div>
            </div>
        </div>
    );
}