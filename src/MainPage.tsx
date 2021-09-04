import React from "react"
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, Typography } from "@material-ui/core"
import SourcePDF from './SourcePDF'
import DragAndDrop from './DragAndDrop'
import PDFPage from "./PDFPage"
import Masonry from "./Masonry"
import { usePdfManager } from "PDFManager"

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

const MainPage = () => {
  const classes = useStyles()
  const { insertPage, destination, sources, addSource, getSource } = usePdfManager()

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
        <Masonry>
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
        </Masonry>
      </div>
    </div>
  )
}

export default MainPage
