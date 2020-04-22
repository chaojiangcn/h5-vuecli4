const { userAgent: UA } = window.navigator;
const UA_L = UA.toLowerCase();
const Device = {
  trident: UA.includes('Trident'),         //IE内核
  presto: UA.includes('Presto'),           //opera内核
  iPad: UA.includes('iPad'),               //是否iPad
  iPhone: UA.includes('iPhone'),           //是否为iPhone或者QQHD浏览器
  webKit: UA.includes('AppleWebKit'),      //苹果、谷歌内核
  webApp: UA.indexOf('Safari') === -1,     //是否web应该程序，没有头部与底部
  mobile: !!UA.match(/AppleWebKit.*Mobile.*/),                        //是否为移动终端
  ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),                   //ios终端
  android: UA.includes('Android') || UA.includes('Linux'),     //android终端或uc浏览器
  gecko: UA.includes('Gecko') && UA.indexOf('KHTML') === -1,   //火狐内核
  wechat: UA_L.toLowerCase()
    .match(/MicroMessenger/i) == 'micromessenger',     // 微信
  is: key => Device[key]
};
export default Device;
