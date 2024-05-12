import React from "react";
import { Container, CssBaseline, Grid } from "@mui/material";
import { RecordForm } from "./components/DashboardSection/RecordForm";
import { RecordTable } from "./components/DashboardSection/RecordTable";
import RecordProvider from "./context/RecordContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RecordProvider>
        <CssBaseline />
        <Dashboard />
      </RecordProvider>
    </LocalizationProvider>
  );
}

export default App;
