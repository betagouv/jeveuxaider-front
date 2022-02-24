export default async function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  const findEl = (hash, x) => {
    return document.querySelector(hash) ||
      new Promise((resolve, reject) => {
        if (x > 50) {
          return resolve()
        }
        setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
      })
  }

  if (to.hash) {
    const el = await findEl(to.hash)
    return { x: 0, y: el ? el.offsetTop : 0, behavior: 'smooth' }
  }

  if (from.name != to.name) {
    return { x: 0, y: 0 }
  }
}
