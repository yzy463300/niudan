<template>
  <div class="wrap">
    <div class="top bbox" @click='gotoUserinfo'>
      <div class="l">报名人信息</div>
      <div class="r">
        {{data.name}}({{data.mobile}})
        <van-icon name="arrow" color="#3596FD"/>
      </div>
    </div>
    <div class="main">
      <div class="head bbox">
        <div class="left"><img :src="data.thumb_img" height="131" width="201" alt=""></div>
        <div class="right">
          <div class="van-ellipsis p1 text">{{data.title}}</div>
          <p class="p2 text">时间：{{new Date(+data.start_time2*1000).Format("yyyy-MM-dd hh:mm")}}开始</p>
          <p class="p3 text">线上活动</p>
        </div>
      </div>
      <div class="tiket_wrap bbox">
        <div class="tiket bbox">
          <div class="left">
            <div class="tiket_top">
              <div class="title">{{data.title}} <span class="price">¥ {{data.total_amount/100}}</span></div>
              <div class="name">{{data.name}} ({{data.mobile}})</div>
            </div>
            <div class="bottom">
              <div class="btn" v-if='data.join_type == 2 && data.status == 0' @click='show = true'>申请退款</div>
              <div class="status" v-if='data.status == 0'>待参与</div>
              <div class="status" v-if='data.status == 1'>已使用</div>
              <div class="status" v-if='data.status == 2'>已申请退款</div>
              <div class="status" v-if='data.status == 3'>已过期</div>
            </div>
          </div>
          <div class="right" @click='checkTicket()'>
            查看电子票
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="w1">
        <div class="item bbox">
          <div class="left">票总价</div>
          <div class="right">¥ {{data.total_amount/100}}</div>
        </div>
        <div class="item bbox">
          <div class="left">订单实际支付金额</div>
          <div class="right">¥ {{data.total_amount/100}}</div>
        </div>
      </div>
      <div class="w2 bbox">
        <div class="p1">订单编号：{{data.order_no || '无'}}</div>
        <div class="p1">创建时间：{{new Date(+data.add_time*1000).Format("yyyy-MM-dd hh:mm")}}</div>
        <!-- <div class="p1">支付方式：微信</div> -->
      </div>
      <div class="btn_wrap">
        <van-button size="large" type="info" @click='gotoCenter()'>进入个人中心</van-button>
      </div>
    </div>
    <van-popup v-model="show">
      <div class="reason_wrap bbox">
        <div class="area">
          <Ytextarea class="" @input='onInput' :placeholder='placeholder' :length='500'></Ytextarea>
        </div>
        <van-button class='bt' type="info" size='large' @click='tuikuan'>确认退款</van-button>
        <van-button class='bt' type="info" plain  size='large' @click='show = false'>取消</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { activityJoinDetail,activityRefundRequest } from '@/service/getData.js'
import Ytextarea from '@/components/Ytextarea'
export default {
  data () {
    return {
      placeholder:'请填写退款原因',
      show:false,
      data:{},
      refund_reason:'',
    }
  },
  mounted(){
  },
  async activated(){
    this.join_id = this.$route.query.join_id
    const res = await activityJoinDetail({join_id:this.join_id})
    if (res) {
      this.data = res.data
    }
  },
  methods:{
    onInput(value){
      this.refund_reason = value
    },
    async tuikuan(){
      if (!this.refund_reason) {
        this.$dialog.alert({message:'请填写退款原因'})
        return
      }
      const res = await activityRefundRequest({join_id:this.join_id,refund_reason:this.refund_reason})
      if (res) {
        this.$dialog.alert({message:'退款申请成功'})
        this.$router.replace({path:'/myTicket'})
      }

    },
    gotoUserinfo(){
      this.$router.push({path:'/userinfo'})
    },
    checkTicket(){
      this.$router.push({path:'checkTicket',query:{join_id:this.join_id}})
    },
    gotoCenter(){
     this.$router.push({path:'/meCenter'})
    }
  },
  components:{
    Ytextarea
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .reason_wrap{
    width: 6.5rem;
    padding: .4rem;
    border-radius: 0.1rem;
    .area{
      height: 4rem;
    }
    .bt{
      margin-top: .25rem;
    }

  }
  .tiket{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding-right: .7rem;
    padding-left: .55rem;
    .left{
      width:4.5rem;
      display: flex;
      flex-direction: column;
      .bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn{
          height: .46rem;
          display: flex;
          align-items: center;
          border-radius: .1rem;
          color: #fff;
          padding: 0 .2rem;
          border:.02rem solid #fff;
        }
        .status{
          color: #FFD169;
        }
      }
      .tiket_top{
        display: flex;
        flex-direction: column;
        .title{
          font-size: .32rem;
          font-weight: bold;
          .price{
            color: #FFD169;
          }
        }
        .name{
          margin-bottom: .4rem;
        }
      }
    }
    .right{
      width: .3rem;
    }
  }
  .btn_wrap{
    padding: .4rem;
  }
  .w2{
    padding: .3rem ;
    background-color: #fff;
    .p1{
      height: .6rem;
      line-height: .6rem;
      color: #979797;
    }
  }
  .w1{
    .item{
      height: .8rem; 
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 0 .3rem;
      border-bottom: .02rem solid #f6f6f6;
      .right{
        color: #FFB100;
      }
    }
  }
  .main{
    .head{
      margin-top: .3rem;
      background-color: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: .3rem;
      border-bottom: .02rem solid #f6f6f6;
      .left{
        margin-right: .3rem;
        img{
          width: 2rem;
          height: 1rem;
        }
      }
      .right{
        .text{
          width: 4.5rem;
        }
        .p2{  
          color: #979797;
        }
        .p3{
          color: #979797;
        }
      }
    }
    .tiket_wrap{
      padding: .3rem 0;
      background-color: #fff;
      .tiket{
        margin: 0 auto;
        width: 7.06rem;
        height: 2.48rem;
        background-image: url(../../../assets/tiket.png);
        background-size: cover;
      }
    }
  }
  .top{
   padding: .3rem;
   background-color: #fff;
   display: flex;
   justify-content: space-between;
    .l{

    }
    .r{
       display: flex;
       align-items: center;
    }
  }
</style>
