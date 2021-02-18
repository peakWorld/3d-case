/*
 * @Author: lyf
 * @Date: 2021-02-02 16:54:55
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-18 20:13:41
 * @Description: 阴影 和 纹理
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-three/case3/index.tsx
 */
import React, { useEffect, useRef } from 'react'
import { createStats } from '@utils/help'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  SpotLight,
  BoxGeometry,
  PlaneGeometry,
  SphereGeometry,
  MeshLambertMaterial,
  Mesh,
  Color,
  AxesHelper
} from 'three';

const ThreeCase3 = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dom = ref.current as HTMLDivElement
    const stats = createStats({ dom })
    
    // 渲染
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(new Color(0xeeeeee), 0.5)
    renderer.setPixelRatio(window.devicePixelRatio)
    dom.appendChild(renderer.domElement)

    // 相机
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(-30, 40, 30)
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0)

    // 场景
    const scene = new Scene()
    const axesHelper = new AxesHelper( 20 );
    scene.add( axesHelper );

    // 光线
    const ambient = new AmbientLight(0x404040)
    const spot = new SpotLight(0xffffff)
    spot.position.set(-40, 60, 10)
    spot.castShadow = true
    scene.add(ambient)
    scene.add(spot)

    // 物体导入
    const plane = new Mesh(
      new PlaneGeometry(60, 20, 1, 1),
      new MeshLambertMaterial({ color: 0xcccccc })
    )
    plane.rotateX(-Math.PI / 2)
    plane.position.set(15, 0, 0)
    plane.receiveShadow = true

    const box = new Mesh(
      new BoxGeometry(4, 4, 4),
      new MeshLambertMaterial({ color: 0xff0000 })
    )
    box.position.set(-4, 3, 0)
    box.castShadow = true

    const sphere = new Mesh(
      new SphereGeometry( 4, 20, 20 ),
      new MeshLambertMaterial({ color: 0x7777ff })
    );
    sphere.position.set(20,4,2)
    sphere.castShadow = true

    scene.add(box)
    scene.add(plane)
    scene.add(sphere)

    function animate () {
      renderer.render(scene, camera)
      stats.update()

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div ref={ref}></div>
  )
}

export default ThreeCase3
