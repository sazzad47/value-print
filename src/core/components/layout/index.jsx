import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../../theme";
import { useSelector } from "react-redux";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex flex-col">
        <Navbar />
        <div className="">{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
