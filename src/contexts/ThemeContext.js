  import React, { createContext, useContext, useMemo, useState } from "react";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import CssBaseline from "@mui/material/CssBaseline";

  const ThemeContext = createContext();

  export const useTheme = () => {
    return useContext(ThemeContext);
  };

  export const ThemeProviderWrapper = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode: darkMode ? "dark" : "light",
            primary: { main: darkMode ? "#B39DDB" : "#673AB7" },
            secondary: { main: darkMode ? "#FFAB91" : "#F44336" },
          },
        }),
      [darkMode]
    );

    return (
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    );
  };
