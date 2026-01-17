export function OrientationIcon(deg: number) {
    let wind_arrow = "";
  
    if (deg >= 0 && deg < 45) {
        wind_arrow = "north";
    }
    if (deg >= 45 && deg < 90) {
        wind_arrow = "north_east";
    }
    if (deg >= 90 && deg < 135) {
        wind_arrow = "east";
    }
    if (deg >= 135 && deg < 180) {
        wind_arrow = "south_east";
    }
    if (deg >= 180 && deg < 225) {
        wind_arrow = "south";
    }
    if (deg >= 225 && deg < 270) {
        wind_arrow = "south_west";
    }
    if (deg >= 270 && deg < 315) {
        wind_arrow = "west";
    }
    if (deg >= 315 && deg <= 360) {
        wind_arrow = "north_west";
    }
    return wind_arrow
}