import type { FavoriteCity } from "../types/cities";

export function removeFavorite(
  index: number,
  favorites: FavoriteCity[],
  setFavorites: (fav: FavoriteCity[]) => void
) {
  const updated = favorites.filter((_, i) => i !== index);
  setFavorites(updated);
  localStorage.setItem("favorites", JSON.stringify(updated));
}