import axios from 'axios'

// 请求数据方法
export function request (url) {
  var promise = new Promise((resolve, reject) => {
    axios.get('/api' + url).then((res) => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })

  return promise
}

export function postRequest (url, data) {
  var promise = new Promise((resolve, reject) => {
    axios.post('/api' + url, data).then((res) => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })

  return promise
}

// 获取cookie某个key的value
export function getValueByKey (str) {
  let strArr = str.split(';')
  let nameInfo = ''
  strArr.forEach((item) => {
    if (item.indexOf(' name=') === 0) {
      nameInfo = item
    }
  })
  // console.log(nameInfo.split('='))
  return nameInfo.split('=')[1]
}
