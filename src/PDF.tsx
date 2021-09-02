import React, { useState } from "react"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, Typography } from "@material-ui/core"
import { PDFFile } from "./Types"

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  document: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  page: {
    margin: theme.spacing(1),
  }
}))

const PDF = ({ file }: { file: PDFFile }) => {
  const classes = useStyles()

  const [pages, setPages] = useState([])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(Array.from({ length: numPages }, (v, i) => i + 1));
  }

  if (!file) {
    return null
  }

  return (
    <div className={classes.root}>
      <Typography>{file.name}</Typography>
      <Document
        className={classes.document}
        file={file.content}
        onLoadError={(error) => console.log(error)}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {pages?.map((page) => (
          <Page
            key={page}
            className={classes.page}
            pageNumber={page}
            width={100}
            renderAnnotationLayer={false}
            renderInteractiveForms={false}
            renderTextLayer={false}
          />
        ))}
      </Document>
    </div>
  )
}

export default PDF
