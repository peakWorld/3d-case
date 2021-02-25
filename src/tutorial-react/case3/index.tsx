/*
 * @Author: lyf
 * @Date: 2021-02-25 16:37:45
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-25 17:46:01
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-react/case3/index.tsx
 * 
 * context
 * 1. context的value值改变, 其子孙组建中 使用useContext的组建都会重新渲染(即使该组建被memo函数包裹, 即使该组建的props未改变)
 * 2. 如下: context的value值有函数, 则该函数必须用useCallback包裹, 否则每次渲染都会生成新函数
 */
import React, { useState, useCallback, useMemo } from 'react'
import ShowX from './showX'
import ShowY from './showY'
import Show from './show'
import Context from './constants'

const Case3 = () => {
  const [time, setTime] = useState(Date.now())
  const [state, setState] = useState({ x: 1, y: 1, m: 1 })

  const addX = useCallback(() => {
    // 这种方式, 他在deps中必须有state
    // const { y } = state
    // setState((state) => ({ ...state, y: y + 1 }))

    // 推荐如下方式, 不需要任何deps
    setState(({ x, y, m }) => ({ x: x + 1, y, m }))
  }, [])

  const addY = useCallback(() => {
    setState(({ x, y, m }) => ({ x, y: y + 1, m }))
  }, [])

  const addZ = useCallback(() => {
    setTime(Date.now())
  }, [])

  const handleM = () => {
    setState((state) => ({ ...state, m: state.m + 1 }))
  }

  const value = useMemo(() => ({ ...state, addX, addY, addZ }), [state])

  return (
    <Context.Provider value={value}>
      time: {time}
      <ShowX />
      <ShowY />
      <Show />
      <button onClick={handleM}>加m</button>
    </Context.Provider>
  )
}

export default Case3