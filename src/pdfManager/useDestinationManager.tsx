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
    async (page, insertIndex) => {
      const newPage = "id" in page ? page : createPage(page)

      setDestination((prevDestination) => {
        if ([null, undefined].includes(insertIndex)) {
          return [...prevDestination, newPage]
        } else {
          const newDestination = [...prevDestination]
          newDestination.splice(insertIndex, 0, newPage)
          return newDestination
        }
      })
    },
    [],
   )

  const deletePage = useCallback<DeletePage>(
    async (pageIndex) =>
      setDestination((prevDestination) => {
        const newDestination = [...prevDestination]
        newDestination.splice(pageIndex, 1)
        return newDestination
      }),
    [],
  )

  return {
    destination,
    downloadDestination,
    insertPage,
    deletePage,
  }
}

export default useDestinationManager
