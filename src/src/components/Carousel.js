import React, { useEffect, useRef, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

const Carousel = ({ children }) => {
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

  // Carousel scroll functions
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

  return (
    <div className='embla'>
      <button className='embla_button' onClick={scrollPrev}>
        {'<'}
      </button>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>{children}</div>
      </div>
      <button className='embla_button' onClick={scrollNext}>
        {'>'}
      </button>
    </div>
  )
}

export default Carousel
