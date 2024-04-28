import { useState, useMemo, ChangeEvent } from "react";
import React from "react";

import { Input } from "./ui/input";
import cityList from "../lib/cities-list";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default React.forwardRef<HTMLInputElement, InputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationInputSearch, setLocationInputSearch] = useState("");
    const [isSearchSelected, setIsSearchSelected] = useState(true);
    const [hasFocus, setHasFocus] = useState(false);

    const cities = useMemo(() => {
      if (!locationInputSearch.trim()) return [];

      const searchWord = locationInputSearch.split(" ");

      return cityList
        .map((city) => `${city.name} ${city.subcountry} ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWord[0].toLowerCase()) &&
            searchWord.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationInputSearch]);

    function handleListSelection(city: string) {
      setLocationInputSearch("");
      setIsSearchSelected(false);
      onLocationSelected(city);
    }
    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      setLocationInputSearch(e.target.value);
      setIsSearchSelected(true);
    }

    return (
      <>
        <Input
          {...props}
          ref={ref}
          placeholder="Search of City"
          type="search"
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          onChange={handleInputChange}
          value={locationInputSearch}
        />
        {isSearchSelected && (
          <div className="mt-3">
            {!cities.length && <p className="text-sm">No Result Found</p>}
            {
                locationInputSearch.trim() && hasFocus &&
              <ul>
                {cities.map((city) => {
                  return (
                    <li
                      onMouseDown={() => handleListSelection(city)}
                      className="cursor-pointer border-b border-b-slate-200 px-1 py-2 hover:bg-slate-200"
                      key={city}
                    >
                      {city}
                    </li>
                  );
                })}
              </ul>
            }
          </div>
        )}
      </>
    );
  },
);
