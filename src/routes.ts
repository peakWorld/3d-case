/*
 * @Author: lyf
 * @Date: 2021-02-01 10:46:39
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-15 19:22:17
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/routes.ts
 */
import { RouteProps } from 'react-router-dom'
import * as pages from './pages'
import * as tutorialThree from './tutorial-three'

export const routes = new Map<string, RouteProps>()

// 1. tutorial-three
routes.set('1001', { path: '/three/case1', component: tutorialThree.Case1, exact: true })
routes.set('1002', { path: '/three/case2', component: tutorialThree.Case2, exact: true })
routes.set('1003', { path: '/three/case3', component: tutorialThree.Case3, exact: true })
routes.set('1004', { path: '/three/case4', component: tutorialThree.Case4, exact: true })
routes.set('1005', { path: '/three/case5', component: tutorialThree.Case5, exact: true })
routes.set('1006', { path: '/three/case6', component: tutorialThree.Case6, exact: true })
// routes.set('1007', { path: '/three/case7', component: tutorialThree.Case7, exact: true })
// routes.set('1008', { path: '/three/case8', component: tutorialThree.Case8, exact: true })

// 2. cases
routes.set('2001', { path: '/3d/rubik', component: pages.ThreejsRubik, exact: true })
routes.set('2002', { path: '/3d/points', component: pages.ThreejsPoints, exact: true })
routes.set('2003', { path: '/3d/collision', component: pages.ThreejsCollision, exact: true })