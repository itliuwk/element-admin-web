// vue.config.js
var path = require("path")
const port = process.env.port || process.env.npm_config_port || 9527 // dev port
module.exports = {
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: `http://127.0.0.1:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        after: require('./mock/mock-server.js')
    },

    chainWebpack: config => {
        //配置 alias 
        config.resolve.alias.set("~", path.resolve(__dirname, './public'))
        //处理 前端资源的image 都转base64  file-loader  
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }))

        // html plugin 
        config.plugin('html')
            .tap(args => {
                args[0].minify = {
                    removeAttributeQuotes: false // 移除属性的引号
                }
                return args
            })
    }
}