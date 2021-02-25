/*
 * @Author: lyf
 * @Date: 2021-02-25 16:43:06
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-25 17:49:46
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-react/case3/showY.tsx
 */
import React, { useContext, useEffect, memo } from 'react'
import Context from './constants'

const ShowY = () => {
  const { y, addY, addZ } = useContext(Context)

  useEffect(() => {
    console.log('showY useEffect...')
  }, [addY])

  console.log('showY')

  return (
    <div>
      <div>y: {y}</div>
      <button onClick={addY}>addY</button>
      <button onClick={addZ}>addZ</button>
    </div>
  )
}

export default memo(ShowY)