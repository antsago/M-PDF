import React, { useCallback, useEffect, useRef, useState } from "react"
import { PDFDocument } from 'pdf-lib'
import { AppBar, Toolbar, IconButton, Typography, Button, CssBaseline, ThemeProvider, createTheme } from "@material-ui/core"
import { Menu as MenuIcon } from "@material-ui/icons"
import PDF from './PDF'
import DragAndDrop from './DragAndDrop'

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

const App = () => {
  const [sourcePdf, setSourcePdf] = useState(null)
  const [destinationPdf, setDestinationPdf] = useState(null)
  const pdfLibDestination = useRef(null)

  useCallback(() => { }, [])
  useEffect(() => { (async () => {
    pdfLibDestination.current = await PDFDocument.create()
  })() }, [])

  const insertPage = async () => {
    const destination = pdfLibDestination.current
    const source = await PDFDocument.load(sourcePdf)
    const [existingPage] = await destination.copyPages(source, [0])
    destination.insertPage(0, existingPage)
    setDestinationPdf(await destination.saveAsBase64({ dataUri: true }))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            M-PDF
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div>
        <DragAndDrop onLoad={setSourcePdf} />

        <h1>Original pdf</h1>
        <PDF file={sourcePdf} />

        <button onClick={insertPage} disabled={!sourcePdf || !pdfLibDestination}>Insert page</button>

        <h1>Destination pdf</h1>
        <PDF file={destinationPdf} />
      </div>
    </ThemeProvider>
  )
}

export default App
