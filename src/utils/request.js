import axiosInstance from '../plugins/axios';
import { Toast } from 'vant';

export default function http(url, data, method = 'POST') {
  return new Promise((resolve, reject) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    axiosInstance({url, data, method})
      .then(res => {
        console.log(res);
        Toast.clear();
      })
      .catch(res => {
        console.log(res);
        Toast.clear();
        Toast('失败！');
      });
  });
}
