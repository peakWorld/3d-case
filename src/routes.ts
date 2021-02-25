/*
 * @Author: lyf
 * @Date: 2021-02-01 10:46:39
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-25 16:38:34
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/routes.ts
 */
import { RouteProps } from 'react-router-dom'
import * as pages from './pages'
import * as tutorialThree from './tutorial-three'
import * as tutorialReact from './tutorial-react'

export const routes = new Map<string, RouteProps>()

// 1. tutorial-three
routes.set('1001', { path: '/three/case1', component: tutorialThree.Case1, exact: true })
routes.set('1002', { path: '/three/case2', component: tutorialThree.Case2, exact: true })
routes.set('1003', { path: '/three/case3', component: tutorialThree.Case3, exact: true })
routes.set('1004', { path: '/three/case4', component: tutorialThree.Case4, exact: true })

// 2. tutorial-react
routes.set('2001', { path: '/react/case1', component: tutorialReact.Case1, exact: true })
routes.set('2001', { path: '/react/case2', component: tutorialReact.Case2, exact: true })
routes.set('2001', { path: '/react/case3', component: tutorialReact.Case3, exact: true })

// 3. cases
routes.set('3001', { path: '/rubik', component: pages.Rubik, exact: true })