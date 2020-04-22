<template>
  <div class="content">
    <div class="login">
      <img src="../../assets/image/logo@2x.png" alt="">
    </div>
    <div class="title">
      感受分布式商业 <br />
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
          @input="handelInput"
          data-type="phone"
          placeholder="手机号"
          :error-message="phoneErr"
          maxlength="11"
        ></van-field>
      </van-cell-group>

      <van-field
        v-model="sms"
        center
        clearable
        label=""
        placeholder="验证码"
        maxlength="4"
      >
        <template #button>
          <van-button size="small" type="primary" :disabled="isSend" @click="sendSMS"><span
            v-if="isSend">剩余</span>{{leftTime}}
          </van-button>
        </template>
      </van-field>

      <van-button type="primary" :disabled="!isOk" @click="submitForm" block size="normal">帮Ta认证
      </van-button>
      <div class="userAgreement">
        登录即代表同意<a href="https://www.lingzhushijie.com/lingzhuPrivacy.html" class="text">《用户协议》</a>和
        <a href="https://www.lingzhushijie.com/lingzhu2PrivacyPolicy.html" class="text">《隐私政策》</a>
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
        user: {
          name:'六个字的昵称'
        }
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

<style lang="less">
  .login {
    margin-top: 70px;
  }
  .van-cell {
    padding-left: 0;
    padding-right: 0;
  }
  .van-button--small {
    height: 34px;
    line-height: 34px;
  }
  .van-field__control {
    padding: 5px;
    border-radius: 3px;
    background: #dcdee0;
  }
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-top: 25px;
  }

  .user {
    font-size: 14px;
    font-weight: bold;
    margin-top: 18px;
  }
  .form {
    padding: 20px 50px;
    box-sizing: border-box;
  }

  .userAgreement {
    margin-top: 20px;
    font-size: 10px;
    color: #282828;
    text-align: right;
    .text {
      font-size: 12px;
      color: #42b983;
    }
  }

</style>
