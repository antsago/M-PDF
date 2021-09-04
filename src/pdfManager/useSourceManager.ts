import { useState, useCallback } from "react"
import { PDFFile } from './types'
import { useRef } from "react"

const useSourceManager = () => {
  const [sources, setSources] = useState<PDFFile[]>([])
  const sourceDictionary = useRef<{ [id: string]: PDFFile }>({})

  const addSource = useCallback(
    (newSource: PDFFile) => {
      sourceDictionary.current = {
        ...sourceDictionary.current,
        [newSource.id]: newSource,
      }
      setSources((oldSources) => [newSource, ...oldSources])
    },
    [],
  )
  const getSource = useCallback<(string) => PDFFile>(
    (sourceId) => sourceDictionary.current[sourceId],
    [],
  )

  return { sources, addSource, getSource }
}

export default useSourceManager
