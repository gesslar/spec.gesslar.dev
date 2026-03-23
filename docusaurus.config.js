import {themes as prismThemes} from 'prism-react-renderer';

const { vsLight: PrismLight, vsDark: PrismDark } = prismThemes

const config = {
  title: 'spec.gesslar.dev',
  tagline: 'Specification Repository',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://spec.gesslar.dev',
  baseUrl: '/',

  organizationName: 'gesslar',
  projectName: 'spec.gesslar.dev',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'lpml',
        path: 'specs/lpml',
        routeBasePath: 'lpml',
        sidebarPath: './sidebarsLpml.js',
        includeCurrentVersion: false,
      },
    ],
  ],

  clientModules: [
    './src/clientModules/routeTransition.js',
  ],

  stylesheets: [
    'https://cdn.jsdelivr.net/npm/@vscode/codicons@0.0.36/dist/codicon.css',
  ],

  themeConfig: {
    image: 'img/social.png',
    scrollToTop: true,
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'spec.gesslar.dev',
      logo: {
        alt: 'spec.gesslar.dev',
        src: 'img/logo.svg',
        href: '/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'lpmlSidebar',
          docsPluginId: 'lpml',
          position: 'left',
          label: 'LPML',
        },
        {
          type: 'docsVersionDropdown',
          docsPluginId: 'lpml',
          position: 'left',
        },
        {
          href: 'https://github.com/gesslar/spec.gesslar.dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `<a href="https://unlicense.org"/>Unlicense</a>. Built with Docusaurus.`,
    },
    prism: {
      theme: PrismLight,
      darkTheme: PrismDark,
    },
  },
};

export default config;
