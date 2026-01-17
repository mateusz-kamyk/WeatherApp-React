import { useEffect, useState } from "react";
import { FavoriteItem } from "./favoriteItem";
import { LoadFavoriteCityWeather} from "../../functions/loadFavouriteCityWeather";
import type { FavoriteListProps } from "../../types/generic";
import "./favoriteList.css"

export function FavoritesList({
  favorites,
  dragIndex,
  setDragIndex,
  moveFavorite,
  removeFavorite,
  selectFavorite,
}: FavoriteListProps) {

  const [updatedFavs, setUpdatedFavs] = useState(favorites);

  useEffect(() => {
    async function load() {
      const updated = await Promise.all(
        favorites.map(async fav => {
          const w = await LoadFavoriteCityWeather(fav.lat, fav.lon);
  
          return {
            ...fav,
            temp: Math.round(w.main.temp),
            icon: w.weather[0].icon,
          };
        })
      );
  
      setUpdatedFavs(updated);
    }
  
    load();
  }, [favorites]);

return (
  <div className="favorites-list">
    {updatedFavs.map((fav, index) => (
      <FavoriteItem
        key={index}
        fav={fav}
        index={index}
        onDragStart={() => setDragIndex(index)}
        onDrop={() => {
          if (dragIndex !== null) {
            moveFavorite(dragIndex, index);
          }
        }}
        removeFavorite={() => removeFavorite(index)}
        selectFavorite={() => selectFavorite(fav)}
      />
    ))}
  </div>
);
}