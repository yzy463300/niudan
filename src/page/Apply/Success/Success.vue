<template>
  <div class="wrap">
    <div class="main vtc tc">
      <p class="icon"><van-icon name="passed" color="#3596FD" size="10em"/></p>
      <p class="p1">报名成功</p>
      <p class="p2">进入个人中心查看电子门票</p>
      <van-button size="large" type="info" class="btn" @click='checkTicket()'>查看门票</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      join_id:''
    }
  },
  mounted(){
  },
  activated(){
    this.join_id = this.$route.query.join_id
  },
  methods:{
    async checkTicket(){
      this.$router.replace({path:'orderDetail',query:{join_id:this.join_id}})
    }
  },
  components:{},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .wrap{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    .main{
      width: 5rem;
    }
    .btn{
      margin-top: .6rem;
    }
    .p1{
      font-size: .48rem;
      font-weight: bold;
    }
    .p2{
      font-size: .26rem;
      color: #979797;
      padding: .2rem 0;
    }
  }
</style>
