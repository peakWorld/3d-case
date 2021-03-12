/*
 * @Author: lyf
 * @Date: 2021-03-12 10:29:00
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-12 19:14:47
 * @Description: 碰撞
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/pages/collision/index.tsx
 */
import React, { useRef, useEffect } from 'react'
import { createStats } from '@utils/help'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  BoxGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  Vector3,
  Clock
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Utils from './utils'

const Collision = () => {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const dom = ref.current as HTMLDivElement
    const stats = createStats({ dom })

    // 渲染器
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(new Color(0xeeeeee), 0.5)
    renderer.setPixelRatio(window.devicePixelRatio)
    dom.appendChild(renderer.domElement)

    // 相机
    const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 300)
    camera.up.set(0, 1, 0)
    camera.lookAt(0, 0, 0)
    const control = new OrbitControls(camera, renderer.domElement)

    // 场景
    const scene = new Scene()

    // 光线
    const ambient = new AmbientLight(0x404040)
    scene.add(ambient)

    // 物体
    const len = 50
    const boxes: Mesh[] = []

    const box = new Mesh(
      new BoxGeometry(len * 2, len * 2, len * 2),
      new MeshBasicMaterial({ wireframe: true })
    )
    scene.add(box)
    
    for (let i = 0; i < 200; i++) {
      const mesh = new Mesh(
        new SphereGeometry(2, 24, 24),
        new MeshBasicMaterial()
      )
      const x = Math.random() * 96 - 48
      const y = Math.random() * 96 - 48
      const z = Math.random() * 96 - 48
      mesh.position.set(x, y, z)
      mesh.name = 'cube'
      boxes.push(mesh)
      scene.add(mesh)
    } 

    Utils.setBoundingBox(len, boxes)

    const clock = new Clock()
    // 动画
    function animate () {
      const delta = clock.getDelta()
      stats.update()
      control.update()
      renderer.render(scene, camera)

      scene.traverse((obj) => {
        if (obj.name === 'cube') {
          const dir = new Vector3(
            Math.random() > 0.5 ? 1 : -1,
            Math.random() > 0.5 ? 1 : -1,
            Math.random() > 0.5 ? 1 : -1
          )
          obj.translateOnAxis(
            dir.normalize(),
            Math.sin(delta) * Math.random() + Math.cos(delta) * Math.random()
          )
        }
      })

      const crossBoxes = Utils.render(boxes)
      if (crossBoxes.length) {
        crossBoxes.forEach((box) => {
          const material = box.material as MeshBasicMaterial
          material.color.setHex(0xffffff * Math.random())
        })
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      const gui = document.querySelector('.dg.ac')
      gui && gui.remove()
    }
  }, [])

  return (
    <div ref={ref}></div>
  )
}

export default Collision