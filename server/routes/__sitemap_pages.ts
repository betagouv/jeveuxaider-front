export default defineEventHandler(async () => {
  const pages = await $fetch(`${process.env.API_URL}/api/sitemap`)
  return [...pages].map((p) => {
    return { loc: p.url, lastmod: p.lastmod }
  })
})
