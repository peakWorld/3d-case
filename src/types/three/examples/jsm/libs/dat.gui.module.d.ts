/*
 * @Author: lyf
 * @Date: 2021-02-02 10:39:24
 * @LastEditors: lyf
 * @LastEditTime: 2021-02-02 14:57:07
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/types/three/examples/jsm/libs/dat.gui.module.d.ts
 * 
 * 参考文章: https://www.hangge.com/blog/cache/detail_1785.html
 */

declare namespace dat {

  class Controller {
    name(name: string): this

    listen(): this

    remove(): this

    onChange(func: (...rest: any) => void): this

    onFinishChange(fnc: Function): this

    setValue(val: any): this

    getValue(): any

    updateDisplay(): this

    isModified(): boolean
  }

  export class GUI {
    constructor (pars: any)
  
    domElement: HTMLDivElement;

    /* TODO */
    get parent(): any

    get scrollable(): boolean

    add<T extends Record<string, any>>(obj: T, prop: keyof T, ...rest: any): Controller

    addColor<T extends Record<string, any>>(obj: T, prop: keyof T): Controller

    remove(controller: Controller): void

    destroy(): void

    addFolder(name: string): GUI

    /* TODO */
    removeFolder(folder: any): void

    open(): void

    close(): void

    hide(): void

    show(): void

    onResize(): void

    onResizeDebounced(): void

    remember(): void

    getRoot(): GUI

    /* TODO */
    getSaveObject(): any

    save(): void

    saveAs(): void

    revert(gui?: GUI): void

    listen (controller: Controller): void

    updateDisplay(): void
  }

  namespace GUI {
    export const TEXT_CLOSED = 'Close Controls';
  }
}

export default dat

interface GUI$ {
  new (): dat.GUI
}
export const GUI: GUI$