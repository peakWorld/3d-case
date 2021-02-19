/*
 * @Author: lyf
 * @Date: 2021-02-19 19:28:39
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-19 19:34:40
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

    // 渲染器
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(new Color(0xeeeeee), 0.5)
    dom.appendChild(renderer.domElement)

    // 相机
    const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(-40, 40, 30)
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

    // 动画
    function animate () {
      renderer.render(scene, camera)
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
