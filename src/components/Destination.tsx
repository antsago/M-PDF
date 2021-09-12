import React from "react"
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import PDFPage from "./PDFPage"
import Masonry from "./Masonry"
import { usePdfManager } from "../pdfManager"

const Destination = () => {
  const { destination, getSource } = usePdfManager()

  return (
    <Masonry>
      {destination?.map((destinationPage, pageIndex) => (
        <Document
          key={pageIndex}
          file={getSource(destinationPage.sourceId).content}
        >
          <PDFPage page={destinationPage.sourcePage} />
        </Document>
      ))}
    </Masonry>
  )
}

export default Destination
