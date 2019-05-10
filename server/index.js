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
        console.log(parseInt(d.newslist[i].clickTime) + 1)
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

app.listen(3000, function () {
  console.log('server running...')
})
