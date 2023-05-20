import { createTheme } from "@mui/material";
import {
  green,
  grey,
  indigo,
  blueGrey,
  deepOrange,
} from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: "#85C7F2",
      normal: "#D1D1D1",
    },
    secondary: {
      main: "#D1D1D1",
    },
    neutral: {
      light: "#DBDBDB",
      medium: "#85C7F2",
      normal: "#636363",
      main: "#4C4C4C",
    },
    green: {
      main: green[800],
    },
  },
});

theme = createTheme(theme, {
  typography: {
    link: {
      fontSize: "0.8rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "0.9rem",
      },
      fontWeight: 500,
      color: theme.palette.primary.normal,
      display: "block",
      cursor: "pointer",
    },
    cardTitle: {
      fontSize: "1.2rem",
      display: "block",
      fontWeight: 500,
    },
    h6: {
      frontSize: "1rem",
    },
    h7: {
      fontSize: "0.8rem",
    },
    h8: {
      fontSize: "0.7rem",
    },
  },
});

export default theme;
