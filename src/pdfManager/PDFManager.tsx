import React, { createContext, useContext } from "react"
import { PDFContext } from './types'
import useSourceManager from './useSourceManager'
import useDestinationManager from './useDestinationManager'

const pdfContext = createContext<PDFContext>(null)

export const usePdfManager = () => useContext(pdfContext)

export const Provider = ({ children }) => {
  const { sources, addSource, getSource } = useSourceManager()
  const { destination, insertPage, downloadDestination } = useDestinationManager(getSource)

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
