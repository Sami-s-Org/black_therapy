import React, { useState } from "react";
import { TextField, List, ListItem, Paper } from "@mui/material";

const GOOGLE_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const LocationSearchInput = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const fetchPlaces = async (inputValue: string) => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&key=${GOOGLE_API_KEY}`
    );

    const data = await response.json();
    if (data.predictions) {
      setSuggestions(data.predictions);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    fetchPlaces(value);
  };

  const handleSelectLocation = (place: any) => {
    setSelectedLocation(place.description);
    setQuery(place.description);
    setSuggestions([]);
  };

  return (
    <div>
      <TextField
        placeholder="Choose City"
        variant="standard"
        fullWidth
        value={query}
        onChange={handleInputChange}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "14px",
            "::placeholder": {
              fontSize: "14px",
            },
            "& .MuiSvgIcon-root": {
              fill: "#2fafb6",
            },
          },
        }}
      />

      {suggestions.length > 0 && (
        <Paper
          style={{ position: "absolute", zIndex: 1000, width: "100%" }}
        ></Paper>
      )}

      {selectedLocation && (
        <TextField
          placeholder="Choose City"
          variant="standard"
          fullWidth
          value={selectedLocation}
          disabled
          sx={{
            "& .MuiInputBase-input-MuiInput-input": {
              fontSize: "14px",
            },
          }}
        />
      )}
    </div>
  );
};

export default LocationSearchInput;
