const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/xiecheng')

const Schema = mongoose.Schema

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        /* 0 普通会员，1 超级会员 */
        enum: [0, 1],
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)
