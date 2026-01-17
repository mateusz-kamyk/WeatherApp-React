export type GeoapifyCity = {
    city?: string;
    address_line1: string;
    county: string;
    lat: number;
    lon: number;
    country: string;
};

export type FavoriteCity = {
    name: string;
    lat: number;
    lon: number;
    temp: number;
    icon: string;
    country: string;
};