/*
 * @Author: lyf
 * @Date: 2021-03-11 18:58:10
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-11 19:21:02
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/pages/points/utils.ts
 */
import { FontLoader, TextGeometry, Font } from 'three'

export default class Utils {

  private static font: Font

  static async loadFont (fontName: string = 'helvetiker_bold') {
    const loader = new FontLoader()
    return new Promise<Font>((resolve) => {
      loader.load(`/assets/webgl/font/${fontName}.typeface.js`, (font) => {
        resolve(font) 
      })
    })
  }

  static async createGeometry (text: string) {
    const font = await this.loadFont()
    const geometry = new TextGeometry(text, {
      font, // 字体
      size: 3, // 字体高度
      height: 0.2, // 字体厚度
      curveSegments: 5,// 曲线处的片段数
      bevelEnabled: true,// 是否前后面堆叠物体
      bevelThickness: 0.2,// 堆叠物厚度
      bevelSize: 0.2,// 堆叠物宽度
      bevelSegments: 20// 厚度处的片段数,越大显示越圆滑
    })
    return geometry
  }
}