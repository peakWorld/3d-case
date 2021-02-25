/*
 * @Author: lyf
 * @Date: 2021-02-25 14:56:15
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-25 15:58:14
 * @Description: render props 函数
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-react/case2/index.tsx
 */
import React, { useCallback, useEffect } from 'react'
import Mouse from './mouse'

const Case2 = () => {

  useEffect(() => {
    console.log('Case2 useEffect...')
  }, [])
  console.log('Case2...')

  const render = useCallback(({ x, y }) => <div>x: {x}, y: {y}</div>, [])
  return <Mouse render={render}/>
}

export default Case2