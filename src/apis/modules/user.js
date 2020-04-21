import request from '../../utils/request'

export default {
  login : (v) => request('/login', v),
  getUserInfo : (v) => request(v)
}
