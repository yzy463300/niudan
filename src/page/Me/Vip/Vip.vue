<template>
  <div class="vip">
    <p class="title">填写会员服务信息</p>
    <div class="text_wrap">
      <ytextarea class="" length="2000" v-model="value"></ytextarea>
    </div>
    <van-button size="large" type="info" class='btn' @click='onSubmit'>提交</van-button>
  </div>
</template>

<script>
import ytextarea from '../../../components/Ytextarea.vue'
export default {
  data () {
    return {
      value:''
    }
  },
  mounted(){
  },
  activated(){},
  methods:{
   onSubmit(){
    this.$emit('on-submit',this.value)
   }
  },
  components:{
    ytextarea
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
 .vip{
  background-color: #fff;
  padding: .6rem .3rem;
  .btn{
    margin-top: .4rem;
  }
  .title{
    font-size: .38rem;
    font-weight: bold;
    margin-bottom: .3rem;
  }
 }
 .text_wrap{
  height: 6rem;
 }
</style>
