<template>
  <div class="tabbar" v-show='isShow'>
    <van-tabbar v-model="active" :z-index='zIndex' safe-area-inset-bottom='true'>
      <van-tabbar-item v-for="(item,index) in icon" :key='index' :to="to[index]" safe-area-inset-botto='true'>
        <span>{{item.text}}</span>
        <img 
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.active : item.normal" alt="">
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow:true,
      nowPath:'',
      active:0,
      icon:[
        {
          text:'首页',
          normal:require('@/assets/icon/icon1.png'),
          active:require('@/assets/icon/icon1_active.png')
        },
        {
          text:'报名',
          normal:require('@/assets/icon/icon2.png'),
          active:require('@/assets/icon/icon2_active.png')
        },
        {
          text:'图库',
          normal:require('@/assets/icon/icon5.png'),
          active:require('@/assets/icon/icon5_active.png')
        },
        {
          text:'通讯',
          normal:require('@/assets/icon/icon3.png'),
          active:require('@/assets/icon/icon3_active.png')
        },
        {
          text:'我的',
          normal:require('@/assets/icon/icon4.png'),
          active:require('@/assets/icon/icon4_active.png')
        },
      ],
      to:['/','/list','/photoAlbum','/contacts','/meCenter']
    }
  },
  props:{
    zIndex:Number,
  },
  updated(){
  },
  created(){
  },
  mounted(){
    
  },
  activated(){
  },
  methods:{       
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
 
</style>
