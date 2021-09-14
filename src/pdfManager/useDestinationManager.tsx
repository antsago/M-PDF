import { useCallback, useState } from "react"
import { PDFDocument } from 'pdf-lib'
import { CreatePage, InsertPage, Destination, DeletePage, DestinationPage } from './types'
import { v4 as uuid } from "uuid"

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
    linkTag.download = "m-pdf.pdf"
    linkTag.click()
  }, [destination])

  const createPage = useCallback<CreatePage>((sourcePage) => ({ ...sourcePage, id: uuid() }), [])

  const insertPage = useCallback<InsertPage>(
    async (page, insertIndex) =>
      setDestination((prevDestination) => {
        const isExistingPage = "id" in page
        const newPage = isExistingPage ? page : createPage(page)
        const newDestination = isExistingPage ? prevDestination.map(p => p.id !== page.id ? p : null) : [...prevDestination]

        if ([null, undefined].includes(insertIndex)) {
          newDestination.push(newPage)
        } else {
          newDestination.splice(insertIndex, 0, newPage)
        }

        return newDestination.filter(p => p)
      }),
    [],
   )

  const deletePage = useCallback<DeletePage>(
    async (pageId) =>
      setDestination((prevDestination) => prevDestination.filter(p => p.id !== pageId)),
    [],
  )

  const resetDestination = useCallback(() => setDestination([]), [])

  return {
    destination,
    downloadDestination,
    insertPage,
    deletePage,
    resetDestination,
  }
}

export default useDestinationManager
