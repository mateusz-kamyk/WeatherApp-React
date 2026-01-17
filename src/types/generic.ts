import type { GeoapifyCity, FavoriteCity } from "./cities";
import type { ForecastData, WeatherData } from "./weather";

export type GeoProps = {
    results: GeoapifyCity[];
    onSelect: (city: GeoapifyCity) => void;
};

export type ForecastProps = {
  forecast: ForecastData;
};

export type WeatherProps = {
  weather: WeatherData;
};

export type FavoriteItemProps = {
    fav: FavoriteCity;
    index: number;
    onDragStart: () => void;
    onDrop: () => void;
    removeFavorite: () => void;
    selectFavorite: () => void;
};

export type FavoriteListProps = {
    favorites: FavoriteCity[];
    dragIndex: number | null;
    setDragIndex: (i: number | null) => void;
    moveFavorite: (from: number, to: number) => void;
    removeFavorite: (index: number) => void;
    selectFavorite: (fav: FavoriteCity) => void;
};

export type SearchBarProps ={
    query: string;
    setQuery: (value: string) => void;
    getCurrentLocation: () => void;
}

export type HourlyForecastProps = {
    forecast: ForecastData;
    selectedIndex: number;
    onSelect: (index: number) => void;
};

export type HourDetailProps = {
    forecast: ForecastData;
    index: number;
};  

type HourItem = {
    hour: string;
    temp: number;
};
  
export type ChartProps = {
    data: HourItem[];
};

type TooltipPayloadItem = {
    value: number;
    name: string;
    dataKey?: string;
    color?: string;
  };
  
export type CustomTooltipProps = {
    active?: boolean;
    label?: string | number;
    payload?: TooltipPayloadItem[];
  };