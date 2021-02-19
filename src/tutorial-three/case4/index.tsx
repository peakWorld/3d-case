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
  DirectionalLight,
  BoxGeometry,
  PlaneGeometry,
  SphereGeometry,
  MeshLambertMaterial,
  MeshNormalMaterial,
  Mesh,
  Color,
  Vector3,
  AxesHelper,
  ArrowHelper,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'


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
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setScissorTest(true) // 开启剪裁检测
    dom.appendChild(renderer.domElement)

    function sceneTop () {
      // 相机
      const camera = new PerspectiveCamera(45, w / hh, 0.1, 1000)
      camera.position.set(30, 30, 30)
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0)
      const control = new OrbitControls(camera, renderer.domElement)

      // 场景
      const scene = new Scene()
      const axesHelper = new AxesHelper( 20 )
      scene.add( axesHelper )

      // 光线
      const ambient = new AmbientLight(0x404040)
      scene.add(ambient)
      const light = new DirectionalLight(0xffffff)
			light.position.set( 0, 0, 1 )
      scene.add(light)
      
      // 物体
      const box = new Mesh(
        new BoxGeometry(4, 4, 4),
        new MeshLambertMaterial({ color: 0xff0000 })
      )
      scene.add(box)

      return { scene, camera, control }
    }

    function sceneBottom () {
      // 相机
      const camera = new PerspectiveCamera(45, w / hh, 0.1, 1000)
      camera.position.set(20, 40, 30)
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0)
      const control = new OrbitControls(camera, renderer.domElement)

      // 场景
      const scene = new Scene()
      const axesHelper = new AxesHelper( 20 );
      scene.add( axesHelper );

      // 光线
      const ambient = new AmbientLight(0x404040)
      scene.add(ambient)
      const light = new DirectionalLight(0xffffff)
			light.position.set(1, 1, 1)
      scene.add(light)
      
      // 物体
      const sphere = new Mesh(
        new SphereGeometry( 4, 20, 20 ),
        new MeshNormalMaterial()
      )
      scene.add(sphere)
      // const normal = sphere.geometry.getAttribute('normal')
      // const position = sphere.geometry.getAttribute('position')
      // for (let i = 0; i < normal.count; i++) {
      //   const hVec = new Vector3(normal.getX(i), normal.getX(i), normal.getX(i))
      //   const hPos = new Vector3(position.getX(i), position.getX(i), position.getX(i))
      //   const arrow = new ArrowHelper(hVec.normalize(), hPos, 2, 0x3333ff, 0.5, 0.5)
      //   scene.add(arrow)
      // }
      const helper = new VertexNormalsHelper(sphere, 2, 0x00ff00)
      scene.add(helper)
      return { scene, camera, control, helper }
    }

    const top = sceneTop()
    const bottom = sceneBottom()

    // 动画
    function animate () {
      stats.update()
      top.control.update()
      bottom.control.update()
      bottom.helper.update()
      
      // 渲染上半屏
      renderer.setScissor(0, hh, w, hh)
      renderer.setViewport(0, hh, w, hh)
      renderer.setClearColor(0xBCD48F, 1);
      renderer.render(top.scene, top.camera)

      // 渲染下半屏
      renderer.setScissor(0, 0, w, hh)
      renderer.setViewport(0, 0, w, hh)
      renderer.setClearColor(0x8FBCD4, 1);
      renderer.render(bottom.scene, bottom.camera)

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
