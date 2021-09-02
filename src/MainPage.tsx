import React, { useEffect, useRef, useState, useCallback, MouseEvent } from "react"
import { PDFDocument } from 'pdf-lib'
import { makeStyles, Typography } from "@material-ui/core"
import { PDFFile, OnInsert } from './Types'
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
  const [destinationPdf, setDestinationPdf] = useState<PDFFile>(null)
  const pdfLibDestination = useRef<PDFDocument>(null)

  useEffect(() => { (async () => {
    pdfLibDestination.current = await PDFDocument.create()
  })() }, [])

  const insertPage = useCallback<OnInsert>(async (page, sourceFile, e) => {
    e.stopPropagation()

    const destination = pdfLibDestination.current
    const source = await PDFDocument.load(sourceFile.content)
    const [existingPage] = await destination.copyPages(source, [page-1])
    destination.insertPage(0, existingPage)
    setDestinationPdf({
      id: "destination",
      content: await destination.saveAsBase64({ dataUri: true }),
      name: "destination",
    })
  }, [])

  const addSource = useCallback(
    (newSource: PDFFile) => setSources((oldSources) => [newSource, ...oldSources]),
    [],
  )

  return (
    <div className={classes.root}>
      <DragAndDrop onLoad={addSource} className={classes.sources}>
        <Typography>Sources</Typography>
        {sources?.map((source) => (
          <PDF file={source} key={source.id} onInsert={insertPage} />
        ))}
      </DragAndDrop>
      <div>
        <h1>Destination pdf</h1>
        <PDF file={destinationPdf} />
      </div>
    </div>
  )
}

export default MainPage
