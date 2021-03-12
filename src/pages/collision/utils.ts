/*
 * @Author: lyf
 * @Date: 2021-03-12 11:04:11
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-12 19:07:45
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/pages/luckDraw/utils.ts
 */
import {
  Plane,
  Vector3,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  Box3,
  Sphere,
  Material
} from 'three'

export default class Utils {

  private static boundingPlanes: Plane[] = []

  /* 创建包围盒 */
  static setBoundingBox (len: number, meshes: Mesh[]) {
    const font = new Plane(new Vector3(0, 0, -1), len)
    const back = new Plane(new Vector3(0, 0, 1), len)
    const left = new Plane(new Vector3(1, 0, 0), len)
    const right = new Plane(new Vector3(-1, 0, 0), len)
    const top = new Plane(new Vector3(0, -1, 0), len)
    const bottom = new Plane(new Vector3(0, 1, 0), len)

    this.boundingPlanes = [font, back, left, right, top, bottom]
    
    meshes.forEach((mesh) => {
      if (this.isSphere(mesh)) {
        mesh.geometry.computeBoundingSphere()
      } else {
        mesh.geometry.computeBoundingBox()
      }
    })
  }

  /* 是否为球体 */
  static isSphere (mesh: Mesh) {
    return mesh.geometry instanceof SphereGeometry
  }

  /**
   * 每一帧渲染
   * 
   * 获取碰撞墙壁的元素
   */
  static render (objs: Mesh[]) {
    let boxes = []
    for (let i = 0, len = objs.length; i < len; i++) {
      const mesh = objs[i]
      // 墙壁碰撞
      const crossPlanes = this.getCollisionPlanes(mesh)
      if (crossPlanes.length) {
        const direction = new Vector3()
        crossPlanes.forEach(({ normal }) => direction.add(normal))
        console.log(direction.normalize())
        mesh.translateOnAxis(direction.normalize(), Math.random() * 3)
        boxes.push(mesh)
      }

      // 球体碰撞
      
    }
    return boxes
  }

  /**
   * 获取元素碰撞的墙面
   */
  static getCollisionPlanes (mesh: Mesh) {
    const matrix = mesh.matrix
    const isSphere = this.isSphere(mesh)
    const crossPlanes = []
    const planes = this.boundingPlanes
    for (let i = 0, len = planes.length; i < len; i++) {
      const plane = planes[i]
      if (isSphere) {
        const sphere = mesh.geometry.boundingSphere?.clone().applyMatrix4(matrix) as Sphere
        if (plane.intersectsSphere(sphere)) {
          crossPlanes.push(plane)
        }
      } else {
        const box = mesh.geometry.boundingBox?.clone().applyMatrix4(matrix) as Box3
        if (plane.intersectsBox(box)) {
          crossPlanes.push(plane)
        }
      }
    }
    return crossPlanes
  }
}