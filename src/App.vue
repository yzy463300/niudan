<template>
  <div id="app" v-if='isShow'>
  	<keep-alive class="">
    	<router-view/>
  	</keep-alive>
  	<Tabbar v-show='navShow'></Tabbar>
  </div>
</template>

<script>
import {checkGhLogin} from './service/getData.js'
import Tabbar from '@/components/Tabbar/Tabbar'
export default {
  	name: 'App',
  	data () {
	    return {
	    	navShow:false,
	    	isShow:false
	    }
	},
	methods:{
	},
	components:{
		Tabbar
	},
	async created(){
		console.log(this.$route.path)
		const return_url = location.href
		const res = await checkGhLogin({return_url})
		if (+res.errcode == 0) {
			this.isShow = true
		}else if (res.errcode == -2) {
			location.replace(res.data.auth_url)
		}else{
			this.$dialog.alert({
			  message: res.errmsg
			});
		}
		this.navShow = true
		switch (this.$route.path) {
		  case '/':
		    this.active = 0;
		    break;
		  case '/list':
		    this.active = 1;
		    break;
		  case '/photoAlbum':
		    this.active = 2;
		    break;
		  case '/contacts':
		    this.active = 3;
		    break;
		  case '/meCenter':
		    this.active = 4;
		    break;
		  default:
		    this.active = 0;
		    this.navShow = false
		}
		this.$router.beforeEach((to, from, next) => {
		    this.navShow = true
		    switch (to.path) {
		      case '/':
		        this.active = 0;
		        break;
		      case '/list':
		        this.active = 1;
		        break;
		      case '/photoAlbum':
		        this.active = 2;
		        break;
		      case '/contacts':
		        this.active = 3;
		        break;
		      case '/meCenter':
		        this.active = 4;
		        break;
		      default:
		        this.active = 0;
		        this.navShow = false
		    }
		  	next()
		  // ...
		})
	}
}
</script>

<style  lang='less' >

</style>
