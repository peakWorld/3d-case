/*
 * @Author: lyf
 * @Date: 2021-02-25 16:43:06
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-25 17:21:25
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-react/case3/showX.tsx
 */
import React, { useContext, useMemo, memo, useEffect } from 'react'
import Context from './constants'

const ShowX = () => {
  const { x, addX } = useContext(Context)

  useEffect(() => {
    console.log('showX useEffect...')
  }, [addX])

  console.log('showX')

  return useMemo(() => (
    <div>
      <div>x: {x}</div>
      <button onClick={addX}>addX</button>
    </div>
  ), [x])
}

export default memo(ShowX)