import { callWithNuxt } from 'nuxt/app'

export const useStrapiFetch = async (page: string) => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const { setToken } = useStrapiAuth()
  setToken(config.public.strapi.token)

  const { find } = useStrapi()
  const { data: response, error } = await useAsyncData('fetchStrapiPage', () =>
    find('pages', {
      filters: {
        slug: {
          $eq: page,
        },
      },
      populate: {
        zone: {
          populate: '*',
        },
        seo: {
          populate: {
            image: {
              populate: '*',
            },
          },
        },
      },
    })
  )

  const content = response.value?.data?.[0]

  return {
    head: callWithNuxt(nuxtApp, () => getSeoHead(content)),
    content,
  }
}

const getSeoHead = async (content: any) => {
  const runtimeConfig = useRuntimeConfig()
  const router = useRouter()
  const strapiSeoMetaTitle = content.attributes.seo?.metaTitle || content.attributes.name
  const strapiSeoMetaDescription = content.attributes.seo?.metaDescription

  const head = {
    title: `${strapiSeoMetaTitle} | JeVeuxAider.gouv.fr`,
    link: [
      {
        rel: 'canonical',
        href: `${runtimeConfig.public.appUrl}${router.currentRoute.value.fullPath}`,
      },
    ],
    meta: <any[]>[],
  }

  if (strapiSeoMetaDescription) {
    head.meta.push({
      hid: 'description',
      name: 'description',
      content: strapiSeoMetaDescription,
    })
  }

  const seoOgImgUrl = getSeoOgImgUrl(content)
  if (seoOgImgUrl) {
    head.meta.push({
      hid: 'og:image',
      property: 'og:image',
      content: seoOgImgUrl,
    })
  }

  return head
}

const getSeoOgImgUrl = (content: any) => {
  const runtimeConfig = useRuntimeConfig()
  const format = 'large'

  if (!content.attributes.seo?.image.media.data.attributes.formats[format]) {
    return '/images/share-image.jpg'
  }

  return (
    runtimeConfig.public.strapi.url +
    content.attributes.seo?.image.media.data.attributes.formats[format].url
  )
}
