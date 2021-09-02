import React, { useEffect, useRef, useState } from "react"
import { PDFDocument } from 'pdf-lib'
import { makeStyles, Typography } from "@material-ui/core"
import PDF from './PDF'
import DragAndDrop from './DragAndDrop'
import { useCallback } from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplate: "100% / 25% 75%",
    flexGrow: 1,
  },
  sources: {
    padding: theme.spacing(2)
  }
}))

const MainPage = () => {
  const [sources, setSources] = useState<(string|ArrayBuffer)[]>([])
  const [destinationPdf, setDestinationPdf] = useState(null)
  const pdfLibDestination = useRef(null)

  const classes = useStyles()

  useEffect(() => { (async () => {
    pdfLibDestination.current = await PDFDocument.create()
  })() }, [])

  const insertPage = async () => {
    const destination = pdfLibDestination.current
    const source = await PDFDocument.load(sources[0])
    const [existingPage] = await destination.copyPages(source, [0])
    destination.insertPage(0, existingPage)
    setDestinationPdf(await destination.saveAsBase64({ dataUri: true }))
  }

  const addSource = useCallback((newSource: string|ArrayBuffer) => setSources((oldSources) => [newSource, ...oldSources]), [])

  return (
    <div className={classes.root}>
      <div className={classes.sources}>
        <Typography>Sources</Typography>
        <DragAndDrop onLoad={addSource} />
        {sources?.map((source, i) => (
          <PDF file={source} key={i} />
        ))}
      </div>
      <div>
        <button onClick={insertPage} disabled={!sources || !pdfLibDestination}>Insert page</button>
        <h1>Destination pdf</h1>
        <PDF file={destinationPdf} />
      </div>
    </div>
  )
}

export default MainPage
