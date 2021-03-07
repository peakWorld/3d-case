import { normal } from './../../tutorial-three/case4/data';
import {
  Vector3,
  Group,
  Mesh,
  BoxGeometry,
  CanvasTexture,
  MeshBasicMaterial,
  Vector2,
  Raycaster,
  Camera,
  Scene,
  Object3D
} from 'three'

interface Configs {
  origin: Vector3
  size: number
  len: number
  colors: string[]
}

interface State {
  leftOriginPos: Vector3 /* 前、左、上 小盒子的原点坐标 */
  group: Group /* 魔方体 */
  isRotating: boolean /* 是否在旋转中 */
  normal: Vector3 /* 滑动面法向量 */
  intersect: Object3D /* 触摸点所在的小盒子 */
  startPoint: Vector3 /* 开始触摸点在3d坐标系中位置 */
  endPoint: Vector3 /* 结束触摸点在3d坐标系中位置 */
}

enum Direction {
  x, nx, y, ny, z, nz
}

type DirectionItem = keyof typeof Direction

export default class Rubik {
  private static defaultConfigs: Configs = {
    origin: new Vector3(0, 0, 0),
    size: 3,
    len: 50,
    colors: ['#ff6b02', '#dd422f', '#ffffff', '#fdcd02', '#3d81f7', '#019d53']
  }

  private configs: Configs = {} as Configs

  private state: State = {} as State

  /* 相对于魔方局部坐标系的可旋转方向 */
  private direction: Record<DirectionItem, Vector3> = {
    x: new Vector3(1, 0, 0),
    nx: new Vector3(-1, 0, 0),
    y: new Vector3(0, 1, 0),
    ny: new Vector3(0, -1, 0),
    z: new Vector3(0, 0, 1),
    nz: new Vector3(0, 0, 1),
  }

  constructor (configs: Partial<Configs> = {}) {
    this.configs = { ...Rubik.defaultConfigs, ...configs }

    this.state.leftOriginPos = this.getLeftOriginPos()
  }

  /**
   * 获取魔方的最前边左上角魔方的原点坐标    
   */
  getLeftOriginPos () {
    const { origin, size, len } = this.configs
    const step = len * (size - 1) / 2
    const x = origin.x - step
    const y = origin.y + step
    const z = origin.z + step
    return new Vector3(x, y, z)
  }

  /**
   * 生成贴图纹理
   */
  createMap (color: string) {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256

    const context = canvas.getContext('2d') as CanvasRenderingContext2D 
    context.fillStyle = 'rgba(0,0,0,1)'
    context.fillRect(0, 0, 256, 256)

    context.rect(16, 16, 224, 224)
    context.lineJoin = 'round'
    context.lineWidth = 16
    context.fillStyle = color
    context.strokeStyle = color
    context.stroke()
    context.fill()
    return canvas
  }

  /**
   * 获取每个box的原点坐标相对于魔方原点的偏移
   * 
   * 先计算出最前边左上角小盒子的原点坐标, 再依次算出每个盒子的原点坐标
   */
  getOffsetInPerBox (page: number, index: number) {
    const { len, size } = this.configs
    const { leftOriginPos } = this.state
    if (page === 0 && index === 0) {
      return leftOriginPos
    }
    const x = leftOriginPos.x + len * (index % size)
    const y = leftOriginPos.y - len * Math.floor(index / size)
    const z = leftOriginPos.z - len * page
    return new Vector3(x, y, z)
  }

  /**
   * 生成小盒子
   */
  createBox (page: number, index: number, materials: MeshBasicMaterial[]) {
    const { len } = this.configs
    const mesh = new Mesh(new BoxGeometry(len, len, len), materials)
    mesh.position.copy(this.getOffsetInPerBox(page, index))
    return mesh
  }

