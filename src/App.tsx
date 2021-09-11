import React from "react"
import { IntlProvider } from "react-intl"
import { CssBaseline, ThemeProvider, createTheme, makeStyles } from "@material-ui/core"
import MainPage from './MainPage'
import { TopBar } from './components'
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

const messages = {
  myMessage: "Descargar",
}

const App = () => {
  const classes = useStyles()

  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <IntlProvider locale="es" messages={messages} defaultLocale="en">
          <div className={classes.root}>
            <TopBar />
            <MainPage />
          </div>
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
