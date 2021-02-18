/*
 * @Author: lyf
 * @Date: 2021-02-01 19:26:11
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-18 20:02:42
 * @Description: 动画 和 雾化
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-three/case2/index.tsx
 */
import React, { useEffect, useRef } from 'react';
import { createStats, randInt } from '@utils/help';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Fog,
  AmbientLight,
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  Group,
  Color
} from 'three';

const ThreeCase2 = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = {
      cache: {} as Group,
      addCube,
      delCube,
      reset() {
        group.children = []
        group.copy(controller.cache)
      }
    }
    // fps展示
    const dom = ref.current as HTMLElement
    const stats = createStats({ dom })

    // 控制操作
    const gui = new GUI()
    gui.addFolder('操作')
    gui.add(controller, 'addCube')
    gui.add(controller, 'delCube')
    gui.add(controller, 'reset')

    // 渲染
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight) // 屏幕宽度
    renderer.setClearColor(new Color(0xeeeeee)) // 屏幕背景
    renderer.setPixelRatio(window.devicePixelRatio) // 设置设备像素比。避免HiDPI设备上绘图模糊
    dom.appendChild(renderer.domElement)

    // 像机
    const camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    camera.position.set(-20, 30, 20)
    camera.up.set(0, 1, 0)
    camera.lookAt(0,0,0)

    // 场景
    const scene = new Scene()
    scene.fog = new Fog(0xffffff, 0.1, 40) // 雾化

    // 光照
    const light = new AmbientLight(0x404040)
    scene.add(light)
    
    const group = new Group()
    scene.add(group)

    function addCube () {
      const geom = new BoxGeometry(randInt(3), randInt(3), randInt(3))
      const mesh = new Mesh(geom, new MeshLambertMaterial({ color: Math.random() * 0xffffff }))

      mesh.position.x = -30 + randInt(60)
      mesh.position.y = randInt(5)
      mesh.position.z = -20 + randInt(40)

      group.add(mesh)
    }

    function delCube () {
      const len = group.children.length
      const i = randInt(len) - 1
      group.remove(group.children[i])
    }

    // 添加100个物体
    for (let i = 0; i < 100; i++) {
      addCube()
    }

    // 缓存数据
    controller.cache = group.clone() as Group

    function animate () {
      renderer.render(scene, camera)
      stats.update()

      // 动画
      scene.traverse((e) => {
        if (e instanceof Mesh) {
          e.position.x += 0.01;
          e.position.y += 0.01;
          e.position.z += 0.01;
        }
      })

      requestAnimationFrame(animate);
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

export default ThreeCase2
