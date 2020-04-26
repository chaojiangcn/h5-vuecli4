<template>
  <div class="login">
    <div class="login">
      <img src="../../assets/image/logo@2x.png" alt="">
    </div>
    <div class="title">
      已帮Ta认证成功
    </div>
    <div class="form">
      <van-button type="primary" @click="hanleClick" size="large">打开APP查看跟多内容</van-button>
    </div>
    <div class="showTisi" v-if="isWechat && showTisi" @click="showTisi=false">
      <img :src="imgUrl" alt="">
    </div>
  </div>
</template>

<script>
  import Device from '@utils/device'
  import { Button } from 'vant'

  export default {
    name: 'Index',
    components: {
      [Button.name]: Button
    },
    created() {
      this.initData()
    },
    data() {
      return {
        showTisi: false,
        isWechat: false
      }
    },
    methods: {
      initData() {
        document.title = '快来领主推荐，感受分布式商业'
        this.isWechat = Device.wechat
      },
      download(){
        window.location.href = 'http://d.lingzhuworld.cn'
      },
      // 点击事件处理
      hanleClick() {
        console.log(111)
        this.download();
        // const self = this
        // if (self.isWechat) {
        //   self.showTisi = true
        // } else if (!self.isWechat) {
        //   console.log('22')
        //     const param = JSON.stringify({
        //       pid: this.orderId
        //     })
        //     if (self.state !== 1) {
        //       self.openApp(`lingzhuworld://recommend/lord?tab=1&action=2&param=${param}`, `lingzhuworld://recommend/lord?tab=1&action=2&param=${param}`, self.download)
        //     } else {
        //       // self.openApp(`lingzhuworld://recommend/lord?tab=1&action=2&param=`+param,`lingzhu-applinks://${encodeURIComponent(`http://www.lingzhu.com?pid=${self.orderId}&type=1`)}`,self.download)
        //       self.openApp(`ofbank://com.ofbank.lord/product?pid=${self.orderId}&type=1`, `lingzhu-applinks://${encodeURIComponent(`http://www.lingzhu.com?pid=${self.orderId}&type=1`)}`, self.download)
        //     }
        //   }
      },
      // 打开APP
      openApp(url, iosUrl, callback) {
        const {
          isAndroid, isIOS, isIOS9
        } = this.detectVersion()
        if (isAndroid || isIOS) {
          let timeout,
            t = 4000,
            hasApp = true
          const openScript = setTimeout(function() {
            if (!hasApp) {
              callback && callback()
            }
            document.body.removeChild(ifr)
          }, 5000)

          const t1 = Date.now()
          let ifr = document.createElement('iframe')
          if (isAndroid) {
            ifr.setAttribute('src', url)
          } else {
            ifr.setAttribute('src', iosUrl)
          }

          ifr.setAttribute('style', 'display:none')
          document.body.appendChild(ifr)

          timeout = setTimeout(() => {
            let t2 = Date.now()
            if (t2 - t1 < t + 100) {
              hasApp = false
            }
          }, t)
        }

        if (isIOS9) {
          location.href = iosUrl
          setTimeout(() => {
            callback && callback()
          }, 500)
        }
      },
      // 识别手机系统版本
      detectVersion() {
        let isAndroid,
          isIOS,
          isIOS9,
          version,
          u = navigator.userAgent,
          ua = u.toLowerCase()

        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // android终端或者uc浏览器
          // Android系统
          isAndroid = true
        }

        if (ua.indexOf('like mac os x') > 0) {
          // ios
          const regStr_saf = /os [\d._]*/gi
          const verinfo = ua.match(regStr_saf)
          version = (`${verinfo}`).replace(/[^0-9|_.]/ig, '')
            .replace(/_/ig, '.')
        }
        const version_str = `${version}`
        if (version_str != 'undefined' && version_str.length > 0) {
          // eslint-disable-next-line radix
          version = parseInt(version)
          if (version >= 8) {
            // ios9以上
            isIOS9 = true
          } else {
            isIOS = true
          }
        }
        return {
          isAndroid,
          isIOS,
          isIOS9
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .login {
    margin-top: 50px;
  }

  .form {
    padding: 50px;
    box-sizing: border-box;
  }

  .title {
    margin-top: 50px;
  }

  .showTisi {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    text-align: right;

    img {
      width: 70%;
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
    }
  }

</style>
