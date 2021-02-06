/*
 * @Author: lyf
 * @Date: 2021-02-01 15:24:53
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-01 19:24:40
 * @Description: 基础要素
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-three/case1/index.tsx
 */
import React, { useEffect, useRef } from 'react';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  AxesHelper
} from 'three';
import { createStats } from '@utils/help';

const ThreeCase1 = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // fps
    const dom = ref.current as HTMLElement
    const stats = createStats({ dom })

    // 场景
    const scene = new Scene()

    // 辅助线
    const axesHelper = new AxesHelper( 20 );
    scene.add( axesHelper );

    // 相机
    const camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
    camera.position.set(-20, 30, 20);
    camera.up.set(0,1,0);
    camera.lookAt(0,0,0);

    // 环境光
    const ambientlight = new AmbientLight(0x404040);
    scene.add(ambientlight);

    // 物体
    const geometry = new BoxGeometry(4, 4, 4, 5, 5, 5);
    const material = new MeshBasicMaterial({ wireframe: true });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    // 渲染背景
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setClearColor(new Color(0xeeeeee),0.5);
    dom.appendChild(renderer.domElement)

    // 动画
    function animate () {
      renderer.render(scene, camera);
      stats.update();
      requestAnimationFrame(animate);
    }

    animate()
  }, [])

  return (
    <div ref={ref}></div>
  )
}

export default ThreeCase1
