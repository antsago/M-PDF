import React, { useCallback, useState } from "react"
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, Typography, IconButton } from "@material-ui/core"
import { KeyboardArrowDown as SourceOpenIcon, KeyboardArrowRight as SourceClosedIcon, AddBox as AddBoxIcon } from "@material-ui/icons"
import { Source, InsertPage } from "../pdfManager"
import PDFPage from "./PDFPage"
import Masonry from "./Masonry"

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
    marginLeft: "-7px",
  },
  isClosed: {
    display: "none",
  }
}))

type Props = { file: Source, onInsert?: InsertPage }

const SourcePDF = ({ file, onInsert }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const [pages, setPages] = useState([])
  
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setPages(Array.from({ length: numPages }, (v, i) => i));
  }, [])
  const handleInsert = useCallback((page) => () => onInsert(page, file), [onInsert])
  const toggleOpen = useCallback(() => setIsOpen(wasOpen => !wasOpen), [onInsert])

  const classes = useStyles(isOpen)
  
  if (!file) {
    return null
  }

  return (
    <div>
      <div className={classes.title}>
        <IconButton size="small" aria-label={isOpen ? "Collapse source" : "Open source"} onClick={toggleOpen}>
          {isOpen ? <SourceOpenIcon /> : <SourceClosedIcon />}
        </IconButton>
        <Typography>{file.name}</Typography>
      </div>
      <Document
        className={isOpen ? "" : classes.isClosed}
        file={file.content}
        onLoadError={(error) => console.log(error)}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Masonry>
          {pages?.map((page) => (
            <PDFPage key={page} page={page}>
              {onInsert && (
                <IconButton aria-label="Insert page" onClick={handleInsert(page)}>
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
