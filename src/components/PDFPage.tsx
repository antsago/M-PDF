import React, { PropsWithChildren } from "react"
import { Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, alpha } from "@material-ui/core"
import clsx from "clsx"
import { Page as PageType } from "../pdfManager"
import { usePageDrag, usePageDrop } from "./usePageDaD"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    cursor: "grab",
  },
  dragged: {
    opacity: 0.1,
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
  const classes = useStyles(!!onDrop)

  const { isDragged, draggableProps } = usePageDrag(page, !!onDrop)
  const { isEntered, droppableProps } = usePageDrop(onDrop, "id" in page && page.id)

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.dragged]: isDragged,
        [classes.draggedOver]: isEntered,
      })}
      {...draggableProps}
      {...droppableProps}
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
