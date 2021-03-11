/*
 * @Author: lyf
 * @Date: 2021-03-11 20:35:24
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-11 20:51:10
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/pages/webrtc/index.tsx
 */
import React, { useEffect, useRef } from 'react'

const WebRtc = () => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    var constraints = {
      audio: false,
      video: true
    }
    const video = ref.current as HTMLVideoElement

    navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
        var videoTracks = stream.getVideoTracks();
        console.log('Got stream with constraints:', constraints);
        console.log('Using video device: ' + videoTracks[0].label);
        video.srcObject = stream;
      })
      .catch(function(error) {
        if (error.name === 'PermissionDeniedError') {
          console.log('Permissions have not been granted to use your camera and ' +
          'microphone, you need to allow the page access to your devices in ' +
          'order for the demo to work.')
        }
        console.log('getUserMedia error: ' + error.name, error);
      });
  }, [])

  return (
    <div>
      <video id="localVideo" autoPlay playsInline controls ref={ref} style={{ width: '100%' }}/>
    </div>
  )
}

export default WebRtc
