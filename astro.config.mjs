import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import lpmlGrammar from '@gesslar/lpml-language-tmgrammar-hl'
import lpcGrammar from '@gesslar/lpc-language-tmgrammar-hl'

export default defineConfig({
  site: 'https://spec.gesslar.dev',
  markdown: {
    shikiConfig: {
      langs: [{ ...lpmlGrammar, name: 'lpml' }, { ...lpcGrammar, name: 'lpc' }],
    },
  },
  integrations: [
    starlight({
      title: 'spec.gesslar.dev',
      favicon: '/img/logo.svg',
      logo: {
        src: './public/img/logo.svg',
      },
      customCss: [
        './src/styles/custom.css',
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/gesslar/spec.gesslar.dev' },
      ],
      components: {
        Sidebar: './src/overrides/Sidebar.astro',
      },
      sidebar: [
        {
          label: 'LPML',
          autogenerate: { directory: 'lpml' },
        },
        {
          label: 'LPCDoc',
          autogenerate: { directory: 'lpcdoc' },
        },
      ],
    }),
  ],
})
