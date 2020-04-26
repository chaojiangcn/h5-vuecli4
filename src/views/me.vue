<template>
  <div>
    {{userInfo}}
    <button @click="test">更新用户信息</button>
    <h1>{{checkoutStatu}}</h1>{{des}}<p />
    <p>{{checkoutStatu}}</p>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'Me',
    data() {
      return {
        des: '的个人中心'
      }
    },
    computed: {
      ...mapState({
        checkoutStatu: state => state.user.userInfo.name
      }),
      ...mapGetters('user', {
        products: 'cartProducts',
        total: 'cartTotalPrice',
        userInfo: 'getUserInfo'
      })
    },
    methods: {
      test() {
        const userInfo = {
          name: '我是修改后的名字',
          age: 23
        }
        this.$store.dispatch('user/updateUserInfo', userInfo)
      }
    }
  }
</script>

<style scoped>

</style>
