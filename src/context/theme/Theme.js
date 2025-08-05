import { createTheme } from "@mui/material";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#2c2c2c" : "#f4f4f6",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#101010",
      },
    },
    typography: {
      fontFamily: ["AR"],
    },
  });
