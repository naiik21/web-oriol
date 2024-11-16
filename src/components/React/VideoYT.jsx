import React from 'react'
import ReactPlayer from 'react-player'

function VideoYT() {
  return (
    <ReactPlayer
      url='https://www.youtube.com/watch?v=7rtRrJwjF9c'
      playing={true} // Autoplay
      controls={false} // Sin controles
      muted={true} // Silenciado
      loop={true} // En bucle
      width='640px'
      height='390px'
    />
  )
}

export default VideoYT
