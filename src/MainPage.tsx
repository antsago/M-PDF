import React, { useEffect, useRef, useState, useCallback } from "react"
import { PDFDocument } from 'pdf-lib'
import { makeStyles, Typography } from "@material-ui/core"
import { PDFFile } from './Types'
import PDF from './PDF'
import DragAndDrop from './DragAndDrop'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplate: "100% / 25% 75%",
    flexGrow: 1,
  },
  sources: {
    padding: theme.spacing(2),
    borderRight: `${theme.spacing(1)}px ${theme.palette.primary.main} solid`
  }
}))

const MainPage = () => {
  const classes = useStyles()
  
  const [sources, setSources] = useState<PDFFile[]>([])
  const [destinationPdf, setDestinationPdf] = useState(null)
  const pdfLibDestination = useRef(null)

  useEffect(() => { (async () => {
    pdfLibDestination.current = await PDFDocument.create()
  })() }, [])

  const insertPage = async () => {
    const destination = pdfLibDestination.current
    const source = await PDFDocument.load(sources[0].content)
    const [existingPage] = await destination.copyPages(source, [0])
    destination.insertPage(0, existingPage)
    setDestinationPdf(await destination.saveAsBase64({ dataUri: true }))
  }

  const addSource = useCallback(
    (newSource: PDFFile) => setSources((oldSources) => [newSource, ...oldSources]),
    [],
  )

  return (
    <div className={classes.root}>
      <DragAndDrop onLoad={addSource} className={classes.sources}>
        <Typography>Sources</Typography>
        {sources?.map((source) => (
          <PDF file={source} key={source.id} />
        ))}
      </DragAndDrop>
      <div>
        <button onClick={insertPage} disabled={!sources || !pdfLibDestination}>Insert page</button>
        <h1>Destination pdf</h1>
        <PDF file={destinationPdf} />
      </div>
    </div>
  )
}

export default MainPage
