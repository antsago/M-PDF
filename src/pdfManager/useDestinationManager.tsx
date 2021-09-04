import { useCallback, useState } from "react"
import { PDFDocument } from 'pdf-lib'
import { InsertPage, Destination } from './types'

const useDestinationManager = (getSource) => {
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

  const insertPage = useCallback<InsertPage>(async (page, sourceFile, e) => {
    e.stopPropagation()
    setDestination((prevDestination) => [...prevDestination, { sourceId: sourceFile.id, sourcePage: page }])
  }, [])

  return {
    destination,
    downloadDestination,
    insertPage,
  }
}

export default useDestinationManager
