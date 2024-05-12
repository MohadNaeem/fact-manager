import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

interface Props {
  onFilter: (searchTerm: string) => void;
  onSort: (type: "upvotes" | "date") => void;
}

const RecordFilter: React.FC<Props> = ({ onFilter, onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Apply filter with delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        onFilter(searchTerm);
      }
    }, 1000); // Delay of 1 second

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onFilter]);

  return (
    <>
      <Box padding={2} display={"flex"} alignItems={"center"}>
        <TextField
          label="Search Records"
          variant="outlined"
          style={{
            width: "70%",
            margin: "auto",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            className: "inputStyles",
            style: {
              borderRadius: "10px",
            },
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="caption" fontWeight={600} color={'gray'}>Sort by</Typography>
        <button
          onClick={() => onSort("upvotes")}
          style={{ marginLeft: 8 }}
          className="btn w-auto"
        >
          Most Upvoted
        </button>
        <button
          onClick={() => onSort("date")}
          className="btn w-auto"
          style={{ marginLeft: 8 }}
        >
          Most Recent
        </button>
      </Box>
    </>
  );
};

export default RecordFilter;
