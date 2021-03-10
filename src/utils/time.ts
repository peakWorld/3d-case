/*
 * @Author: lyf
 * @Date: 2021-03-10 11:03:54
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-10 17:23:39
 * @Description: 时间操作相关
 * @FilePath: /cook-electron/Users/a58/iworkspace/3d-case/src/utils/time.ts
 */

/**
 * 1-0
 * @param {number} duration 执行时间(ms)
 * @param {(percent: number) => void} tick 每一帧的回调函数
 * @param {() => void} after 执行完成后的回调函数
 */
export function interval (duration: number, tick: (percent: number) => void, after?: () => void) {
  let startTime = Date.now()
  let endTime = startTime + duration
  let prevTime = startTime
  let timer = 0

  function animate () {
    const current = Date.now()
    if (current < endTime) {
      const step = current - prevTime
      if (tick) {
        const percent = step / duration
        tick(percent)
      }
      prevTime = current
      timer = requestAnimationFrame(animate)
    } else {
      const step = endTime - prevTime
      if (step > 0 && tick) {
        const percent = step / duration
        tick(percent)
      }
      setTimeout(() => after && after(), 100)
    }
  }
  timer = requestAnimationFrame(animate)
}