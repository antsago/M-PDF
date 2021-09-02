import React, { useState } from "react"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { PDFFile } from "./Types"

const PDF = ({ file }: { file: PDFFile }) => {
  const [pages, setPages] = useState([])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(Array.from({ length: numPages }, (v, i) => i + 1));
  }

  if (!file) {
    return null
  }

  return (
    <Document
      file={file.content}
      onLoadError={(error) => console.log(error)}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {pages?.map((page) => (
        <Page pageNumber={page} key={page} />
      ))}
    </Document>
  )
}

export default PDF
