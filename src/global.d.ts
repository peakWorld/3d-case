/*
 * @Author: lyf
 * @Date: 2021-02-01 14:06:40
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-16 14:47:09
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/global.d.ts
 */
import { Scene } from 'three'

declare global {
  interface Window {
    scene: Scene
  }
}
