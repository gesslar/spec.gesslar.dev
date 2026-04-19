import { OGImageRoute } from 'astro-og-canvas'
import { getCollection } from 'astro:content'

const entries = await getCollection('docs')

const pages: Record<string, { data: { title: string; description?: string } }> = {
  index: {
    data: {
      title: 'spec.gesslar.dev',
      description: 'Specification hosting and reference',
    },
  },
}

for (const entry of entries) {
  pages[entry.id] = {
    data: { title: entry.data.title, description: entry.data.description },
  }
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  param: 'slug',
  getImageOptions: (_, { data }) => ({
    title: data.title,
    description: data.description ?? '',
    logo: { path: './public/img/logo.png', size: [160] },
    border: { color: [99, 102, 241], width: 20, side: 'inline-start' },
    bgGradient: [[10, 10, 26], [30, 27, 75]],
    padding: 60,
    font: {
      title: { color: [224, 231, 255], weight: 'Bold', size: 64 },
      description: { color: [199, 210, 254], size: 28, lineHeight: 1.4 },
    },
  }),
})
