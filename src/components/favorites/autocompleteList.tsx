import type { GeoProps } from "../../types/generic";
import "./autocompleteList.css"

export function AutocompleteList({ results, onSelect }: GeoProps) {
    if (!results.length) return null;
  
    return (
      <div className="autocomplete-dropdown">
        {results.map((city, index) => (
          <div
            key={index}
            className="autocomplete-item"
            onClick={() => onSelect(city)}
          >
            <p className="city-name">
              {(city.city || city.address_line1 || city.county) +
                (city.county ? `, ${city.county}` : "")}
            </p>
          </div>
        ))}
      </div>
    );
  }