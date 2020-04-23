import { Toast } from 'vant'
import axiosInstance from '../plugins/axios'

export default function http(url, data, method = 'POST') {
  return new Promise((resolve, reject) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    axiosInstance({
      url,
      data,
      method
    })
      .then((res) => {
        resolve(res)
        // setTimeout(() => Toast(res.message), 1000)
      })
      .catch((res) => {
        reject(res)
        setTimeout(() => Toast(res.message), 1000)
      })
  })
}
