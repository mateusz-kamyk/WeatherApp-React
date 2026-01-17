export function mapIcon(icon: string) {
    const code = icon.slice(0, 2);
  
    switch (code) {
      case "01": return "sunny";
      case "02": return "partly_cloudy_day";
      case "03": return "cloud";
      case "04": return "cloud";
      case "09": return "rainy_light";
      case "10": return "rainy";
      case "11": return "thunderstorm";
      case "13": return "snowing";
      case "50": return "foggy";
      default:   return "partly_cloudy_day";
    }
  }