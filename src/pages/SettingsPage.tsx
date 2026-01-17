import { GoBack } from "../components/topbar/goBack";
import { SettingsComponent } from "../components/settings/settingsComponent";

export function SettingsPage() {
  return (
    <div>
        <div>
            <GoBack />
        </div>
        <div>
            <h1 className="header-title">Ustawienia</h1>
        </div>
        <div>
            < SettingsComponent />
        </div>
    </div>
  );
}