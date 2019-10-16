<template>
  <div class="detail">
    <img v-if="check_status == 1" src="../../../assets/check_success.png" alt="" class="check_icon">
    <img v-if="check_status == 2" src="../../../assets/check_fail.png" alt="" class="check_icon">
    <!-- <div class="top">
      <div class="head_wrap"><img src="../../../assets/home/home_thumb.png" height="131" width="201" alt=""></div>
      <div class="text">
        <p class="name">{{name}}</p>
        <p class="status" v-if="check_status == 0">等待审批</p>
        <p class="status" v-if="check_status == 1">等待审批</p>
        <p class="status" v-if="check_status == 2">等待审批</p>
      </div>
    </div> -->
    <div class="content">
      <!-- <div class="ctx"><span class="l">单位名称:</span><span class="r">湖南虫洞文化传播有限公司</span></div> -->
      <div class="ctx"><span class="l">活动名称:</span><span class="r">{{title}}</span></div>
      <div class="ctx"><span class="l">姓名:</span><span class="r">{{name}}</span></div>
      <div class="ctx"><span class="l">职务:</span><span class="r">{{position}}</span></div>
      <div class="ctx"><span class="l">手机:</span><span class="r">{{mobile}}</span></div>
      <div class="ctx"  v-if="check_status == 0"><span class="l">审核状态:</span><span class="r">等待审核</span></div>
      <div class="ctx"  v-if="check_status == 1"><span class="l">审核状态:</span><span class="r">审核通过</span></div>
      <div class="ctx"  v-if="check_status == 2"><span class="l">审核状态:</span><span class="r">审核未通过</span></div>
      <div class="ctx"><span class="l">申请时间:</span><span class="r">{{new Date(+add_time*1000).Format("yyyy-MM-dd")}}</span></div>
    </div>
<!--     <div class="bottom">
      <van-steps direction="vertical" >
        <van-step>
          <h3>{{name}}</h3>
          <h4>发起申请</h4>
          <p>{{new Date(+add_time*1000).Format("yyyy-MM-dd")}}</p>
        </van-step>
        <van-step v-if='check_status == 2'>
          <h3>{{name}}</h3>
          <h4>已拒绝</h4>
          <p>
            {{check_msg}}
          </p>
        </van-step>
        <van-step v-if='check_status == 2'>
          <h3>{{name}}</h3>
          <h4>已同意</h4>
        </van-step>
      </van-steps>
    </div> -->
    <div class="btn_wrap" v-if='!rejectShow'>
      <div class="left_btn" @click='onReject()'>拒绝</div>
      <div class="right_btn" @click='zantong()'>同意</div>
    </div>
    <CheckReject class="" @confirm='confirm' @cancel='rejectShow = false' v-show='rejectShow'></CheckReject>
  </div>
</template>

<script>
import { freeJoinActivityRequestCheck } from '@/service/getData.js'
import CheckReject from '@/page/Me/Check/CheckReject'
export default {
  data () {
    return {
      rejectShow:false,
      is_pass:0,
      check_msg:'',
      request_id:0,
      check_status:0,
      name:'',
      position:'',
      mobile:'',
      add_time:'',
      title:'',
      check_msg:'',
    }
  },
  mounted(){
  },
  async activated(){
    this.request_id = this.$route.query.request_id
    this.check_msg = this.$route.query.check_msg
    this.check_status = this.$route.query.check_status
    this.name = this.$route.query.name
    this.position = this.$route.query.position
    this.mobile = this.$route.query.mobile
    this.add_time = this.$route.query.add_time
    this.title = this.$route.query.title
    this.check_msg = this.$route.query.check_msg
  },
  methods:{
    async confirm(value){
      this.check_msg = value
      if (!this.check_msg) {
        this.$dialog.alert({message:'请填写拒绝理由'})
        return
      }
      const res = await freeJoinActivityRequestCheck({
        request_id:this.request_id,
        is_pass:this.is_pass,
        check_msg:this.check_msg
      })
      if (res) {
        this.rejectShow = false
        this.$dialog.alert({message:'已拒绝'})
        .then(()=>{
          this.$router.go(-1)
        })
      }
    },
    async onReject(){
     this.is_pass = 0
     this.rejectShow = true
    },
    async zantong(){
     this.is_pass = 1
     const res = await freeJoinActivityRequestCheck({
       request_id:this.request_id,
       is_pass:this.is_pass,
       check_msg:this.check_msg
     })
     if (res) {
       this.$dialog.alert({message:'已同意'})
       .then(()=>{
         this.$router.go(-1)
       })
     }
    },
  },
  components:{
    CheckReject
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.detail{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
  .check_icon{
    position: absolute;
    right: .3rem;
    top: .8rem;
    width: 1.4rem;
    height: 1.05rem;
  }
  .bottom{
    margin-top: .3rem;
    background-color: #fff;
  }
  .content{
    padding: .3rem;
    background-color: #fff;
    .ctx{
      line-height: .55rem;
    }
    .l{
      display: inline-block;
      width: 1.3rem;
      text-align: justify;
      text-justify:inter-ideograph;
    }
  }
  .top{
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: .3rem .3rem;
    border-bottom: .02rem solid #f6f6f6;
    .status{
      color: #979797;
    }
  }
  .head_wrap{
    margin-right: .2rem;
    width: .6rem;
    height: .6rem;
    border-radius: .3rem;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .btn_wrap{
   width: 100%;
   display: flex;
   height: 1rem;
   color: #fff;
   line-height: 1rem;
   text-align: center;
   font-size: .32rem;
   position: fixed;
   z-index: 50;
   left: 0;
   bottom: 0;
   .left_btn{
     width: 50%;
     background-color: rgba(254,0,0,1);
   }
   .right_btn{
     width: 50%;
     background-color: rgba(53,150,253,1);
   }
  }
</style>
