import React, { useEffect, useRef, useState } from "react"
import { PDFDocument } from 'pdf-lib'
import { CssBaseline, ThemeProvider, createTheme } from "@material-ui/core"
import PDF from './PDF'
import DragAndDrop from './DragAndDrop'
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

const App = () => {
  const [sourcePdf, setSourcePdf] = useState(null)
  const [destinationPdf, setDestinationPdf] = useState(null)
  const pdfLibDestination = useRef(null)

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
      <TopBar />
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
