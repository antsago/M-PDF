import React, { useCallback, useState } from "react"
import { CssBaseline, ThemeProvider, createTheme, makeStyles } from "@material-ui/core"
import { PDFDocument } from 'pdf-lib'
import MainPage from './MainPage'
import TopBar from './TopBar'
import { Destination } from "./Types"
import useSourceManager from './useSourceManager'

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

  const { sources, addSource, getSource } = useSourceManager()
  const [destination, setDestination] = useState<Destination>([])

  const onDownload = useCallback(async () => {
    const destinationPdf = await PDFDocument.create()
    await Promise.all(destination.map(async (pageConfig, pageIndex) => {
      const sourcePdf = await PDFDocument.load(getSource(pageConfig.sourceId).content)
      const [copiedPage] = await destinationPdf.copyPages(sourcePdf, [pageConfig.sourcePage])
      destinationPdf.insertPage(pageIndex, copiedPage)
    }))

    const linkTag = document.createElement('a')
    linkTag.href = await destinationPdf.saveAsBase64({ dataUri: true })
    linkTag.download = "foo.pdf"
    linkTag.click()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <TopBar onDownload={onDownload} />
        <MainPage
          destination={destination}
          setDestination={setDestination}
          sources={sources}
          addSource={addSource}
          getSource={getSource}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
