/*
 * @Author: lyf
 * @Date: 2021-02-02 16:54:55
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-03 16:41:10
 * @Description: 
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-three/case3/index.tsx
 */
import React, { useEffect, useRef } from 'react'
import { createStats } from '@utils/help'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  AxesHelper
} from 'three';

const ThreeCase3 = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dom = ref.current as HTMLDivElement
    const stats = createStats({ dom })
    console.log(dom)
  }, [])

  return (
    <div ref={ref}></div>
  )
}

export default ThreeCase3
