import request from '../../utils/request'

export default {
  // 发送验证码
  sendMessage: (v) => request('/api/lingzhu/system/sendMessage', v),
  // 验证手机号
  Login: (v) => request('/api/lingzhu/user/login', v),
  // 帮助认证
  helpAuthentication: (v) => request('/api/lingzhu/expertno/invite/handle', v)
}
