/*
 * @Author: lyf
 * @Date: 2021-02-19 19:28:39
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-19 20:21:14
 * @Description: 材质 和 分屏
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-three/case4/index.tsx
 */
import React, { useRef, useEffect } from 'react';
import { createStats } from '@utils/help'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  BoxGeometry,
  PlaneGeometry,
  SphereGeometry,
  MeshLambertMaterial,
  Mesh,
  Color,
  AxesHelper,
} from 'three'

const ThreeCase4 = () => {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const dom = ref.current as HTMLDivElement
    const stats = createStats({ dom })
    const w = window.innerWidth
    const h = window.innerHeight
    const hh = Math.ceil(h / 2)

    // 渲染器
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(w, h)
    renderer.setClearColor(new Color(0xeeeeee), 0.5)
    renderer.setPixelRatio(window.devicePixelRatio)
    dom.appendChild(renderer.domElement)

    function sceneTop () {
      // 相机
      const camera = new PerspectiveCamera(45, w / hh, 0.1, 1000)
      camera.position.set(30, 30, 30)
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0)

      // 场景
      const scene = new Scene()
      const axesHelper = new AxesHelper( 20 );
      scene.add( axesHelper );

      // 光线
      const ambient = new AmbientLight(0x404040)
      scene.add(ambient)
      
      // 物体
      const box = new Mesh(
        new BoxGeometry(4, 4, 4),
        new MeshLambertMaterial({ color: 0xff0000 })
      )
      const plane = new Mesh(
        new PlaneGeometry(1000, 1000, 1, 1),
        new MeshLambertMaterial({ color: 0xcccccc })
      )
      scene.add(plane)
      scene.add(box)

      return { scene, camera }
    }

    function sceneBottom () {
      // 相机
      const camera = new PerspectiveCamera(45, w / hh, 0.1, 1000)
      camera.position.set(20, 40, 30)
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0)

      // 场景
      const scene = new Scene()
      const axesHelper = new AxesHelper( 20 );
      scene.add( axesHelper );

      // 光线
      const ambient = new AmbientLight(0x404040)
      scene.add(ambient)
      
      // 物体
      const sphere = new Mesh(
        new SphereGeometry( 4, 20, 20 ),
        new MeshLambertMaterial({ color: 0x7777ff })
      )
      scene.add(sphere)

      return { scene, camera }
    }

    const top = sceneTop()
    const bottom = sceneBottom()

    // 动画
    function animate () {
      renderer.autoClear = false
      renderer.clear()

      // 渲染上半屏
      renderer.setViewport(0, 0, w, hh)
      renderer.setScissor(0, 0, w, hh)

      renderer.render(top.scene, top.camera)

      // 渲染下半屏
      renderer.setViewport(0, hh, w, hh)
      renderer.setScissor(0, hh, w, hh)
      renderer.render(bottom.scene, bottom.camera)
      
      stats.update()

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

export default ThreeCase4
