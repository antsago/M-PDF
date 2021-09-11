import React from "react"
import { IntlProvider } from "react-intl"
import { CssBaseline, ThemeProvider, createTheme, makeStyles } from "@material-ui/core"
import lang from "../i18n"
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


const App = () => {
  const classes = useStyles()

  const locale = "es"
  const messages = lang[locale]

  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <IntlProvider locale={locale} messages={messages} defaultLocale="en">
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
