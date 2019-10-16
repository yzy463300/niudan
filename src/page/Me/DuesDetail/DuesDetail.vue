<template>
  <div class="duesdetail" v-if='data.fee_list'>
    <div class="header"></div>
    <div class="top bbox">
      <p class="p1">加入<span>{{data.join_day}}</span>天</p>
      <p class="p2">距离下次会费缴纳剩余{{data.fee_day}}天</p>
      <p class="p3">
        <van-button size="small" type="info" @click='onBuy'>缴纳会费</van-button>
      </p>
    </div>
    <div class="lists">
      <van-cell-group>
        <div class="tip"><span class="line"></span><span class="text">缴纳记录</span><span class="line"></span></div>
        <van-cell v-for="item in data.fee_list" :title="item.pay_type" :value="'+'+item.money+'元'" :label="new Date(+item.addtime*1000).Format('yyyy-MM-dd hh:mm')" />
        <p class="t tc" v-if='data.fee_list.length <= 0'>暂无更多</p>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getMembershipFeeInfo,payMemberFee } from '@/service/getData.js'
export default {
  data () {
    return {
      data:{
        hasDay:175,
        surplusDay:189,
        lists:[
          {
            time:'2017/12/14  5:30:12',
            price:3000
          }
        ]
      }
    }
  },
  props:{
    
  },
  mounted(){
  },
  async activated(){
    const res =await getMembershipFeeInfo()
    this.data = res.data

  },
  methods:{
   onClick(){
    // this.$emit('dues-click')
   },
   async onBuy(action, done){
      const res = await payMemberFee()
      if (res) {
        this.jsApiCall(res.data)
      }
   },
   jsApiCall(data){
     wx.chooseWXPay({
       timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
       nonceStr: data.nonce_str, // 支付签名随机串，不长于 32 位
       package: `prepay_id=${data.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
       signType: data.sign_type, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
       paySign: data.paySign, // 支付签名
       success(res) {
         // 支付成功后的回调函数
         this.$dialog.alert({message:'支付成功'})
         .then(()=>{
           this.$router.push({path:'/myTicket'})
         })
       }
     });
   },
  },
  components:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .lists{
    margin-top: .4rem;
    .t{
      padding-bottom: .3rem;
    }
    .tip{
      padding: .3rem 0;
      background-color: #fff;
      color: #3596FD;
      font-size: .28rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .text{
        padding: 0 .15rem;
      }
      .line{
        display: inline-block;
        width: .35rem;
        height: .02rem;
        background-color: #3596FD;
      }
    }
  }
  .header{
    width: 100%;
    height: 2.56rem;
    background-image: url(../../../assets/me_bg.jpg);
  }
  .top{
    width: 6.9rem;
    height: 2.4rem;
    background-color: #fff;
    border-radius: .1rem;
    margin: 0 auto;
    margin-top: -1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .p1{
      span{
        font-size: .34rem;
        font-weight: bold;
      }
    }
    .p2{
      padding: .15rem 0;
    }
    .p3{

    }
  }
</style>
