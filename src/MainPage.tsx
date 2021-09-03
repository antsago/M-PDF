import React, { useState, useCallback } from "react"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, Typography } from "@material-ui/core"
import { OnInsert } from './Types'
import SourcePDF from './SourcePDF'
import DragAndDrop from './DragAndDrop'
import useSourceManager from './useSourceManager'
import PDFPage from "./PDFPage"

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

type DestinationPage = { sourceId: string, sourcePage: number }

const MainPage = () => {
  const classes = useStyles()

  const { sources, addSource, getSource } = useSourceManager()
  const [destination, setDestination] = useState<DestinationPage[]>([])

  const insertPage = useCallback<OnInsert>(async (page, sourceFile, e) => {
    e.stopPropagation()
    setDestination((prevDestination) => [...prevDestination, { sourceId: sourceFile.id, sourcePage: page }])
  }, [])


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
            <PDFPage page={destinationPage.sourcePage} />
          </Document>
        ))}
      </div>
    </div>
  )
}

export default MainPage
