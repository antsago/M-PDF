import React, { useState } from "react"
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, Typography, IconButton } from "@material-ui/core"
import AddBoxIcon from '@material-ui/icons/AddBox';
import { PDFFile, OnInsert } from "../pdfManager"
import PDFPage from "./PDFPage"
import Masonry from "./Masonry"

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
}))

type Props = { file: PDFFile, onInsert?: OnInsert }

const SourcePDF = ({ file, onInsert }: Props) => {
  const classes = useStyles()

  const [pages, setPages] = useState([])

  if (!file) {
    return null
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(Array.from({ length: numPages }, (v, i) => i));
  }

  const handleInsert = (page) => {
    return (e) => onInsert(page, file, e)
  }

  return (
    <div className={classes.root}>
      <Typography>{file.name}</Typography>
      <Document
        file={file.content}
        onLoadError={(error) => console.log(error)}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Masonry>
          {pages?.map((page) => (
            <PDFPage key={page} page={page}>
              {onInsert && (
                <IconButton aria-label="insert page" onClick={handleInsert(page)}>
                  <AddBoxIcon />
                </IconButton>
              )}
            </PDFPage>
          ))}
        </Masonry>
      </Document>
    </div>
  )
}

export default SourcePDF
