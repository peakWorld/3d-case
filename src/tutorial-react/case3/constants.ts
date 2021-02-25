/*
 * @Author: lyf
 * @Date: 2021-02-25 16:38:48
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-25 17:49:38
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/tutorial-react/case3/constants.ts
 */
import { createContext } from 'react'

interface IContext {
  x: number
  y: number
  m: number
  addX?(): void
  addY?(): void
  addZ?(): void
}

export default createContext<IContext>({} as IContext)