  /**
   * 生成models
   * 
   * 从前往后, 从左到右, 从上到下, 依次生成小盒子
   */
  models () {
    const group = new Group()
    const { size, colors, len, origin } = this.configs
    const materials = colors?.map((color) => {
      const map = new CanvasTexture(this.createMap(color))
      const material = new MeshBasicMaterial({ map })
      return material
    })

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size * size; j++) {
        const box = this.createBox(i, j, materials)
        box.name = `box-${i * size * size + j}`
        group.add(box)
      }
    }

    // 透明盒子
    const cubeLen = size * len + 1
    const cube = new Mesh(
      new BoxGeometry(cubeLen, cubeLen, cubeLen),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    )
    cube.position.copy(origin)

    group.add(cube)
    group.position.copy(origin)
    this.state.group = group

    return group
  }

  doAnimation() {
    const { startPoint, endPoint, normal, group } = this.state
    const { x, nx, y, ny, z, nz } = this.direction
    // 全局坐标系中 移动方向
    const moveVector = endPoint.sub(startPoint)
    // 魔方在世界坐标系中的模型变换矩阵
    const matrix = group.matrixWorld
    // 魔方局部坐标系的中心点肯定是(0, 0, 0), 需要将其转换成全局坐标系
    const globalOrigin = new Vector3(0, 0, 0).applyMatrix4(matrix)
    // 将魔方局部坐标系中可旋转方向装换成世界坐标系
    // 计算和移动方向的夹角, 夹角最小的则是魔方的滑动方向
    const angles = Object.keys(this.direction)
      .reduce((res, item) => {
        const globalDirection = this.direction[item as DirectionItem]
          .applyMatrix4(matrix).sub(globalOrigin)
        const angle = moveVector.angleTo(globalDirection)
        res[item] = angle
        return res
      }, {} as any) as Record<DirectionItem, number>
      const minAngle = Math.min(...Object.values(angles))

      switch (minAngle) {
        case angles.x: // 沿着x轴正方向滑动(可滑动的面只有四个)
          if (normal.equals(y)) { // 滑动面的法向量是y轴正方向, 即沿着z轴顺时针旋转
            // TODO
          } else if (normal.equals(ny)) { // 滑动面的法向量是y轴负方向, 即沿着z轴逆时针旋转
            // TODO
          } else if (normal.equals(z)) { // 滑动面的法向量是z轴正方向, 即沿着y轴逆时针旋转
            // TODO
          } else if (normal.equals(nz)){ // 滑动面的法向量是z轴负方向, 即沿着y轴顺时针旋转 
            // TODO 
          }
          break
        case angles.nx: // 沿着x轴负方向滑动
          break
        case angles.y:
          break
        case angles.ny:
          break
        case angles.z:
          break
        case angles.nz:
          break
      }
  }

  /**
   * 事件绑定
   */
  bindEvent(camera: Camera, scene: Scene) {
    const raycaster = new Raycaster()

    function normalVector (x: number, y: number) {
      const nx = ( x / window.innerWidth ) * 2 - 1
      const ny = - ( y / window.innerHeight ) * 2 + 1
      return new Vector2(nx, ny)
    }

    const handleTouchStart = (evt: TouchEvent) => {
      const { isRotating } = this.state
      if (!isRotating) {
        const { clientX, clientY } = evt.touches[0]
        raycaster.setFromCamera(normalVector(clientX, clientY), camera )
        const intersects = raycaster.intersectObjects(scene.children, true)
        console.log(intersects)
        if (intersects.length > 2) {
          this.state.normal = intersects[0].face?.normal as Vector3 
          this.state.intersect = intersects[1].object
          this.state.startPoint = intersects[0].point
        }
      }
    }

    const handleTouchEnd = (evt: TouchEvent) => {
      const { isRotating, startPoint } = this.state
      if (!isRotating && startPoint) {
        const { clientX, clientY } = evt.changedTouches[0]
        raycaster.setFromCamera(normalVector(clientX, clientY), camera )
        const intersects = raycaster.intersectObjects(scene.children, true)
        if (intersects.length) {
          this.state.endPoint = intersects[0].point
          if (!startPoint.equals(this.state.endPoint)) {
            this.doAnimation()
          }
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, false)
    window.addEventListener('touchend', handleTouchEnd, false)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart, false)
      window.removeEventListener('touchend', handleTouchEnd, false)
    }
  }
}