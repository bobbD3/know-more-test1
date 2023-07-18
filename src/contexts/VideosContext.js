import { createContext, useState } from 'react'
import dummyVideos from '../data/videos'

const VideosContext = createContext()

export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState(dummyVideos)

  return <VideosContext.Provider value={{ videos, setVideos }}>{children}</VideosContext.Provider>
}

export default VideosContext
