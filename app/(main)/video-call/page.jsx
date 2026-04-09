import React from 'react'

const VideoCallPage = async ({serchparams}) => {
    const {sessionId,token} = await searchParams;
  return (
    <VideoCall sessionId={sessionId} token={token} />
  )
}

export default VideoCallPage