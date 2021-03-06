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

  if (from.name != to.name) {
    return { x: 0, y: 0 }
  }

  if (to.hash) {
    const el = await findEl(to.hash)
    if (!el) {
      return
    }
    return { x: 0, y: el.offsetTop, behavior: 'smooth' }
  }

  if (to.query?.page && (!from.query?.page || to.query.page != from.query.page)) {
    return { x: 0, y: 0 }
  }
}
