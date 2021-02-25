/*
 * @Author: lyf
 * @Date: 2021-02-25 15:10:52
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-25 15:58:27
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-react/case2/mouse.tsx
 */
import React, { useEffect, useState, memo } from 'react'

interface MouseProps {
  render(state: MouseState): React.ReactElement
}

interface MouseState {
  x: number
  y: number
}

const Mouse = ({ render }: MouseProps) => {
  const [state, setState] = useState<MouseState>({ x: 0, y: 0 })

  useEffect(() => {
    const handleTouch = (evt: TouchEvent) => {
      const { pageX, pageY } = evt.touches[0]
      setState({ x: pageX, y: pageY })
    }

    window.addEventListener('touchstart', handleTouch , false)
    window.addEventListener('touchmove', handleTouch, false)

    return () => {
      window.removeEventListener('touchstart', handleTouch, false)
      window.removeEventListener('touchmove', handleTouch, false)
    }
  }, [])
  
  useEffect(() => {
    console.log('Mouse useEffect...')
  }, [render])

  console.log('Mouse...')

  return render(state)
}

export default memo(Mouse)