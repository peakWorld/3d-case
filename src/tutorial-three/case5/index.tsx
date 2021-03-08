/*
 * @Author: lyf
 * @Date: 2021-02-19 19:28:39
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-08 16:14:41
 * @Description: 点、popmotion动画、纹理贴图
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-three/case5/index.tsx
 */
import React, { useRef, useEffect } from 'react'
import { animate, steps } from 'popmotion'
import { createStats } from '@utils/help'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  BufferGeometry,
  SphereGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  TextureLoader,
  Points,
  AxesHelper,
  AdditiveBlending,
  Vector3,
  CubeTextureLoader,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import './index.scss'

const ThreeCase5 = () => {
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
      const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(3, 3, 3);
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

      // 点和popmotion动画
      // const geometry = new SphereGeometry(1, 64, 64)
      // const material = new PointsMaterial({ size: 0.01 })
      // const points = new Points(geometry, material)
      // scene.add(points)
      // animate({
      //   from: 0,
      //   to: 1,
      //   duration: 6000,
      //   repeat: Infinity,
      //   repeatType: 'reverse',
      //   ease: steps(30),
      //   onUpdate: pos => {
      //     // material.color.setRGB(pos, pos, pos)
      //     material.color.setHex(0xffffff * pos)
      //   }
      // })

      // 环境贴图
      camera.position.set(20, 20, 20)
      scene.background = new CubeTextureLoader()
        .setPath('/assets/webgl/img/three-case5/parliament/')
        .load([
          'posx.jpg', 'negx.jpg', 'posy.jpg',
          'negy.jpg', 'posz.jpg' , 'negz.jpg'
        ])
      const sphere = new Mesh(
        new SphereGeometry(5, 20, 20),
        new MeshBasicMaterial({ envMap: scene.background })
      )
      scene.add(sphere)
      return { scene, camera, control }
    }

    function sceneBottom () {
      // 相机
      const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      // camera.position.z = 400
      camera.position.set(70, 22, 106)
      camera.up.set(0, 1, 0)
      camera.lookAt(0, 0, 0)
      const control = new OrbitControls(camera, renderer.domElement)
      control.maxZoom = 1.5
      control.minZoom = 0.5

      // 场景
      const scene = new Scene()
      // const axesHelper = new AxesHelper( 20 );
      // scene.add( axesHelper );

      // 光线
      const ambient = new AmbientLight(0x404040)
      scene.add(ambient)

      const textureLoader = new TextureLoader()
      // 雨点
      const textures = [
        textureLoader.load('/assets/webgl/img/three-case5/raindrop-1.png'),
        textureLoader.load('/assets/webgl/img/three-case5/raindrop-2.png'),
        textureLoader.load('/assets/webgl/img/three-case5/raindrop-3.png'),
      ]
      // const textures = [
      //   textureLoader.load('/assets/webgl/img/three-case5/snowflake1.png'),
      //   textureLoader.load('/assets/webgl/img/three-case5/snowflake2.png'),
      //   textureLoader.load('/assets/webgl/img/three-case5/snowflake3.png'),
      //   textureLoader.load('/assets/webgl/img/three-case5/snowflake4.png'),
      //   textureLoader.load('/assets/webgl/img/three-case5/snowflake5.png'),
      // ]
      const geometry = new BufferGeometry()
      const vertices = []
      for (let i = 0, len = 6000 * textures.length; i < len; i++) {
        const x = Math.random() * 400 - 200
        const y = Math.random() * 400 - 200
        const z = Math.random() * 400 - 200
        vertices.push(x, y, z)
      }
      geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))

      for (let i = 0, len = textures.length; i < len; i++) {
        const material = new PointsMaterial({
          color: 0xffffff,
          size: Math.random() * i,
          map: textures[i],
          transparent:true, //开启 blending才能其效果
          blending: AdditiveBlending //除去png黑色背景
        })
        const point = new Points(geometry, material)
        scene.add(point)
      }
      
      return { scene, camera, control }
    }

    const top = sceneTop()
    const bottom = sceneBottom()
    
    // 动画
    function tick () {
      stats.update()
      top.control.update()
      bottom.control.update()

      // 渲染上半屏
      renderer.setScissor(0, hh, w, hh)
      renderer.setViewport(0, hh, w, hh)
      renderer.setClearColor(0xBCD48F, 1);
      renderer.render(top.scene, top.camera)

      // 渲染下半屏
      bottom.scene.traverse((obj) => {
        if (obj instanceof Points) {
          // const res = []
          // const { array, count, itemSize } = obj.geometry.getAttribute('position').clone()
          // for (let i = 0; i < count; i++) {
          //   let y = array[i * itemSize + 1] - Math.random() * 0.3
          //   y = y > -200 ? y : Math.random() * 400 - 200
          //   const vector = new Vector3(
          //     array[i * itemSize],
          //     y,
          //     array[i * itemSize + 2]
          //   )
          //   res.push(vector)
          // }
          // obj.geometry.setFromPoints(res)

          const { array, count, itemSize } = obj.geometry.getAttribute('position')
          const arr = array as Array<number>
          for (let i = 0; i < count; i++) {
            const y = array[i * itemSize + 1] - Math.random() * 0.3
            arr[i * itemSize + 1] = y > -200 ? y : Math.random() * 400 - 200
          }
          obj.geometry.attributes.position.needsUpdate = true
          obj.geometry.setDrawRange(0, Infinity)
        }
      })

      renderer.setScissor(0, 0, w, hh)
      renderer.setViewport(0, 0, w, hh)
      renderer.setClearColor(0xffffff, 0);
      renderer.render(bottom.scene, bottom.camera)

      requestAnimationFrame(tick)
    }

    tick()

    return () => {
      const gui = document.querySelector('.dg.ac')
      gui && gui.remove()
    }
  }, [])

  return (
    <div ref={ref}></div>
  )
}

export default ThreeCase5
