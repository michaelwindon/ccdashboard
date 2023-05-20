
import React from "react"
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material"


//MyStyles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import theme from "./config/theme"

//MyComponents
import SideNav from "./components/SideNav";
import AppHeader from "./components/AppHeader";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";


function App() {
  return (
    <>
      
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppHeader />
          <Box sx={styles.container}>
            <BrowserRouter>
              <SideNav />
              <Box sx={styles.mainSection} component={'main'}>
                <AppRoutes/>
              </Box>
            </BrowserRouter>
          </Box>

        </ThemeProvider>
     
    </>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  container: {
      display:'flex',
      bgcolor: 'netural.light',
      height: 'calc(100% - 64px)'
  },
  mainSection: {
    padding: 4,
    bgcolor: 'neutral.light',
    width: '100%',
    height: '100%',
    overflow: 'auto'
  }
  
}

export default App
