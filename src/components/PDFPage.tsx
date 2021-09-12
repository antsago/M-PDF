import React, { PropsWithChildren, useState } from "react"
import { Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, alpha } from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    cursor: "grab",
  },
  dragged: {
    opacity: 0.25,
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

type Props = PropsWithChildren<{ page: number, sourceId: string }>

const PDFPage = ({ page, sourceId, children }: Props) => {
  const classes = useStyles()

  const [isDragged, setIsDragged] = useState(false)

  return (
    <div
      className={clsx({ [classes.root]: true, [classes.dragged]: isDragged })}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.dropEffect = "copy"
        e.dataTransfer.setData('page', String(page))
        e.dataTransfer.setData('sourceId', sourceId)
        setIsDragged(true)
      }}
      onDragEnd={() => setIsDragged(false)}
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
