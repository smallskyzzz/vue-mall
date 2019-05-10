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
