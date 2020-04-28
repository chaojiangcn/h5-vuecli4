<template>
  <div id="imgCon" class="img-con">
    <img
      v-for="item in imgUrls"
      :key="item.key"
      :src="item.smallImg"
      :data-src="item.largeImg"
      alt="图片1"
    >
  </div>
</template>

<script>
  /**
   * 高清照片渐进式加载
   */
  export default {
    name: 'LargeImageLoad',
    props: {
      url: Array
    },
    data() {
      return {
        imgUrls: []
      }
    },
    created() {
      this.imgUrls = [
        {
          smallImg: 'https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20',
          largeImg: 'https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg'
        },
        {
          smallImg: 'https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20',
          largeImg: 'https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg'
        },
        {
          smallImg: 'https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20',
          largeImg: 'https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg'
        }
      ]
    },
    mounted() {
      const imgCon = document.getElementById('imgCon')
      const imgs = imgCon.getElementsByTagName('img')
      for (let i = 0; i < imgs.length; i++) {
        (function(curImg) {
          console.log(curImg)
          let tempImg = null
          tempImg = document.createElement('img')
          tempImg.src = curImg.dataset.src
          tempImg.onload = function(e) {
            curImg.src = tempImg.src
            curImg.style.filter = 'blur(0px)'
          }
        })(imgs[i])
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .img-con img {
    width: 100%;
    height: 400px;
    -webkit-transition: filter .3s ease-out 0s;
    -moz-transition: filter .3s ease-out 0s;
    transition: filter .3s ease-out 0s;
    filter: blur(10px);
    -ms-filter: blur(10px);
    -webkit-filter: blur(10px);
  }
</style>
