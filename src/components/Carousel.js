import React, { useEffect, useRef, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { createPortal } from 'react-dom'

const Carousel = ({ children, onDragEnd, droppableId }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: 1 })
  const emblaApiRef = useRef(emblaApi)

  useEffect(() => {
    emblaApiRef.current = emblaApi
  }, [emblaApi])

  useEffect(() => {
    if (emblaApiRef.current) {
      emblaApiRef.current.reInit()
    }
  }, [children])

  const scrollPrev = useCallback(() => {
    if (emblaApiRef.current) {
      emblaApiRef.current.scrollPrev()
    }
  }, [emblaApiRef])

  const scrollNext = useCallback(() => {
    if (emblaApiRef.current) {
      emblaApiRef.current.scrollNext()
    }
  }, [emblaApiRef])

  const DraggablePortal = ({ provided, children }) => {
    if (provided.draggableProps.style.position === 'fixed') {
      return createPortal(children, document.getElementById('draggable'))
    }
    return children
  }

  return (
    <div className='embla'>
      <button className='embla_button' onClick={scrollPrev}>
        {'<'}
      </button>
      <div className='embla__viewport' ref={emblaRef}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={droppableId} index={droppableId.index} direction='horizontal'>
            {provided => (
              <div className='embla__container' ref={provided.innerRef} {...provided.droppableProps}>
                {React.Children.map(children, (child, index) => (
                  <Draggable key={child.key} draggableId={child.key} index={index}>
                    {(provided, snapshot) => (
                      <DraggablePortal provided={provided}>
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          {child}
                        </div>
                      </DraggablePortal>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <button className='embla_button' onClick={scrollNext}>
        {'>'}
      </button>
    </div>
  )
}

export default Carousel
