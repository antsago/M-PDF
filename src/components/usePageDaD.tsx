import { useState } from "react"
import { Page } from "../pdfManager"

const PAGE_KEY = "page"

export const usePageDrop = (onDrop?: (droppedPage: Page) => void, filterId?: string) => {
  const [isEntered, setIsEntered] = useState(0)

  if (!onDrop) {
    return {}
  }

  const onDropWrapper = (wrappedFunction) => (e) => {
    if (!e.dataTransfer.types.includes(PAGE_KEY)) {
      return
    }

    e.preventDefault()
    e.stopPropagation()
    
    if (!filterId || !e.dataTransfer.types.includes(filterId)) {
      wrappedFunction(e)
    }
  }

  const droppableProps = {
    onDragEnter: onDropWrapper(() => setIsEntered(prevCount => prevCount + 1)),
    onDragLeave: onDropWrapper(() => setIsEntered(prevCount => prevCount - 1)),
    onDrop: onDropWrapper((e) => {
      setIsEntered(0)
      const pageDropped = JSON.parse(e.dataTransfer.getData(PAGE_KEY))
      onDrop(pageDropped)
    }),
  }

  return {
    droppableProps,
    isEntered,
  }
}

export const usePageDrag = (page: Page, isDestination: boolean) => {
  const [isDragged, setIsDragged] = useState(false)

  const draggableProps = {
    draggable: true,
    onDragStart: (e) => {
      e.dataTransfer.dropEffect = isDestination ? "move" : "copy"
      e.dataTransfer.setData(PAGE_KEY, JSON.stringify(page))

      if ("id" in page) {
        e.dataTransfer.setData(page.id, "")
      }
      setIsDragged(true)
    },
    onDragEnd: () => setIsDragged(false),
  }

  return {
    draggableProps,
    isDragged,
  }
}
