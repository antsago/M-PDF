import { useState, useCallback } from "react"
import { Source } from './types'
import { useRef } from "react"

const useSourceManager = () => {
  const [sources, setSources] = useState<Source[]>([])
  const sourceDictionary = useRef<{ [id: string]: Source }>({})

  const addSource = useCallback(
    (newSource: Source) => {
      sourceDictionary.current = {
        ...sourceDictionary.current,
        [newSource.id]: newSource,
      }
      setSources((oldSources) => [newSource, ...oldSources])
    },
    [],
  )
  const getSource = useCallback<(string) => Source>(
    (sourceId) => sourceDictionary.current[sourceId],
    [],
  )

  return { sources, addSource, getSource }
}

export default useSourceManager
