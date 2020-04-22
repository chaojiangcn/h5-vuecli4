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

      <van-button type="primary" @click="submitForm" size="large">登录</van-button>

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
        console.log(arguments);
        let _this = this;
        let param = {
          phone: _this.phone
        }
        console.log(apis);
        apis.userApis.login(param).then(res => {
          console.log(res);
          _this.leftTime = 60;
          setInterval(()=>{
            _this.leftTime--
          },1000)
        })
      },

      submitForm() {
        let _this = this;
        console.log('登录提交', _this);
      }
    }
  };
</script>

<style scoped>
  .form {
    padding: 50px;
    box-sizing: border-box;
  }
</style>
