/*
 * @Author: lyf
 * @Date: 2021-02-01 10:49:32
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-10 19:33:14
 * @Description: 3D魔方
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/pages/rubik/index.tsx
 */
import React, { useEffect, useRef } from 'react'
import { createStats } from '@utils/help'
import {
  Vector3,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AxesHelper
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Rubik from './Rubik'

interface Cache {
  origin: Vector3 /* 魔方原点 */
  steps: number /* 阶 */
  len: number /* 阶长 */
}

const RubikCase = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dom = ref.current as HTMLDivElement
    const stats = createStats({ dom })
    const rubik = new Rubik({ size: 3 })

    // 渲染
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('#fff')
    renderer.setPixelRatio(window.devicePixelRatio)
    dom.appendChild(renderer.domElement)

    // 相机
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.set(350, 350, 300)
    camera.up.set(0, 1, 0)
    camera.lookAt(0, 0, 0)
    // const control = new OrbitControls(camera, renderer.domElement)

    // 场景
    const scene = new Scene()
    // const axesHelper = new AxesHelper(200)
    // scene.add( axesHelper )

    // 物体
    const boxes = rubik.models()
    scene.add(boxes)

    // 事件绑定
    const cancelEvent = rubik.bindEvent(camera, scene)

    function tick () {
      stats.update()
      // control.update() 

      renderer.render(scene, camera)
      
      requestAnimationFrame(tick)
    }

    tick()

    return cancelEvent
  }, [])

  return (
    <div className="rubik" ref={ref}></div>
  )
}

export default RubikCase
