import React, { useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

interface BasicSelectorProps {
  options: string[];
  placeholder?: string;
}

const BasicSelector: React.FC<BasicSelectorProps> = ({
  options,
  placeholder,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  return (
    <FormControl fullWidth>
      <Select
        variant="standard"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        displayEmpty
        sx={{
          "& .MuiInputBase-input": {
            color: selectedValue === "" ? "#a7a7a7" : "black",
            fontFamily: '"Poppins", sans-serif',
            fontSize: "14px",
          },
          "& .MuiSvgIcon-root": {
            fill: "#2fafb6",
            stroke: "#2fafb6",
            backgroundColor: "#d7d7e8",
            borderRadius: "4px",
            height: "16px",
            width: "16px",
          },
        }}
      >
        {/* Render the placeholder only if it's provided */}
        {placeholder && !selectedValue && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}

        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BasicSelector;
