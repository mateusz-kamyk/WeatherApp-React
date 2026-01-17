import type { FavoriteCity } from "../types/cities";

export function moveFavorite(
    from: number,
    to: number,
    favorites: FavoriteCity[],
    setFavorites: (fav: FavoriteCity[]) => void
) {
    if (from === to) return;
    
    const updated = [...favorites];
    const item = updated.splice(from, 1)[0];
    updated.splice(to, 0, item);
  
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
}