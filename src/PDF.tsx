import React, { useState, MouseEvent, useCallback } from "react"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, Typography, IconButton } from "@material-ui/core"
import AddBoxIcon from '@material-ui/icons/AddBox';
import { PDFFile, OnInsert } from "./Types"

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

type Props = { file: PDFFile, onInsert?: OnInsert }

const PDF = ({ file, onInsert }: Props) => {
  const classes = useStyles()

  const [pages, setPages] = useState([])

  if (!file) {
    return null
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(Array.from({ length: numPages }, (v, i) => i + 1));
  }

  const handleInsert = (page) => {
    return (e) => onInsert(page, file, e)
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
          <div key={page}>
            <Page
              className={classes.page}
              pageNumber={page}
              width={100}
              renderAnnotationLayer={false}
              renderInteractiveForms={false}
              renderTextLayer={false}
            />
            {onInsert && (
              <IconButton aria-label="insert page" onClick={handleInsert(page)}>
                <AddBoxIcon />
              </IconButton>
            )}
          </div>
        ))}
      </Document>
    </div>
  )
}

export default PDF
