import React, { createContext, useContext, createRef } from "react"
import { PDFContext, DropRef } from './types'
import useSourceManager from './useSourceManager'
import useDestinationManager from './useDestinationManager'

const pdfContext = createContext<PDFContext>(null)

export const usePdfManager = () => useContext(pdfContext)

export const Provider = ({ children }) => {
  const dropRef = createRef<DropRef>()
  const triggerUpload = () => dropRef?.current?.open()

  const { sources, addSource, getSource } = useSourceManager()
  const { destination, insertPage, deletePage, downloadDestination } = useDestinationManager(getSource)
  return (
    <pdfContext.Provider
      value={{
        sources,
        addSource,
        getSource,
        destination,
        downloadDestination,
        insertPage,
        deletePage,
        dropRef,
        triggerUpload,
      }}
    >
      {children}
    </pdfContext.Provider>
  )
}
