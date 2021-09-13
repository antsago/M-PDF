import React, { PropsWithChildren, useState } from "react"
import { Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, alpha } from "@material-ui/core"
import clsx from "clsx"
import { Page as PageType } from "../pdfManager"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    cursor: "grab",
  },
  dragged: {
    opacity: 0.25,
  },
  draggedOver: {
    paddingLeft: theme.spacing(10),
  },
  page: {
    margin: theme.spacing(1),
  },
  actions: {
    position: "absolute",
    top: 0,
    right: 0,
    background: alpha(theme.palette.common.black, 0.75),
    borderRadius: theme.spacing(1),
  }
}))

type Props = PropsWithChildren<{ page: PageType, onDrop?: (droppedPage: PageType) => void }>

const PDFPage = ({ page, onDrop, children }: Props) => {
  const classes = useStyles()

  const [isDragged, setIsDragged] = useState(false)
  const [isEntered, setIsEntered] = useState(0)

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.dragged]: isDragged,
        [classes.draggedOver]: isEntered,
      })}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.dropEffect = onDrop ? "move" : "copy"
        e.dataTransfer.setData('page', JSON.stringify(page))
        setIsDragged(true)
      }}
      onDragEnd={() => setIsDragged(false)}

      onDragEnter={onDrop ? (e) => {
        e.preventDefault()
        setIsEntered(prevCount => prevCount + 1)
      } : undefined}
      onDragLeave={onDrop ? (e) => {
        e.preventDefault()
        setIsEntered(prevCount => prevCount - 1)
      } : undefined}
      onDrop={onDrop ? (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsEntered(0)
        
        onDrop(JSON.parse(e.dataTransfer.getData('page')))
      } : undefined}
    >
      <Page
        className={classes.page}
        pageNumber={page.sourcePage+1}
        width={100}
        renderAnnotationLayer={false}
        renderInteractiveForms={false}
        renderTextLayer={false}
      />
      <div className={classes.actions}>
        {children}
      </div>
    </div>
  )
}

export default PDFPage
