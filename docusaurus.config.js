import {themes as prismThemes} from 'prism-react-renderer';

const { vsLight: PrismLight, vsDark: PrismDark } = prismThemes

const config = {
  title: 'spec.gesslar.dev',
  tagline: 'Specification Repository',
  favicon: 'img/favicon.ico',

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
        includeCurrentVersion: true,
        lastVersion: '1.0.0',
        versions: {
          current: {
            label: 'Next',
            banner: 'unreleased',
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'lpcdoc',
        path: 'specs/lpcdoc',
        routeBasePath: 'lpcdoc',
        sidebarPath: './sidebarsLpcdoc.js',
        includeCurrentVersion: true,
        lastVersion: '1.0.0',
        versions: {
          current: {
            label: '1.1.0 (Next)',
            banner: 'unreleased',
          },
        },
      },
    ],
  ],

  clientModules: [
    './src/clientModules/routeTransition.js',
    './src/clientModules/codeWordWrap.js',
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
          type: 'docsVersionDropdown',
          docsPluginId: 'lpml',
          position: 'left',
          className: 'version-dropdown version-dropdown--lpml',
        },
        {
          type: 'docsVersionDropdown',
          docsPluginId: 'lpcdoc',
          position: 'left',
          className: 'version-dropdown version-dropdown--lpcdoc',
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
