import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { convertTemp } from "../../functions/convertTemp";
import type { FavoriteItemProps } from "../../types/generic";
import { mapIcon } from "../../functions/mapIcon";
import "./favoriteItem.css"

export function FavoriteItem({
  fav,
  index,
  onDragStart,
  onDrop,
  removeFavorite,
  selectFavorite,
}: FavoriteItemProps) {
  const unit = useSelector((state: RootState) => state.unit);
  return (
    <div key={index} className="favorite-item" onClick={selectFavorite} draggable onDragStart={onDragStart} onDragOver={(e) => e.preventDefault()} onDrop={onDrop} >
      <div className="favorite-left">
        <span className="material-symbols-outlined drag-icon">drag_indicator</span>

        <div className="favorite-info">
          <p className="favorite-name">
            {fav.name}, {fav.country}
          </p>

          <p className="favorite-temp">
            <span className="material-symbols-outlined favorite-weather-icon">
              {mapIcon(fav.icon)}
            </span>
            {convertTemp(fav.temp, unit)}°
          </p>
        </div>
      </div>

      <button className="favorite-delete" onClick={(e) => {e.stopPropagation(); removeFavorite()}}>
        <span className="material-symbols-outlined delete-icon">delete</span>
      </button>
    </div>
  );
}