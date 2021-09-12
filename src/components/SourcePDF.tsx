import React, { useCallback, useState } from "react"
import { useIntl } from "react-intl"
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, Typography, IconButton, Tooltip } from "@material-ui/core"
import { KeyboardArrowDown as SourceOpenIcon, KeyboardArrowRight as SourceClosedIcon, PlusOne as AddPageIcon, AddBox as AddAllIcon } from "@material-ui/icons"
import { Source, InsertPage } from "../pdfManager"
import PDFPage from "./PDFPage"
import Masonry from "./Masonry"

const useStyles = makeStyles(() => ({
  title: {
    display: "flex",
    alignItems: "center",
    marginLeft: "-7px",
  },
  isClosed: {
    display: "none",
  },
  addIcon: {
    marginLeft: "auto",
  },
}))

type Props = { file: Source, onInsert: InsertPage }

const PageAction = ({ action, title, children }) => (
  <IconButton color="secondary" onClick={action} size="small">
    <Tooltip title={title}>
      {children}
    </Tooltip>
  </IconButton>
)

const SourcePDF = ({ file, onInsert }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const [pages, setPages] = useState([])
  
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setPages(Array.from({ length: numPages }, (v, i) => i));
  }, [])
  const handleInsert = useCallback((page) => () => onInsert(page, file), [onInsert])
  const handleInsertAll = useCallback(() => Promise.all(pages.map(page => onInsert(page, file))), [onInsert, pages])
  const toggleOpen = useCallback(() => setIsOpen(wasOpen => !wasOpen), [onInsert])

  const classes = useStyles(isOpen)
  const intl = useIntl()
  
  if (!file) {
    return null
  }

  return (
    <div>
      <div className={classes.title}>
        <IconButton size="small" aria-label={isOpen ? intl.formatMessage({ defaultMessage: "Collapse source" }) : intl.formatMessage({ defaultMessage: "Expand source" })} onClick={toggleOpen}>
          {isOpen ? <SourceOpenIcon /> : <SourceClosedIcon />}
        </IconButton>
        <Typography>{file.name}</Typography>
        <IconButton size="small" onClick={handleInsertAll} className={classes.addIcon}>
          <Tooltip title={intl.formatMessage({ defaultMessage: "Insert all pages" })}>
            <AddAllIcon />
          </Tooltip>
        </IconButton>
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
              <PageAction action={handleInsert(page)} title={intl.formatMessage({ defaultMessage: "Insert one page" })}>
                <AddPageIcon />
              </PageAction>
            </PDFPage>
          ))}
        </Masonry>
      </Document>
    </div>
  )
}

export default SourcePDF
