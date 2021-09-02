import React from "react"
import { CssBaseline, ThemeProvider, createTheme } from "@material-ui/core"
import MainPage from './MainPage'
import TopBar from './TopBar'

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ff5722",
    },
    secondary: {
      main: "#c6ff00",
    },
  }
})

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <TopBar />
    <MainPage />
  </ThemeProvider>
)

export default App
