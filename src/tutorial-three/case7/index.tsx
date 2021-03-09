/*
 * @Author: lyf
 * @Date: 2021-02-19 19:28:39
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-09 19:07:47
 * @Description: 后期处理
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-three/case7/index.tsx
 */
import React, { useRef, useEffect } from 'react';
import { createStats } from '@utils/help'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  Color,
  AxesHelper,
  TextureLoader,
  SphereGeometry,
  MeshPhongMaterial,
  Mesh
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { FilmShader } from 'three/examples/jsm/shaders/FilmShader'

const ThreeCase7 = () => {
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
    camera.position.set(40, 40, 40)
    camera.up.set(0, 1, 0)
    camera.lookAt(0, 0, 0)
    const control = new OrbitControls(camera, renderer.domElement)

    // 场景
    const scene = new Scene()
    // const axesHelper = new AxesHelper( 20 );
    // scene.add( axesHelper )

    // 光线
    const ambient = new AmbientLight(0xffffff)
    scene.add(ambient)

    // 物体
    const loader = new TextureLoader()
    const map = loader.load('/assets/webgl/img/three-case7/Earth.png')
    const specularMap = loader.load('/assets/webgl/img/three-case7/EarthSpec.png')
    const normalMap = loader.load('/assets/webgl/img/three-case7/EarthNormal.png')
    const geometry = new SphereGeometry(10, 40, 40)
    const material = new MeshPhongMaterial({
      map,
      normalMap,
      specularMap,
      specular: new Color(0x4444aa)
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    // 后期处理
    const composer = new EffectComposer(renderer)
    // 1. 此处使用帧缓冲, 实现屏后渲染. 生成纹理对象, 进行后期处理
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)
    // 2. 使用电影特效
    // 方式一 直接使用pass
    // const filmPass = new FilmPass(0.8, 0.325, 256)
    // 方式二 使用ShaderPass来生成pass(需要引入对应的shader代码)
    const filmPass = new ShaderPass(FilmShader)
    filmPass.uniforms.nIntensity.value = 0.8
    filmPass.uniforms.sIntensity.value = 0.325
    filmPass.uniforms.sCount.value = 256
    composer.addPass(filmPass)
    // bloomPass没有renderToScreen属性,无法显示在屏幕,
    // 所以用new THREE.ShaderPass(THREE.CopyShader),将纹理展示在屏幕
    // const bloomPass = new BloomPass(3, 25, 5.0, 256)
    // composer.addPass(bloomPass)
    // composer.addPass(composer.copyPass)
    
    // 动画
    function animate () {
      stats.update()
      control.update()

      composer.render()

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

export default ThreeCase7
