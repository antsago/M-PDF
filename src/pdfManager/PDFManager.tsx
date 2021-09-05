import React, { createContext, useContext, createRef, useCallback } from "react"
import { PDFContext, DropRef, TriggerUpload } from './types'
import useSourceManager from './useSourceManager'
import useDestinationManager from './useDestinationManager'

const pdfContext = createContext<PDFContext>(null)

export const usePdfManager = () => useContext(pdfContext)

export const Provider = ({ children }) => {
  const dropRef = createRef<DropRef>()
  const triggerUpload = useCallback<TriggerUpload>(() => dropRef?.current?.open(), [])

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
        dropRef,
        triggerUpload,
      }}
    >
      {children}
    </pdfContext.Provider>
  )
}
