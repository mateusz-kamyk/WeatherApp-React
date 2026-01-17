import "../styles/base.css";
import "../styles/layout.css";
import "../components/topbar/headerButtons.css";
import "../components/favorites/searchBar.css";
import { GoBack } from "../components/topbar/goBack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/favorites/searchBar";
import { AutocompleteList } from "../components/favorites/autocompleteList";
import { FavoritesList } from "../components/favorites/favoriteList";
import { searchCity } from "../functions/searchCity";
import { addFavorite } from "../functions/addFavorite";
import { removeFavorite } from "../functions/removeFavorite";
import { moveFavorite } from "../functions/moveFavorite";
import { reverseGeocode } from "../functions/reverseGeocode";

import type { GeoapifyCity, FavoriteCity } from "../types/cities";

export function LocalizationPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoapifyCity[]>([]);
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (query.trim().length < 4) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      const data = await searchCity(query);
      setResults(data);
    }, 1000);

    return () => clearTimeout(delay);
  }, [query]);

  async function handleSelect(city: GeoapifyCity) {
    await addFavorite(city, favorites, setFavorites);
    setQuery("");
  }

  function selectFavorite(fav: FavoriteCity) {
    localStorage.setItem("currentCity", JSON.stringify(fav));
    navigate("/");
  }

  async function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Nie udało się ustalić lokalizacji.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
  
        try {
          const city = await reverseGeocode(lat, lon);
          if (!city) throw new Error();
  
          await addFavorite(city, favorites, setFavorites);
        } catch {
          alert(`Nie udało się ustalić lokalizacji.\nlat: ${lat}\nlon: ${lon}`);
        }
      },
      () => alert("Nie udało się ustalić lokalizacji.\n(Brak współrzędnych)"),
    );
  }

  return (
    <div className="localization-page">
      <div className="header">
        <GoBack />
      </div>
      <h1 className="header-title">Zarządzaj lokalizacjami</h1>
      <div className="searchbar-wrapper">
        <SearchBar
          query={query}
          setQuery={setQuery}
          getCurrentLocation={getCurrentLocation}
        />

        <AutocompleteList results={results} onSelect={handleSelect} />
      </div>
      <FavoritesList
        favorites={favorites}
        setDragIndex={setDragIndex}
        dragIndex={dragIndex}
        moveFavorite={(from, to) =>
          moveFavorite(from, to, favorites, setFavorites)
        }
        removeFavorite={(i) => removeFavorite(i, favorites, setFavorites)}
        selectFavorite={selectFavorite}
      />
    </div>
  );
}
