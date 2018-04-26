import Path from 'path'

export default {
  entry: Path.join(__dirname, 'src', 'index.tsx'),
  getSiteData() {
    return {
      title: 'Collected'
    }
  },
  async getRoutes() {
    return [
      {
        path: '/',
        component: 'src/pages/index'
      },
      {
        path: '/research',
        component: 'src/pages/research'
      },
      {
        path: '/create',
        component: 'src/pages/create/edit'
      },
      {
        path: '/create/source',
        component: 'src/pages/create/source'
      },
      {
        path: '/contribute',
        component: 'src/pages/contribute'
      },
      {
        path: '/docs',
        component: 'src/pages/docs/index'
      },
      {
        path: '/docs/create',
        component: 'src/pages/docs/create'
      },
      {
        path: '/docs/api',
        component: 'src/pages/docs/api'
      },
      {
        path: '/signin',
        component: 'src/pages/sign-in'
      },
      {
        path: '/account',
        component: 'src/pages/account'
      },
      {
        is404: true,
        component: 'src/pages/404'
      }
    ]
  },
  webpack(config, { defaultLoaders }) {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx')

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    // config.resolve.alias = typescriptWebpackPaths.resolve.alias

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
return config
  }
}