import React, { useState } from "react"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles } from "@material-ui/core"
import { PDFFile } from "./Types"

const useStyles = makeStyles((theme) => ({
  document: {
    marginBottom: theme.spacing(2)
  },
  page: {
    marginBottom: theme.spacing(1)
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
    <Document
      file={file.content}
      onLoadError={(error) => console.log(error)}
      onLoadSuccess={onDocumentLoadSuccess}
      className={classes.document}
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
  )
}

export default PDF
