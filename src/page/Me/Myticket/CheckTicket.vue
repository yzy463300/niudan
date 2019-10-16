<template>
  <div class="checkticket" v-if="data.join_id">
    <div class="ticket bbox">
      <div class="top">
        <div class="price">费用： <span>{{data.total_amount}}元</span></div>
        <div class="name">{{data.name}}({{data.mobile}})</div>
      </div>
      <div class="main">
        <div class="qrcode_wrap">
          <img :src="data.thumb_img || 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png'" alt="">
        </div>
        <div class="status" v-if="data.status == 0">
          <p class="tip tc">出示给核销员扫码或密码核销</p>
          <div class="password_wrap">
            <!-- 密码输入框 -->
            <van-password-input
              :value="password"
              :length='length'
              @focus="showKeyboard = true"
            />
            <!-- 数字键盘 -->
            <van-number-keyboard
              :show="showKeyboard"
              @input="onInput"
              @delete="onDelete"
              @blur="showKeyboard = false"
            />
          </div>
        </div>
        <div class="success tc" v-if="data.status == 1">已核销</div>
        <div class="success tc" v-if="data.status == 2">已申请退款</div>
        <div class="fail tc" v-if="data.status == 3">已过期</div>
      </div>
      <div class="bottom bbox">
        <div class="item bbox" @click='titleClick'>
          <span class="text">{{data.title}}</span>
          <van-icon name="arrow" color="#3596FD"/>
        </div>
        <div class="item bbox"><span class="text">时间：{{new Date(+data.start_time2*1000).Format("yyyy-MM-dd hh:mm")}}</span></div>
        <div class="item bbox"><span class="text">地点：{{data.address}}</span></div>
        <div class="item bbox" @click='sponsorClick'>
          <span class="text">主办方: {{data.sponsor}}</span>
          <!-- <van-icon name="arrow" color="#3596FD"/> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { activityJoinDetail,activityConsume } from '@/service/getData.js'
export default {
  data () {
    return {
      join_id:0,
      length:4,
      password:'',
      showKeyboard: false,
      data:{
        price:'50元',
        name:'稍等阿斯',
        tel:'18973855301',
        qrcode:require('../../../assets/home/home_thumb.png'),
        title:'2018企业申报政策项目年度总结系列培训 (第六期)',
        time:'2018-05-18 16:00',
        address:'长沙市天心区书院南路天心电子世界108号',
        sponsor:'长沙电子商务协会',
        status:3
      }
    }
  },
  watch:{
    password(){
      console.log(this.password)
      if (this.password.length == 4) {
        this.submitPassword()
        this.$emit('submit-password',this.password)
      }
    }
  },
  async activated(){
    this.join_id = this.$route.query.join_id
    const res = await activityJoinDetail({join_id:this.join_id})
    this.data = res.data
  },
  methods:{
    async submitPassword(){
      const res = await activityConsume({
        join_id:this.join_id,
        password:this.password
      })
      if (res.errcode == 0) {
        this.alert('核销成功')
        const res = await activityJoinDetail({join_id:this.join_id})
        this.data = res.data
      }else{
        this.password = ''
      }


    },
    titleClick(){
      this.$router.replace({path:'/action',query:{activity_id:this.data.activity_id}})
    },
    sponsorClick(){
      this.$emit('sponsor-click')
    },
    onInput(key) {
      this.password = (this.password + key).slice(0, 4);
    },
    onDelete() {
      this.password = this.password.slice(0, this.password.length - 1);
    }
  },
  components:{},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .fail{
    color: #979797;
    font-size: .38rem;
  }
  .success{
    color: #00CA39;
    font-size: .38rem;
  }
  .bottom{
    padding: 0 .2rem;
    padding-right: .4rem;
    height: 2.6rem;
    position: absolute;
    bottom: .1rem;
    left: .1rem;
    width: 100%;
    .item{
      height: 25%;
      width: 100%;
      font-size: .24rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text{
        width: 5rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .item:nth-of-type(1){
      border-bottom: .02rem solid #f6f6f6;
    }
    .item:nth-of-type(2){
      border-bottom: .02rem solid #f6f6f6;
    }
    .item:nth-of-type(3){
      border-bottom: .02rem solid #f6f6f6;
    }
  }
  .qrcode_wrap{
    margin: .3rem auto;
    border-radius: .1rem;
    padding: .16rem;
    width: 2.12rem;
    height: 2.12rem;
    box-shadow: 0 0 10px #ccc;
    img{
      width:2.12rem;
      height:2.12rem;
    }
  }
  .tip{
    color:#979797;
    font-size: .28rem;
    margin-bottom: .2rem;
  }
  .ticket{
    position: relative;
    margin: .4rem auto;
    width: 7.06rem;
    height: 9.29rem;
    background-image: url(../../../assets/ticket_bg.png);
    background-size: cover;
    padding: 0 .3rem;
    .top{
      padding-top: .07rem;
      height: 1.4rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      font-size: .28rem;
      .price{
        span{
          color: #FFD169;
        }
      }
    }
  }
</style>
