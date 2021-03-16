/*
 * @Author: lyf
 * @Date: 2021-02-01 19:26:11
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-16 19:16:48
 * @Description: 雾化 和 选中
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-three/case3/index.tsx
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
  Color,
  Vector2,
  Material,
  Raycaster
} from 'three';

const ThreeCase3 = () => {
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
    const light = new AmbientLight(0xffffff)
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

    // 选中物体
    const raycaster = new Raycaster()
    
    // 坐标归一化
    function normalVector (x: number, y: number) {
      const nx = ( x / window.innerWidth ) * 2 - 1
      const ny = - ( y / window.innerHeight ) * 2 + 1
      return new Vector2(nx, ny)
    }

    const handleTouchStart = (evt: TouchEvent) => {
      const { clientX, clientY } = evt.touches[0]
      raycaster.setFromCamera(normalVector(clientX, clientY), camera)
      const intersects = raycaster.intersectObjects(scene.children, true)
      if (intersects.length && intersects[0].object.type === 'Mesh') {
        const mesh = (intersects[0].object as Mesh)
        const material = mesh.material as MeshLambertMaterial
        material.color.setHex(0xff0000)
        console.log(mesh)
      }
    }

    window.addEventListener('touchstart', handleTouchStart, false);

    return () => {
      const gui = document.querySelector('.dg.ac')
      gui && gui.remove()
    }
  }, [])

  return (
    <div ref={ref}></div>
  )
}

export default ThreeCase3
