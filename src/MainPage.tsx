import React, { useEffect, useRef, useState, useCallback } from "react"
import { PDFDocument } from 'pdf-lib'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, Typography } from "@material-ui/core"
import { PDFFile, OnInsert } from './Types'
import SourcePDF from './SourcePDF'
import DragAndDrop from './DragAndDrop'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplate: "100% / 25% 75%",
    flexGrow: 1,
  },
  sources: {
    padding: theme.spacing(2),
    borderLeft: `${theme.spacing(0.5)}px ${theme.palette.primary.main} solid`,
  }
}))

const useSourceManager = () => {
  const [sources, setSources] = useState<PDFFile[]>([])

  const addSource = useCallback(
    (newSource: PDFFile) => setSources((oldSources) => [newSource, ...oldSources]),
    [],
  )
  const getSource = useCallback<(string) => PDFFile>(
    (id) => sources.find(source => source.id === id),
    [sources],
  )

  return { sources, addSource, getSource }
}

type DestinationPage = { sourceId: string, sourcePage: number }

const MainPage = () => {
  const classes = useStyles()

  const { sources, addSource, getSource } = useSourceManager()
  const [destination, setDestination] = useState<DestinationPage[]>([])
  
  // const [destinationPdf, setDestinationPdf] = useState<PDFFile>(null)
  // const pdfLibDestination = useRef<PDFDocument>(null)

  // useEffect(() => { (async () => {
  //   pdfLibDestination.current = await PDFDocument.create()
  // })() }, [])

  const insertPage = useCallback<OnInsert>(async (page, sourceFile, e) => {
    e.stopPropagation()
    setDestination((prevDestination) => [...prevDestination, { sourceId: sources[0].id, sourcePage: 1 }])

    // const destination = pdfLibDestination.current
    // const source = await PDFDocument.load(sourceFile.content)
    // const [existingPage] = await destination.copyPages(source, [page-1])
    // destination.insertPage(0, existingPage)
    // setDestinationPdf({
    //   id: "destination",
    //   content: await destination.saveAsBase64({ dataUri: true }),
    //   name: "destination",
    // })
  }, [sources])


  return (
    <div className={classes.root}>
      <DragAndDrop onLoad={addSource} className={classes.sources}>
        <Typography>Sources</Typography>
        {sources?.map((source) => (
          <SourcePDF file={source} key={source.id} onInsert={insertPage} />
        ))}
      </DragAndDrop>
      <div className={classes.sources}>
        <Typography>Destination</Typography>
        {destination?.map((destinationPage, pageIndex) => (
          <Document
            key={pageIndex}
            file={getSource(destinationPage.sourceId).content}
            onLoadError={(error) => console.log(error)}
            onLoadSuccess={() => { /* Do nothing */ }}
          >
            <Page
              pageNumber={destinationPage.sourcePage}
              width={100}
              renderAnnotationLayer={false}
              renderInteractiveForms={false}
              renderTextLayer={false}
            />
          </Document>
        ))}
      </div>
    </div>
  )
}

export default MainPage
