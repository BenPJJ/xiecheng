const express = require('express')
const User = require('./models/user')
const md5 = require('blueimp-md5')

const router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html', {
        // user: req.session.user
    })
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res) {
    /* 获取请求体 */
    var body = req.body
    
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }

        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or password is invaild'
            })
        }

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})

router.get('/enroll/', function (req, res) {
    res.render('enroll.html')
})

router.post('/enroll/', function (req, res) {
    var body = req.body

    User.findOne({
        email: body.email
    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internal error'
            })
        }

        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email aleary exites'
            })
        }

        /* 对密码进行 md5 重复加密 */
        body.password = md5(md5(body.password))

        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error'
                })
            }

            // 注册成功，使用 Session 记录用户的登陆状态
            req.session.user = user

            res.status(200).json({
                err_code: 0,
                message: 'OK'
            })
        })

    })

})

module.exports = router