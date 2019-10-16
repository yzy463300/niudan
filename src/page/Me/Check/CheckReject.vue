<template>
  <div class="reject bbox">
    <p class="title">输入拒绝理由：</p>
    <div class="text_wrap">
      <Ytextarea length="2000" @input='onChange'></Ytextarea>
    </div>
    <van-button size="large" type="info" @click='confirm'>确认拒绝</van-button>
    <van-button size="large" type="danger" class='cancel' @click='cancel'>取消</van-button>
  </div>
</template>

<script>
import Ytextarea from '../../../components/Ytextarea.vue'
export default {
  data () {
    return {
      value:'',
    }
  },
  mounted(){

  },
  activated(){},
  methods:{
    onChange(value){
      this.value = value
    },
   confirm(){
     this.$emit('confirm',this.value)
   },
   cancel(){
     this.$emit('cancel')
   }
  },
  components:{
    Ytextarea
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .cancel{
    margin-top: .3rem;
  }
  .reject{
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: .7rem .4rem;
    background-color: #fff;
    .title{
      margin-bottom: .3rem;
    }
  }
  .text_wrap{
    margin: 0 auto;
    background-color: #fff;
    width: 100%;
    height: 4rem;
    margin-bottom: .7rem;
  }
</style>
