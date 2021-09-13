import React, { useState } from "react"
import { useIntl } from "react-intl"
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import { Typography, makeStyles } from "@material-ui/core"
import { Close as DeleteIcon } from "@material-ui/icons"
import { usePdfManager } from "../pdfManager"
import Masonry from "./Masonry"
import PDFPage from "./PDFPage"
import PageActionButton from "./PageActionButton"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  message: {
    margin: `0px auto`,
    padding: theme.spacing(2),
  }
}))

const Destination = () => {
  const intl = useIntl()
  const classes = useStyles()
  const { destination, getSource, deletePage, insertPage } = usePdfManager()

  return (
    <Masonry
      className={classes.root}
      onDrop={(e) => {
        e.preventDefault()
        insertPage({
          sourcePage: Number(e.dataTransfer.getData("page")),
          sourceId: e.dataTransfer.getData("sourceId"),
        })
      }}
    >
      {destination?.map((destinationPage, pageIndex) => (
        <Document
          key={destinationPage.id}
          file={getSource(destinationPage.sourceId).content}
          onLoadError={(error) => console.log(error)}
        >
          <PDFPage
            page={destinationPage}
            onDrop={(droppedPage) => {
              insertPage(droppedPage, pageIndex)
            }}
          >
            <PageActionButton action={() => deletePage(pageIndex)} title={intl.formatMessage({ defaultMessage: "Delete page" })}>
              <DeleteIcon />
            </PageActionButton>
          </PDFPage>
        </Document>
      ))}
      {!destination?.length && (
        <Typography component="p" variant="body2" align="center" className={classes.message}>
          {intl.formatMessage({ defaultMessage: "No page added to destination. Use the plus buttons or drag the pages across to add them to the destination pdf." })}
        </Typography>
      )}
    </Masonry>
  )
}

export default Destination
