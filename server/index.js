var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
var app = express()

// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }))
// 处理json格式的参数
app.use(bodyParser.json())

// 获取banner
app.get('/banner', function (req, res) {
  fs.readFile(path.join(__dirname, '/mockData/banner.json'), 'utf8', (err, data) => {
    if (err) throw err
    res.send(data)
  })
})

// 获取新闻列表
app.get('/newslist', function (req, res) {
  fs.readFile(path.join(__dirname, '/mockData/newslist.json'), 'utf8', (err, data) => {
    if (err) throw err
    res.send(data)
  })
})

// 获取某个新闻
app.get('/newslist/:id', function (req, res) {
  fs.readFile(path.join(__dirname, '/mockData/newslist.json'), 'utf8', (err, data) => {
    if (err) throw err
    for (var i = 0; i < JSON.parse(data).newslist.length; i++) {
      if (req.params.id == JSON.parse(data).newslist[i].id) {
        res.send(JSON.parse(data).newslist[i])
      }
    }
  })
})

// 修改某个新闻点击次数
app.get('/addClickTime/:id', function (req, res) {
  fs.readFile(path.join(__dirname, '/mockData/newslist.json'), 'utf8', (err, data) => {
    if (err) throw err
    var d = JSON.parse(data)
    for (var i = 0; i < d.newslist.length; i++) {
      if (req.params.id == d.newslist[i].id) {
        // console.log(parseInt(d.newslist[i].clickTime) + 1)
        d.newslist[i].clickTime = parseInt(d.newslist[i].clickTime) + 1
        break
      }
    }
    fs.writeFile(path.join(__dirname, '/mockData/newslist.json'), JSON.stringify(d), (err) => {
      if (err) throw err
      res.send('ok')
    })
  })
})

// 获取新闻评论（默认一页5条），每次只返回5条数据
app.get('/newsComment/:id/:pageIndex', function (req, res) {
  var pageLength = 5
  fs.readFile(path.join(__dirname, '/mockData/newsComment.json'), 'utf8', (err, data) => {
    if (err) throw err
    for (var i = 0; i < JSON.parse(data).newsComment.length; i++) {
      if (req.params.id == JSON.parse(data).newsComment[i].id) {
        var ret = []
        for (var j = 0; j < pageLength; j++) {
          if (JSON.parse(data).newsComment[i].comment[(req.params.pageIndex - 1) * pageLength + j]) {
            ret.push(JSON.parse(data).newsComment[i].comment[(req.params.pageIndex - 1) * pageLength + j])
          }
        }
        res.send({id: req.params.id, comment: ret})
        return
      }
    }
    res.send({data: ''})
  })
})

// 增加新闻评论
app.post('/addNewsComment', function (req, res) {
  fs.readFile(path.join(__dirname, '/mockData/newsComment.json'), 'utf8', (err, comment) => {
    if (err) throw err
    var d = JSON.parse(comment)
    var flag = false
    for (var i = 0; i < d.newsComment.length; i++) {
      if (req.body.id == d.newsComment[i].id) {
        // console.log(parseInt(d.newslist[i].clickTime) + 1)
        d.newsComment[i].comment.unshift({
          name: req.body.name,
          time: req.body.time,
          data: req.body.data
        })
        // 表示json中已经有该条新闻的评论了
        flag = true
        break
      }
    }
    // 第一次给该新闻添加评论
    if (!flag) {
      d.newsComment.push({
        id: req.body.id,
        comment: [
          {
            name: req.body.name,
            time: req.body.time,
            data: req.body.data
          }
        ]
      })
    }
    fs.writeFile(path.join(__dirname, '/mockData/newsComment.json'), JSON.stringify(d), (err) => {
      if (err) throw err
      res.send({state: true})
    })
  })
})

// 获取所有的商品列表
app.get('/goodslist', function (req, res) {
  fs.readFile(path.join(__dirname, '/mockData/goodslist.json'), (err, data) => {
    if (err) throw err
    res.send(JSON.parse(data))
  })
})

// 根据id获取商品列表
app.get('/goodslist/:id', function (req, res) {
  fs.readFile(path.join(__dirname, '/mockData/goodslist.json'), (err, data) => {
    if (err) throw err
    for (var i = 0; i < JSON.parse(data).goods.length; i++) {
      if (req.params.id == JSON.parse(data).goods[i].id) {
        res.send(JSON.parse(data).goods[i])
        return
      }
    }
    res.send({})
  })
})

// 登陆
app.post('/login', function (req, res) {
  fs.readFile(path.join(__dirname, '/mockData/user.json'), 'utf-8', (err, user) => {
    if (err) throw err
    var users = JSON.parse(user)
    console.log(req.body, users.user)
    // 用户名密码是否正确
    let flag = false
    users.user.forEach((item) => {
      if (item.name === req.body.name && item.password === req.body.password) {
        flag = true
        res.send({state: true})
      }
    })
    if (!flag) {
      res.send({state: false})
    }
  })
})

// 注册
app.post('/register', function (req, res) {
  fs.readFile(path.join(__dirname, '/mockData/user.json'), 'utf-8', (err, user) => {
    if (err) throw err
    var users = JSON.parse(user)
    // 用户是否存在
    var flag = false
    users.user.forEach((item) => {
      if (item.name === req.body.name) {
        flag = true
        res.send({state: false, str: '用户已存在'})
      }
    })
    if (!flag) {
      users.user.push(req.body)
      fs.writeFile(path.join(__dirname, '/mockData/user.json'), JSON.stringify(users), (err) => {
        if (err) throw err
        res.send({state: true})
      })
    }
  })
})

app.listen(8000, function () {
  console.log('server running...')
})
