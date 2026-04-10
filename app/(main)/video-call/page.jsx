import React from 'react'
import VideoCall from './video-call'

const VideoCallPage = async ({ searchParams }) => {
    const params = await searchParams;
    const sessionId = params.sessionId;
    const token = params.token;
  return (
    <VideoCall sessionId={sessionId} token={token} />
  )
}

export default VideoCallPage