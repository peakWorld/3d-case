/*
 * @Author: lyf
 * @Date: 2021-02-01 10:49:24
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-11 17:42:47
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/pages/index.ts
 */
import loadable from '@loadable/component'

const Rubik = loadable(() => import(/* webpackChunkName: "chunk-rubik" */ './rubik'))
const Points = loadable(() => import(/* webpackChunkName: "chunk-points" */ './points'))

export {
  Rubik,
  Points
}
