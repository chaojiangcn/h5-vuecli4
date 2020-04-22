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
          <van-button size="small" type="primary" @click="sendSMS">{{leftTime}}</van-button>
        </template>
      </van-field>

      <van-button type="primary" :disabled="!isOk" @click="submitForm" size="large">帮Ta认证</van-button>
      <div class="userAgreement">
          登录即代表同意<a href="@" class="text">《用户协议》</a>和<a href="@" class="text">《隐私政策》</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { Row, Col, Field, Button } from 'vant';
  import { _testHook } from '@utils/validator';
  import  apis  from '../../apis/index'

  export default {
    name: 'index',
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
        isOk: false,
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
        }
        apis.userApis.login(param).then(res => {
          console.log(res);
          self.leftTime = 60;
          setInterval(()=>{
            self.leftTime--
          },1000)
        })
      },

      submitForm() {
        let self = this;
        console.log('登录提交', self);

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
      color:#42b983;
    }
  }

</style>
