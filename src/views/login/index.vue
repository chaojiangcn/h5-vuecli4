<template>
  <div class="content">
    <div class="login">
      <img src="../../assets/image/logo@2x.png" alt="">
    </div>
    <div class="title">
      感受分布式商业
      <br>
      实现人与人之间的高效服务
    </div>
    <div class="user">
      <span>{{user.name}}</span>
      邀请你帮Ta认证专家号
    </div>
    <div class="form">
      <van-cell-group>
        <van-field
          v-model="phone"
          label=""
          @input="handelInputPhone"
          data-type="phone"
          placeholder="手机号"
          maxlength="11"
        ></van-field>
      </van-cell-group>

      <van-field
        v-model="sms"
        center
        clearable
        label=""
        @input="handelInput"
        placeholder="验证码"
        maxlength="4"
      >
        <template #button>
          <van-button size="small" type="primary" :disabled="isSend" @click="getSMS">
            {{leftTime}}<span v-if="isSend">s</span>
          </van-button>
        </template>
      </van-field>
      <van-button
        type="primary"
        class="footBut"
        :disabled="!isOk"
        @click="submitForm"
        block
        size="normal">
        帮Ta认证
      </van-button>
      <div class="userAgreement">
        登录即代表同意<a href="https://www.lingzhushijie.com/lingzhuPrivacy.html" class="text">《用户协议》</a>和
        <a href="https://www.lingzhushijie.com/lingzhu2PrivacyPolicy.html" class="text">《隐私政策》</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    CellGroup, Row, Col, Field, Button, Toast
  } from 'vant'
  import { _testHook } from '@utils/validator'
  import apis from '@apis/index'
  import { getUrlParam } from '../../utils/util'
  import { strFilter } from '../../utils/formCheck'

  export default {
    name: 'Login',
    components: {
      [Field.name]: Field,
      [Row.name]: Row,
      [Col.name]: Col,
      [Button.name]: Button,
      [CellGroup.name]: CellGroup
    },
    data() {
      return {
        sms: '',
        phone: '',
        phoneErr: '',
        leftTime: '发送验证码',
        isOk: false, // 是否可以提交数据
        isSend: false, // 是否发送验证码
        timer: null, // 定时器
        user: {
          name: '---',
          status: null,
          uid: null,
          expertno_id: null
        }
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.user.name = getUrlParam('name') ? getUrlParam('name') : this.user.name
        this.user.uid = getUrlParam('uid') ? getUrlParam('uid') : this.user.uid
        this.user.status = getUrlParam('status') ? getUrlParam('status') : this.user.status
        this.user.expertno_id = getUrlParam('expertno_id') ? getUrlParam('expertno_id') : this.user.expertno_id
      },
      handelInputPhone(e) {
        const self = this
        // 输入处理
        e = strFilter(e)
        self.phone = e
      },
      handelInput(e) {
        const self = this
        // 输入处理
        e = strFilter(e)
        if (/^\d{4,6}$/.test(e)) {
          self.isOk = true
        }
        self.sms = e
      },
      // 发送验证码
      getSMS() {
        const self = this
        if (!_testHook.is_phone(self.phone)) return Toast.fail('请输入正确的手机号')
        const param = {
          phone: self.phone
        }
        apis.userApis.sendMessage(param)
          .then((res) => {
            console.log(res)
            Toast.success(res.message)
            self.leftTime = 60
            self.isSend = true
            self.timer = setInterval(() => {
              if (self.leftTime > 0 && self.leftTime <= 60) {
                self.leftTime -= 1
              } else {
                self.isSend = false
                clearInterval(this.timer)
                self.leftTime = '重新获取'
                self.timer = null
              }
            }, 1000)
          })
        return ''
      },
      // 认证处理
      authentication(uid) {
        const self = this
        const param = {
          expertno_id: self.user.expertno_id,
          invite_uid: Number(self.user.uid)
        }
        apis.userApis.helpAuthentication(param)
          .then((res) => {
            Toast(res.message)
            setTimeout(() => this.$router.push('./loginSuccess'), 1000)
          })
          .catch((res) => {
            Toast(res.message)
          })
      },
      submitForm() {
        const self = this
        if (!(self.phone && _testHook.is_phone(self.phone))) return Toast('请输入正确的手机号')
        if (!self.sms) return Toast('验证码不能为空')
        if (!/^\d{4,6}$/.test(self.sms)) return Toast('验证格式错误')
        const param = {
          phone: self.phone,
          code: Number(self.sms)
        }
        apis.userApis.Login(param)
          .then((res) => {
            const { token, uid } = res.data
            if (token) {
              self.$store.dispatch('user/updateUserToken', token)
            }
            if (uid && token) {
              self.authentication(uid)
            } else {
              Toast('uid/token 异常！')
            }
          })
          .catch((res) => {
            Toast(res.message)
          })

        return ''
      }
    }
  }
</script>

<style lang="less">
  .login {
    margin-top: 43px;

    img {
      height: 116px;
      width: 116px;
    }
  }

  .van-cell {
    padding-left: 0;
    padding-right: 0;
  }

  .van-cell:not(:last-child)::after {
    border-bottom: none;
  }

  .van-button--small {
    width: 116px;
    height: 37px;
    line-height: 37px;
    font-size: 15px;
    border-radius: 23px;
  }

  .van-button--primary {
    border-radius: 23px;
  }

  .van-field__control {
    font-size: 15px;
    padding: 6px 26px;
    box-sizing: border-box;
    border-radius: 23px;
    border: 1px solid #1ACEAE;
  }

  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    line-height: 34px;
    margin-top: 35px;
  }

  .user {
    font-size: 18px;
    font-weight: bold;
    margin-top: 30px;
  }

  .form {
    padding: 20px  30px 10px;
    box-sizing: border-box;

    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
      border-width: 0;
    }
  }

  .footBut {
    margin-top: 10px;
    .van-button__text {
      font-size: 19px;
    }
  }

  .userAgreement {
    margin-top: 6px;
    font-size: 14px;
    color: #666666;
    text-align: center;

    .text {
      color: #1ACEAE;
    }
  }
</style>
