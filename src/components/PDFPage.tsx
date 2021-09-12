import React, { PropsWithChildren } from "react"
import { Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles, alpha } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative"
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

type Props = PropsWithChildren<{ page: number }>

const PDFPage = ({ page, children }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
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
