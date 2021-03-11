/*
 * @Author: lyf
 * @Date: 2021-02-01 10:49:32
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-11 20:23:44
 * @Description: 点变化
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/pages/points/index.tsx
 */
import React, { useEffect, useRef } from 'react'
import { createStats } from '@utils/help'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  MeshNormalMaterial,
  Mesh,
  Box3
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Utils from './utils'

const RubikCase = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dom = ref.current as HTMLDivElement
    const stats = createStats({ dom })

    async function init () {
      // 渲染
      const renderer = new WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor('#fff')
      renderer.setPixelRatio(window.devicePixelRatio)
      dom.appendChild(renderer.domElement)

      // 相机
      const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
      camera.position.set(0, 0, 30)
      camera.up.set(0, 1, 0)
      camera.lookAt(0, 0, 0)
      const control = new OrbitControls(camera, renderer.domElement)

      // 场景
      const scene = new Scene()

      // 物体
      const geometry = await Utils.createGeometry('0123456789')
      const material = new MeshNormalMaterial()
      const mesh = new Mesh(geometry, material)

      // 文字居中
      geometry.computeBoundingBox()
      const { max, min } = geometry.boundingBox as Box3
      const offsetX = (max.x - min.x) / 2
      mesh.position.setX(-offsetX)

      // 操作
      let i = 0, len = geometry.groups.length
      setInterval(() => {
        if (i < len) {
          const { start, count, materialIndex } = geometry.groups[i]
          if (!materialIndex) {
            geometry.setDrawRange(start, count)
          }
          i++
        } else {
          i = 0
        }
      }, 200)

      scene.add(mesh)

      function tick () {
        stats.update()
        control.update() 
  
        renderer.render(scene, camera)
        
        requestAnimationFrame(tick)
      }
  
      tick()
    }

    init()
  }, [])

  return (
    <div className="rubik" ref={ref}></div>
  )
}

export default RubikCase
