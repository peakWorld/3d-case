importScripts('../libs/ammo.js')

onmessage = (data) => {
  console.log(data)
}

setTimeout(() => {
  postMessage('worker...')
}, 1500)

// function cb () {
//   console.log('hahhaha')
//   requestAnimationFrame(cb)
// }

// requestAnimationFrame(cb)