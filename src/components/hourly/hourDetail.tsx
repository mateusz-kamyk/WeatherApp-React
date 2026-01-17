import "./hourDetail.css";
import type { HourDetailProps } from "../../types/generic";
import { OrientationIcon } from "../../functions/orientationIcon";
import { useSelector } from "react-redux";
import { convertTemp } from "../../functions/convertTemp";
import type { RootState } from "../../store/store";

export function HourDetail({ forecast, index }: HourDetailProps) {
    const hourData = forecast.list[index];
    const rain_value = hourData.rain?.["3h"] ?? 0;
    const hour = new Date(hourData.dt * 1000).getHours() + ":00";
    const unit = useSelector((state: RootState) => state.unit);

    return (
        <div className="hour-detail-section">
            <h3 className="hour-detail-header">Szczegóły dla: {hour}</h3>
            <div className="hour-details">
                <div className="hour-detail-item">
                    <div className="material-symbols-outlined hour-detail-icon">
                    {OrientationIcon(hourData.wind.deg)}
                    </div>
                    <div className="hour-detail-text">
                        <p className="hour-detail-label">Wiatr</p>
                        <p className="hour-detail-value">{Math.round(hourData.wind.speed * 3.6)} km/h</p>
                    </div>
                </div>
                <div className="hour-detail-item">
                    <div className="material-symbols-outlined hour-detail-icon">
                    thermostat
                    </div>
                    <div className="hour-detail-text">
                        <p className="hour-detail-label">Odczuwalna</p>
                        <p className="hour-detail-value">{convertTemp(hourData.main.feels_like, unit)}°</p>
                    </div>
                </div>
                <div className="hour-detail-item">
                    <div className="material-symbols-outlined hour-detail-icon">
                    device_thermostat
                    </div>
                    <div className="hour-detail-text">
                        <p className="hour-detail-label">Ciśnienie</p>
                        <p className="hour-detail-value">{hourData.main.pressure} hPa</p>
                    </div>
                </div>
                <div className="hour-detail-item">
                    <div className="material-symbols-outlined hour-detail-icon">
                    water_drop
                    </div>
                    <div className="hour-detail-text">
                        <p className="hour-detail-label">Szansa opadów</p>
                        <p className="hour-detail-value">{Math.round(hourData.pop*100)}%</p>
                    </div>
                </div>
                <div className="hour-detail-item">
                    <div className="material-symbols-outlined hour-detail-icon">
                    cloud
                    </div>
                    <div className="hour-detail-text">
                        <p className="hour-detail-label">Zachmurzenie</p>
                        <p className="hour-detail-value">{Math.round(hourData.clouds.all)}%</p>
                    </div>
                </div>
                <div className="hour-detail-item">
                    <div className="material-symbols-outlined hour-detail-icon">
                    rainy_light
                    </div>
                    <div className="hour-detail-text">
                        <p className="hour-detail-label">Opady</p>
                        <p className="hour-detail-value">{rain_value} mm</p>
                    </div>
                </div>
                <div className="hour-detail-item">
                    <div className="material-symbols-outlined hour-detail-icon">
                    humidity_percentage
                    </div>
                    <div className="hour-detail-text">
                        <p className="hour-detail-label">Wilgotność</p>
                        <p className="hour-detail-value">{Math.round(hourData.main.humidity)}%</p>
                    </div>
                </div>
                <div className="hour-detail-item">
                    <div className="material-symbols-outlined hour-detail-icon">
                    visibility
                    </div>
                    <div className="hour-detail-text">
                        <p className="hour-detail-label">Widoczność</p>
                        <p className="hour-detail-value">{Math.round(hourData.visibility/1000)} km</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
