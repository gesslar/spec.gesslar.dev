import { defineRouteMiddleware } from '@astrojs/starlight/route-data'

export const onRequest = defineRouteMiddleware((context) => {
  const { head, entry } = context.locals.starlightRoute
  const url = new URL(`/open-graph/${entry.id || 'index'}.png`, context.site)
  const content = url.href

  head.push(
    { tag: 'meta', attrs: { property: 'og:image', content } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:image', content } },
  )
})
