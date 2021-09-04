import React from "react"
import { CssBaseline, ThemeProvider, createTheme, makeStyles } from "@material-ui/core"
import MainPage from './MainPage'
import TopBar from './TopBar'
import { Provider } from './pdfManager'

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

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <TopBar />
          <MainPage />
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default App
