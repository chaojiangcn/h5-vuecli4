import request from '../../utils/request'

export default {
  // 发送验证码
  sendMessage: (v) => request('/lingzhu/system/sendMessage', v),
  // 验证手机号
  Login: (v) => request('/lingzhu/user/login', v),
  // 帮助认证
  helpAuthentication: (v) => request('/lingzhu/expertno/invite/handle', v)
}
