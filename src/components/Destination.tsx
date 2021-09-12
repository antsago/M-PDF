import React from "react"
import { useIntl } from "react-intl"
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import { Close as DeleteIcon } from "@material-ui/icons"
import { usePdfManager } from "../pdfManager"
import Masonry from "./Masonry"
import PDFPage from "./PDFPage"
import PageActionButton from "./PageActionButton"

const Destination = () => {
  const intl = useIntl()
  const { destination, getSource, deletePage } = usePdfManager()

  return (
    <Masonry>
      {destination?.map((destinationPage, pageIndex) => (
        <Document
          key={pageIndex}
          file={getSource(destinationPage.sourceId).content}
          onLoadError={(error) => console.log(error)}
        >
          <PDFPage page={destinationPage.sourcePage}>
            <PageActionButton action={() => deletePage(pageIndex)} title={intl.formatMessage({ defaultMessage: "Delete page" })}>
              <DeleteIcon />
            </PageActionButton>
          </PDFPage>
        </Document>
      ))}
    </Masonry>
  )
}

export default Destination
