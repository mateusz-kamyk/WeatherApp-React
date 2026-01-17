export type WeatherData = {
    weather: { icon: string; description: string }[];
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      pressure: number;
    };
    wind: { speed: number };
};
  
export type ForecastEntry = {
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      icon: string;
      description: string;
    }[];
    clouds: {
      all: number;
    }
    wind: {
      speed: number;
      deg: number;
    }
    rain:{
      "3h": number;
    }
    visibility: number;
    pop: number;
};
  
export type ForecastData = {
    list: ForecastEntry[];
};