// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router'
import {AlertPlugin,LoadingPlugin,ToastPlugin,ConfirmPlugin } from 'vux'
import Weixin from './utils/weixin.js'
import './style/common.less'
import axios from 'axios'
import config from './config/index.js'
import Vant  from 'vant'
import { Lazyload,PasswordInput,NumberKeyboard,Dialog,Toast,Uploader,ImagePreview,Picker,Popup } from 'vant';
import 'vant/lib/index.css';
window.thumb = 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png'
Vue.config.productionTip = false
Weixin({
 img_url : require('./assets/logo.png'),
 link : location.href,
 title : '商协云',
 desc : '商协云~'
});
Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(Dialog);
Vue.use(Uploader);
Vue.use(Toast);
Vue.use(ImagePreview);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(PasswordInput).use(NumberKeyboard);
Vue.prototype.$axios = axios
Vue.prototype.$instance = axios.create({
  baseURL:config.baseURL
})

Vue.prototype.loading = function(text){
	this.$vux.loading.show({
	  text:text
	})
}
Vue.prototype.alert = function(text){
  this.$vux.alert.show({
    title:'提示',
    content:text
  })
}
Vue.prototype.confirm = function(text){
  this.$vux.confirm.show({
    title:'提示',
    content:text
  })
}
Vue.prototype.toast = function(text){
	this.$vux.toast.show({
		type:'warn',
		text:text
	})
}
/* eslint-disable no-new */
window.$vvue =  new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

document.addEventListener('click', (e) => {
    if(e.target && e.target.nodeName == 'IMG') e.preventDefault();
}, { passive: false } );

$('body').on('blur','textarea,input,select', function(event) {
  setTimeout(() => {
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  }, 100);
});

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}