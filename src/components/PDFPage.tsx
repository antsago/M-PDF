import React, { PropsWithChildren } from "react"
import { Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  page: {
    margin: theme.spacing(1),
  }
}))

type Props = PropsWithChildren<{ page: number }>

const PDFPage = ({ page, children }: Props) => {
  const classes = useStyles()

  return (
    <div>
      <Page
        className={classes.page}
        pageNumber={page+1}
        width={100}
        renderAnnotationLayer={false}
        renderInteractiveForms={false}
        renderTextLayer={false}
      />
      {children}
    </div>
  )
}

export default PDFPage
