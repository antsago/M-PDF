import React, { useCallback, useState } from "react"
import { useIntl } from "react-intl"
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, Typography, IconButton, Tooltip } from "@material-ui/core"
import { KeyboardArrowDown as SourceOpenIcon, KeyboardArrowRight as SourceClosedIcon, PlusOne as AddPageIcon, AddBox as AddAllIcon } from "@material-ui/icons"
import { Source, InsertPage, Page as PageType } from "../pdfManager"
import PDFPage from "./PDFPage"
import Masonry from "./Masonry"
import PageActionButton from "./PageActionButton"

const useStyles = makeStyles(() => ({
  title: {
    display: "flex",
    alignItems: "center",
    marginLeft: "-7px",
  },
  titleText: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  isClosed: {
    display: "none",
  },
  addIcon: {
    marginLeft: "auto",
  },
  draggedPage: {
    opacity: 0.25,
  }
}))

type Props = { file: Source, onInsert: InsertPage }

const SourcePDF = ({ file, onInsert }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggleOpen = useCallback(() => setIsOpen(wasOpen => !wasOpen), [onInsert])

  const classes = useStyles(isOpen)
  const intl = useIntl()

  const [pages, setPages] = useState<PageType[]>([])
  
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setPages(Array.from({ length: numPages }, (v, i) => ({ sourcePage: i, sourceId: file.id })));
  }, [file])
  const handleInsert = (page: PageType) => () => onInsert(page)
  const handleInsertAll = () => Promise.all(pages.map(page => onInsert(page)))
  
  if (!file) {
    return null
  }

  return (
    <div>
      <div className={classes.title}>
        <IconButton size="small" aria-label={isOpen ? intl.formatMessage({ defaultMessage: "Collapse source" }) : intl.formatMessage({ defaultMessage: "Expand source" })} onClick={toggleOpen}>
          {isOpen ? <SourceOpenIcon /> : <SourceClosedIcon />}
        </IconButton>
        <Typography component="h3" variant="body1" className={classes.titleText}>
          {file.name}
        </Typography>
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
            <PDFPage key={page.sourcePage} page={page} draggedClassName={classes.draggedPage}>
              <PageActionButton 
                action={handleInsert(page)}
                title={intl.formatMessage({ defaultMessage: "Insert one page" })}
              >
                <AddPageIcon />
              </PageActionButton>
            </PDFPage>
          ))}
        </Masonry>
      </Document>
    </div>
  )
}

export default SourcePDF
