/*
 * @Author: lyf
 * @Date: 2021-03-04 17:15:58
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-11 15:36:57
 * @Description: 二维形状、文本、morph(形变)
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-three/case5/index.tsx
 */
import React, { useRef, useEffect } from 'react';
import { createStats } from '@utils/help'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  Shape,
  Color,
  AxesHelper,
  Mesh,
  Path,
  ShapeGeometry,
  MeshBasicMaterial,
  FontLoader,
  TextGeometry,
  MeshNormalMaterial,
  Sphere,
  SphereGeometry,
  Material,
  Vector3,
  BufferAttribute
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ThreeCase5 = () => {
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
    camera.position.set(-40, 40, 30)
    camera.up.set(0, 1, 0)
    camera.lookAt(0, 0, 0)
    const control = new OrbitControls(camera, renderer.domElement)

    // 场景
    const scene = new Scene()
    // const axesHelper = new AxesHelper( 20 );
    // scene.add( axesHelper );

    // 光线
    const ambient = new AmbientLight(0x404040)
    scene.add(ambient)

    // 二维形状
    const shape = new Shape() // 以xy轴平面(0, 0)为原点
    shape.lineTo(10, 5)
    shape.absarc(5, 5, 5, 0, Math.PI*2, false)
    const rightEye = new Path()
    rightEye.moveTo(8, 6)
    rightEye.absellipse(7, 5, 1, 1, 0, Math.PI*2, true, 0)
    shape.holes.push(rightEye)
    const leftEye = new Path()
    leftEye.moveTo(4,5)
    leftEye.absarc(3, 5, 1, 0, Math.PI*2, true)
    shape.holes.push(leftEye)
    const mouth = new Path()
    mouth.moveTo(5, 3)
    mouth.quadraticCurveTo(6, 3, 7, 4)
    mouth.quadraticCurveTo(6, 2, 5, 2)
    mouth.quadraticCurveTo(4, 2, 4, 4)
    mouth.quadraticCurveTo(4, 3, 5, 3)
    shape.holes.push(mouth)
    const mesh = new Mesh(
      new ShapeGeometry(shape),
      new MeshBasicMaterial()
    )
    mesh.visible = false
    scene.add(mesh)

    // Text
    const loader = new FontLoader()
    loader.load('/assets/webgl/font/helvetiker_bold.typeface.js', (font) => {
      const geometry = new TextGeometry('Hello World!', {
        font, // 字体
        size: 3, // 字体高度
        height: 0.2, // 字体厚度
        curveSegments: 5,// 曲线处的片段数
        bevelEnabled: true,// 是否前后面堆叠物体
        bevelThickness: 0.2,// 堆叠物厚度
        bevelSize: 0.2,// 堆叠物宽度
        bevelSegments: 20// 厚度处的片段数,越大显示越圆滑
      })
      // 1. 材质支持形变
      const material = new MeshNormalMaterial({ morphTargets: true, morphNormals: true })

      function handleAttr (name: string) {
        const geomAttr = geometry.getAttribute(name).clone() // 拷贝当前元素的geometry
        const { array, count, itemSize } = geomAttr
        const arr = []
        for (let i = 0; i < count; i++) { // 对每个顶点坐标进行处理
          const vector = new Vector3(
            array[i * itemSize] + Math.random() * 3,
            array[i * itemSize + 1] + Math.random() * 3,
            array[i * itemSize + 2] + Math.random() * 3
          )
          arr.push(vector)
        }
        const attr = geomAttr.copyVector3sArray(arr) // 生成一个新的gemoetry
        return attr
      }

      // 2. 添加形变数据
      geometry.morphAttributes.position = [handleAttr('position')]
      geometry.morphAttributes.normal = [handleAttr('normal')]

      const mesh = new Mesh(geometry, material)
      // mesh.updateMorphTargets()
      mesh.morphTargetInfluences = [0.3] // 3. 形变程度[0-1]
      mesh.position.set(-10, 0, 0)
      scene.add(mesh)
      
      // 外接球
      geometry.computeBoundingSphere()
      const { center, radius } = geometry.boundingSphere as Sphere
      const sphere = new Mesh(
        new SphereGeometry(radius, 32, 32),
        new MeshNormalMaterial({ wireframe: true })
      )
      sphere.position.copy(center.setX(center.x - 10))
      // scene.add(sphere)
    })

    // 动画
    function animate () {
      stats.update()
      control.update()
      renderer.render(scene, camera)

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

export default ThreeCase5