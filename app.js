const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./router')

const app = express()

/* 开放公共资源 */
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

/* 配置模板引擎 */
app.engine('html', require('express-art-template'))
/* 可写可不写，默认就是访问 views 目录 */
app.set('views', path.join(__dirname, './views/'))

/* 配置中间件 body-parser，解析 POST 请求体插件【注】 一定要在 挂载路由 app.use(router) 之前*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置（一定要在 app.use(router)之前）
// 3. 使用
//      当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
//      添加 Session 数据：req.session.foo = 'bar'
//      访问 Session 数据：req.session.foo
app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'itcast',   
    resave: false,
    saveUninitialized: true // 无论你是否使用 Session，我都会默认直接给你分配一把钥匙
}))


/* 把路由挂载到 app 中 */
app.use(router)

app.listen('5000', function () {
    console.log('running...')
})