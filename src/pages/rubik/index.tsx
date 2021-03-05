/*
 * @Author: lyf
 * @Date: 2021-02-01 10:49:32
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-05 19:10:11
 * @Description: 3D魔方
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/pages/rubik/index.tsx
 */
import React, { useEffect, useRef } from 'react'
import { createStats } from '@utils/help'
import { Vector3 } from 'three'
// import Stats from 'three/examples/jsm/libs/stats.module.js'

interface Cache {
  origin: Vector3 /* 魔方原点 */
  steps: number /* 阶 */
  len: number /* 阶长 */
}

const Rubik = () => {
  const ref = useRef<HTMLDivElement>(null)
  const cache = useRef<Cache>({ steps: 3, len: 50, origin: new Vector3(0, 0, 0) })

  useEffect(() => {
    const dom = ref.current as HTMLElement
    const stats = createStats({ dom })

  }, [])

  return (
    <div className="rubik"></div>
  )
}

export default Rubik
