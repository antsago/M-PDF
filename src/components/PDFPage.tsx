import React, { PropsWithChildren, useState } from "react"
import { Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, alpha } from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    cursor: "grab",
    "& *": {
      pointerEvents: "none",
    },
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

type Props = PropsWithChildren<{ page: number, sourceId: string, isDestination?: boolean }>

const PDFPage = ({ page, sourceId, isDestination, children }: Props) => {
  const classes = useStyles()

  const [isDragged, setIsDragged] = useState(false)
  const [isEntered, setIsEntered] = useState(false)

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.dragged]: isDragged,
        [classes.draggedOver]: isEntered,
      })}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.dropEffect = "copy"
        e.dataTransfer.setData('page', String(page))
        e.dataTransfer.setData('sourceId', sourceId)
        setIsDragged(true)
      }}
      onDragEnd={() => setIsDragged(false)}
      onDragEnter={isDestination ? (e) => {
        e.preventDefault()
        setIsEntered(true)
      } : undefined}
      onDragLeave={isDestination ? (e) => {
        e.preventDefault()
        setIsEntered(false)
      } : undefined}
    >
      <Page
        className={classes.page}
        pageNumber={page+1}
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
