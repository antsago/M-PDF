import React from "react"
import { IntlProvider } from "react-intl"
import { CssBaseline, ThemeProvider, createTheme, makeStyles } from "@material-ui/core"
import i18n from "../i18n"
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

const locales = [
  { locale: "es", name: "Español" },
  { locale: "en", name: "English" },
]

const App = () => {
  const classes = useStyles()
  const [locale, setLocale] = React.useState<string>("es")

  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <IntlProvider locale={locale} messages={i18n[locale]} defaultLocale="en">
          <div className={classes.root}>
            <TopBar locales={locales} locale={locale} setLocale={setLocale} />
            <MainPage />
          </div>
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
