import React, { useCallback, useState } from "react"
import { PDFDocument } from 'pdf-lib'
import { OnInsert, Destination } from './Types'
import useSourceManager from './useSourceManager'
import { createContext } from "react"
import { useContext } from "react"

const pdfContext = createContext(null)

export const PDFManager = ({ children }) => {
  const { sources, addSource, getSource } = useSourceManager()
  const [destination, setDestination] = useState<Destination>([])

  const downloadDestination = useCallback(async () => {
    const destinationPdf = await PDFDocument.create()
    await Promise.all(destination.map(async (pageConfig, pageIndex) => {
      const sourcePdf = await PDFDocument.load(getSource(pageConfig.sourceId).content)
      const [copiedPage] = await destinationPdf.copyPages(sourcePdf, [pageConfig.sourcePage])
      destinationPdf.insertPage(pageIndex, copiedPage)
    }))

    const linkTag = document.createElement('a')
    linkTag.href = await destinationPdf.saveAsBase64({ dataUri: true })
    linkTag.download = "created-with-m-pdf.pdf"
    linkTag.click()
  }, [destination])

  const insertPage = useCallback<OnInsert>(async (page, sourceFile, e) => {
    e.stopPropagation()
    setDestination((prevDestination) => [...prevDestination, { sourceId: sourceFile.id, sourcePage: page }])
  }, [])

  return (
    <pdfContext.Provider
      value={{
        sources,
        addSource,
        getSource,
        destination,
        downloadDestination,
        insertPage,
      }}
    >
      {children}
    </pdfContext.Provider>
  )
}

export const usePdfManager = () => useContext(pdfContext)
