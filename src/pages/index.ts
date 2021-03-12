/*
 * @Author: lyf
 * @Date: 2021-02-01 10:49:24
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-12 19:14:55
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/pages/index.ts
 */
import loadable from '@loadable/component'

const ThreejsRubik = loadable(() => import(/* webpackChunkName: "chunk-rubik" */ './rubik'))
const ThreejsPoints = loadable(() => import(/* webpackChunkName: "chunk-points" */ './points'))
const ThreejsCollision = loadable(() => import(/* webpackChunkName: "chunk-luck-draw" */ './collision'))

export {
  ThreejsRubik,
  ThreejsPoints,
  ThreejsCollision
}
