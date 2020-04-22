<template>
  <div class="login">
    <div class="login">
      <img src="" alt="">
    </div>
    <div class="form">
      <van-cell-group>
        <van-field
          v-model="phone"
          label=""
          @input="handelInput"
          data-type="phone"
          placeholder="请输入手机号"
          :error-message="phoneErr"
          maxlength="11"
        ></van-field>
      </van-cell-group>

      <van-field
        v-model="sms"
        center
        clearable
        label=""
        placeholder="请输入短信验证码"
        maxlength="4"
      >
        <template #button>
          <van-button size="small" type="primary" :disabled="isSend" @click="sendSMS"><span
            v-if="isSend">剩余</span>{{leftTime}}
          </van-button>
        </template>
      </van-field>

      <van-button type="primary" :disabled="!isOk" @click="submitForm" size="large">帮Ta认证
      </van-button>
      <div class="userAgreement">
        登录即代表同意<a href="@" class="text">《用户协议》</a>和<a href="@" class="text">《隐私政策》</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { Row, Col, Field, Button, Toast } from 'vant';
  import { _testHook } from '@utils/validator';

  export default {
    name: 'login',
    components: {
      [Field.name]: Field,
      [Row.name]: Row,
      [Col.name]: Col,
      [Button.name]: Button
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
      };
    },
    methods: {
      handelInput(e) {
        if (!_testHook.is_phone(e)) {
          this.phoneErr = '请输入正确的手机号';
        } else {
          this.phoneErr = '';
        };
      },

      sendSMS() {
        let self = this;
        let param = {
          phone: self.phone
        };
        setTimeout(() => {

          self.leftTime = 60;
          self.isSend = true;
          self.isOk = true;
          self.timer = setInterval(() => {
            if (self.leftTime > 0 && self.leftTime <= 60) {
              self.leftTime--;
            } else {
              self.isSend = false;
              clearInterval(this.timer);
              self.leftTime = '请点击重试';
              self.timer = null;
            }

          }, 1000);
        }, 2000);
        // apis.userApis.login(param).then(res => {
        //   console.log(res);
        //   self.leftTime = 60;
        //   self.isSend = true;
        //   self.timer = setInterval(()=>{
        //     if(self.leftTime > 0 || self.leftTime < 60) {
        //       self.leftTime--
        //     } else {
        //       clearInterval(this.timer);
        //       self.leftTime = '请点击重试'
        //     }
        //
        //   },1000);
        // })
      },

      submitForm() {
        let self = this;
        console.log('登录提交', self);

        if(!(self.phone && _testHook.is_phone(self.phone))) return Toast('请输入正确的手机号')
        if(!self.sms) return Toast('验证码不能为空')
      }
    }
  };
</script>

<style lang="less" scoped>
  .form {
    padding: 50px;
    box-sizing: border-box;
  }

  .userAgreement {
    margin-top: 20px;
    font-size: 12px;
    color: #282828;

    .text {
      font-size: 13px;
      color: #42b983;
    }
  }

</style>
