// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(ElementUI);

let browser={  
  versions:function(){   
         let u = navigator.userAgent, app = navigator.appVersion;   
         return {//移动终端浏览器版本信息   
              trident: u.indexOf('Trident') > -1, //IE内核  
              presto: u.indexOf('Presto') > -1, //opera内核  
              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
              gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
              mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
              android: u.indexOf('Android') > -1, //android终端或者uc浏览器  
              iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器  
              iPad: u.indexOf('iPad') > -1, //是否iPad    
              webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部  
              weixin: u.indexOf('MicroMessenger') > -1, //是否微信   
              qq: u.match(/\sQQ/i) == " qq" //是否QQ  
          };  
       }(),  
       language:(navigator.browserLanguage || navigator.language).toLowerCase()  
}   


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data:{isMoblie:(browser.versions.mobile || browser.versions.ios || browser.versions.android ||   
    browser.versions.iPhone || browser.versions.iPad)}
})
