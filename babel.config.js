const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const plugins = [
  ['import', {
    libraryName: 'vant',
    libraryDirectory: 'es',
    style: (name) => `${name}/style/less`
  },
    'vant'
  ]
]
// 生产环境取消console
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins
}
