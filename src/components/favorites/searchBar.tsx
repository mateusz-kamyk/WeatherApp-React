import type { SearchBarProps } from "../../types/generic";
import "./searchBar.css"

export function SearchBar({ query, setQuery, getCurrentLocation }: SearchBarProps) {
    return (
      <div className="searchbar">
        <span className="material-symbols-outlined search-icon">search</span>
  
        <input
          type="text"
          className="search-input"
          placeholder="Wyszukaj miasto lub kod pocztowy"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
  
        <button className="gps-button" onClick={getCurrentLocation}>
          <span className="material-symbols-outlined gps-icon">my_location</span>
        </button>
      </div>
    );
}