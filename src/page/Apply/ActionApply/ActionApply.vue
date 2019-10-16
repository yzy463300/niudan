<template>
  <div class="wrap" v-if="data.activity_id">
    <div class="top bbox">
      <img src="../../../assets/action_cri.png" class="bg">
      <img :src="data.thumb_img || 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png'" height="131" width="201" alt="" class="photo">
      <p class="title">{{data.title}}</p>
      <div class="little_wrap">
        <p class="little">
          <van-icon class="i1" name="eye-o" size="1.5em"/>浏览数:{{data.view_count}}<van-icon class="i2" name="notes-o" size="1.5em"/>报名:{{data.join_count}}
        </p>
      </div>
    </div>
    <div class="scene">
      <div class="icon bbox time"><van-icon class="i" color="#3596FD" size="1.2em" name="clock-o"/>{{new Date(+data.start_time*1000).Format("yyyy-MM-dd hh:mm")+' 至 '+new Date(+data.end_time*1000).Format("yyyy-MM-dd hh:mm")}}</div>
      <div class="icon bbox address"><van-icon class="i" color="#3596FD" size="1.2em" name="location-o"/>{{data.address}}
        <!-- <van-icon class="arr" color="#3596FD" size="1.2em" name="arrow"/> -->
      </div>
      <div class="icon bbox num"><van-icon class="i" color="#3596FD" size="1.2em" name="user-o"/>已报名{{data.join_count}}人/限{{data.total_count}}人报名</div>
    </div>
    <div class="company">
      <div class="left">
        <p class="p1">主办单位：{{data.sponsor}}</p>
        <p class="p2">协办单位：<span v-for='(item,index) in data.cooperators' :key='index'>{{item}} </span></p>
      </div>
      <div class="right">
        <van-button plain type="info" size="mini" class="btn" @click='gotoArticle(data.contact_article_id)'>联系我们</van-button>
      </div>
    </div>
    <div class="article" v-html="data.content"></div>
    <div class="has">
      <div class="has_top">
        <p class="text">已报名<span class="num">({{data.join_count}})</span></p>
        <p class="all" v-show='+data.join_count > 0' @click='checkAll()'>查看全部 ><span class="num"></span></p>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多"
        @load="onLoad"
      >
        <div class="head_wrap bbox">
          <div class="user" v-for='(item,index) in headList'>
            <div class="head"><img :src="item.headimgurl || 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png'" height="131" width="201" alt=""></div>
            <div class="van-ellipsis name">{{item.nickname || '微信昵称微信昵称'}}</div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="bottom">
      <div class="left">
        <p class="home icon" @click='gotoHome()'>
          <van-icon size="1.5em" name="home-o" />
          主页
        </p>
        <p class="share icon">
          <van-icon size="1.5em" name="share" />
          分享
        </p>
      </div>
      <div class="right" v-if='data.status == 1 || data.status == 2 || data.status == 3' @click='onPay(data.status)'>立即报名</div>
      <div class="right disable" v-if='data.status == 0'>报名未开始</div>
      <div class="right disable" v-if='data.status == 4'>无报名资格</div>
      <div class="right disable" v-if='data.status == 5'>已报名</div>
      <div class="right disable" v-if='data.status == 6'>报名已满</div>
      <div class="right disable" v-if='data.status == 7'>报名已结束</div>
    </div>
    <!-- 活动报名确认 -->
    <div class="confirm_toast" v-show="confirmShow">
      <van-dialog
        v-model="confirmShow"
        show-cancel-button
        :before-close="vipFree"
      >
      <h4 class="tc">活动报名确认</h4>
      <div class="content">
        <div class="item bbox">
          <div class="left">报名单位：</div>
          <div class="right">{{data.member_info.company_name}}</div>
        </div>
        <div class="item bbox">
          <div class="left">姓名：</div>
          <div class="right">{{data.member_info.name}}</div>
        </div>
        <div class="item bbox">
          <div class="left">活动时间：</div>
          <div class="right">{{new Date(+data.start_time*1000).Format("yyyy-MM-dd")}} 至 {{new Date(+data.start_time2*1000).Format("yyyy-MM-dd")}}</div>
        </div>
        <div class="item bbox">
          <div class="left">活动地点：</div>
          <div class="right">{{data.address}}</div>
        </div>
      </div>
      <div class="tip tc">活动名额有限，请确认有时间参与</div>
      </van-dialog>
    </div>
    <!-- 购票 -->
    <div class="pay_toast" v-show="payShow">
      <van-dialog
        v-model="payShow"
        show-cancel-button
        confirmButtonText="确认支付"
        :before-close="onBuy"
      >
      <h4 class="tc">付费购票</h4>
      <p class="num">票价:{{+data.join_price/100}}元</p>
      <div class="content">
        <van-cell-group>
          <van-field v-model="data.member_info.name" label="姓名" placeholder="请输入姓名" :disabled='disabled'/>
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="data.member_info.mobile" label="电话" placeholder="请输入电话" :disabled='disabled'/>
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="data.member_info.company_name" label="单位名称" placeholder="请输入单位名称" :disabled='disabled'/>
        </van-cell-group>
      </div>
      <div class="pay_bottom bbox" @click='onFree' v-if='data.join_mode != 1'>
        <div class="left">
          <van-icon name="info-o" class="i"/>
          加入{{assoName}}，立享免费参与
        </div>
        <div class="right">
          我是会员
          <van-icon name="arrow" color="#000"/>
        </div>
      </div>
      </van-dialog>
    </div> 
    <!-- 会员员工免费购票 -->
    <div class="vip_free" v-show='freeShow'>
      <van-dialog
        v-model="freeShow"
        show-cancel-button
        confirmButtonText="确认报名"
        :before-close="freeSubmit"
      >
      <h4>如果您是会员单位员工</h4>
      <h5>请选择会员单位报名</h5>
      <div class="content">
        <van-cell-group>
          <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="tel" label="电话" placeholder="请输入电话号码" />
        </van-cell-group>
        <van-cell-group>
          <van-cell title="单位" center='true' :is-link="!disabled" :clickable="!disabled" :value="company" @click="pickCompany()" />
          <!-- <van-field v-model="company" label="单位" placeholder="请输入单位名称" /> -->
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="position" label="职位" placeholder="请输入职位信息" />
        </van-cell-group>
      </div>
      <div class="tip">选择单位之后将无法更改，如果发现您非该企业员工系统将会把您加入黑名单。</div>
      </van-dialog>
    </div>
    <!-- 游客免费报名 -->
    <div class="tourist" v-show='touristShow'>
      <van-dialog
        class='dialog'
        v-model="touristShow"
        show-cancel-button
        confirmButtonText="确认报名"
        :before-close="touristSubmit"
      >
      <div class="content">
        <van-cell-group>
          <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="tel" label="电话" placeholder="请输入电话号码" />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="company" label="单位" placeholder="请输入单位名称" />
        </van-cell-group>
      </div>
      </van-dialog>
    </div>
    <!-- picker -->
    <van-popup v-model="pickerShow" position="bottom" :overlay="false">
      <van-picker v-show="columnsShow" @confirm='getCompany' @cancel='pickerShow = false' confirm-button-tex='确认' cancel-button-text='取消' :columns="columns" show-toolbar='true' title='选择公司' @change="onChange" class='pck'/>
    </van-popup>
  </div>
</template>

<script>
import { getAssocInfo,getActivityDetail,activityJoinUsers,freeJoinActivityRequest,getUserinfo,freeJoinActivity,payJoinActivity,memberList } from '@/service/getData.js'
export default {
  data () {
    return {
      columns:[],
      columnsShow:false,
      pickerShow:false,
      name:'',
      tel:'',
      company:'',
      position:'',
      freeShow:false,
      payShow:false,
      confirmShow:false,
      touristShow:false,
      data:{},
      headList:[],
      pageIndex:1,
      loading: false,
      finished: false,
      activity_id:0,
      member_id:0,
      join_id:0,
      disabled:false,
      admin_type:0,
      assoName:'',
      columnsIndex:[]
    }
  },
  mounted(){},
  async activated(){
    // this.onFree()
    this.pageIndex = 1
    this.loading = false
    this.finished = false
    this.headList = []
    this.activity_id = this.$route.query.activity_id
    const res = await getActivityDetail({activity_id:this.activity_id})
    this.data = res.data

    const res2 = await getUserinfo()
    this.member_id = res2.data.member_id
    this.admin_type = +res2.data.admin_type
    // this.admin_type = 0
    if (this.admin_type == 1 || this.admin_type == 2) {
      this.disabled = true
    }

    const res3 = await getAssocInfo()
    this.assoName = res3.data.name
  },
  methods:{
    getCompany(value,index){
      this.pickerShow = false
      this.company = value
      this.member_id = this.columnsIndex[index]
    },
    pickCompany(){
      if (!this.disabled) {
        this.pickerShow = true
      }
    },
    onChange(picker, value, index){
      this.company = value
    },
    async freeSubmit(action, done){//员工免费报名
      if (action === 'confirm') {
        if (!this.name) {
          this.$dialog.alert({message:'请填写姓名'})
          done();
          return
        }
        if (!this.tel && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.tel)) {
          this.$dialog.alert({message:'请填写正确手机号'})
          done();
          return
        }
        if (!this.company) {
          this.$dialog.alert({message:'请填写公司名称'})
          done();
          return
        }
        if (!this.position) {
          this.$dialog.alert({message:'请填写职位信息'})
          done();
          return
        }
        const res = await freeJoinActivityRequest({
          activity_id: this.activity_id,   //活动id
          member_id: this.member_id,     //公司（会员）id
          name: this.name,          //姓名
          mobile: this.tel,        //手机号码
          position: this.position,      //职务
        })
        done();
        if (res) {
          this.$dialog.alert({message:'提交成功,请等待审核结果'})
          this.freeShow = false
          this.payShow = false
        }
      } else {
        done();
      }
    },
    async vipFree(action, done) {//会员免费报名
      if (action === 'confirm') {
        const res = await freeJoinActivity({
          activity_id: this.activity_id,//活动id
          name: this.data.member_info.name,//姓名
          mobile: this.data.member_info.mobile,//手机号码
          company_name:this.data.member_info.company_name
        })
        done();
        if (res) {
          this.join_id = res.data.join_id
          this.$router.replace({path:'success',query:{join_id:this.join_id}})
        }
      } else {
        done();
      }
    },
    async touristSubmit(action, done){//游客免费报名
      if (action === 'confirm') {
        if (!this.name) {
          this.$dialog.alert({message:'请填写姓名'})
          done();
          return
        }
        if (!this.tel && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.tel)) {
          this.$dialog.alert({message:'请填写正确手机号'})
          done();
          return
        }
        if (!this.company) {
          this.$dialog.alert({message:'请填写公司名称'})
          done();
          return
        }
        const res = await freeJoinActivity({
          activity_id: this.activity_id,//活动id
          name: this.name,//姓名
          mobile: this.tel,//手机号码
          company_name:this.company
        })
        done();
        if (res) {
          this.join_id = res.data.join_id
          this.$router.replace({path:'success',query:{join_id:this.join_id}})
        }
      } else {
        done();
      }
    },
    checkAll(){
      this.$router.push({path:'/applyList',query:{activity_id:this.activity_id}})
    },
    gotoArticle(article_id){
      this.$router.push({path:'/informDetail',query:{article_id}})
    },
    gotoHome(){
      this.$router.replace('/')
    },
    async onFree(){
      this.columns = []
      const res = await memberList()
      if (res) {
        res.data.memberList.forEach((item,index)=>{
          this.columns.push(item.name)
          this.columnsIndex.push(item.id)
        })
        this.payShow = false
        this.freeShow = true
        this.columnsShow = true
      }
    },
    async onBuy(action, done){
      if (action === 'confirm') {
        if (this.admin_type == 0) {
          var params = {
            activity_id: this.activity_id,               //活动id
            name: this.name,                   //姓名
            company_name: this.company,     //公司名称
            mobile: this.tel        //手机号码
          }
        }
        if (this.admin_type == 1 || this.admin_type == 2 || this.data.member_info.name) {
          var params = {
            activity_id: this.activity_id,               //活动id
            name:this.data.member_info.name,                   //姓名
            company_name: this.data.member_info.company_name,     //公司名称
            mobile: this.data.member_info.mobile       //手机号码
          }
        }
        const res = await payJoinActivity(params)
        done()
        if (res) {
          this.jsApiCall(res.data)
        }
      }else{
        done()
      }
    },
    jsApiCall(data){
      wx.chooseWXPay({
        timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.nonce_str, // 支付签名随机串，不长于 32 位
        package: `prepay_id=${data.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: data.sign_type, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.paySign, // 支付签名
        success: res=> {
          // 支付成功后的回调函数
          this.$dialog.alert({message:'支付成功'})
          this.$router.replace({path:'/myTicket'})
        },
        fail: res =>{
          this.$dialog.alert({message:'支付失败,请重试'})
        }
      });
    },
    onPay(status){
      if (status == 1) {//游客免费报名
        this.touristShow = true
      }
      if (status == 2) {//公司管理员免费报名
        this.payShow = false
        this.confirmShow = true
      }
      if (status == 3) {//付费报名
        this.payShow = true
      }
    },
    async onLoad(){
       const res = await activityJoinUsers({
          activity_id:this.activity_id,
          page:this.pageIndex++,
          size:12
       })
       this.headList = this.headList.concat(res.data.lists)
       this.loading = false
       if (this.headList.length >= res.data.count) {
         this.finished = true
       }
    },
  },
  components:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .tourist{
    .dialog{
    }
  }
  .picker{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.85);
    z-index: 85;
    .pck{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
  .vip_free{
    .tip{
      font-size: .22rem;
      padding: .15rem .2rem;
      color: red;
    }
    h4{
      padding-top: .3rem;
      padding-left: .3rem;
    }
    h5{
      padding: .2rem 0;
      padding-left: .3rem;
      padding-bottom: .6rem;
    }
  }
  .article{
    padding: .3rem;
    background-color: #fff;
    text-align: justify;
    margin-top: .3rem;
  }
  .pay_toast{
    .pay_bottom{
      padding: 0 .3rem;
      height: .8rem;
      background-color: rgba(241,248,254,1);
      color: #3596FD;
      font-size: .24rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .left{
        width: 4rem;
        display: flex;
        align-items: center;
        .i{
          margin-right: .15rem;
        }
      }
      .right{
        color: #000;
        display: flex;
        align-items: center;
      }
      
    }
    .content{
      padding: 0 .3rem;
    }
    h4{
      padding-top: .3rem;
    }
    .num{
      width: 2.4rem;
      height: .7rem;
      text-align: center;
      line-height: .7rem;
      border-radius: .1rem;
      background-color: rgba(253,249,240,1);
      color: #FFB100;
      font-size: .32rem;
      margin: .2rem auto;
    }
  }
  .confirm_toast{
    .content{
      padding: .3rem;
      font-size: .28rem;
      .item{
        padding: .1rem 0;
        display: flex;
        .left{
          text-align: justify;
          width: 30%;
        }
        .right{
          width: 70%;
        }
      }
    }
    h4{
      padding-top: .5rem;
    }
    .tip{
      padding: .3rem 0;
      font-size: .28rem;
    }
  }
  .wrap{
    padding-bottom: 1.3rem;
  }
  .bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    height: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    .left{
      height: 100%;
      font-size: 12px;
      color: #3596FD;
      width:50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon{
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }
    .right{
      background-color: #3596FD;
      font-size: .32rem;
      color: #fff;
      width:50%;
      height: 100%;
      text-align: center;
      line-height: 1rem;
    }
    .right.disable{
      background-color: #979797;
    }
  }
  .has{
    margin-top: .3rem;
    background-color: #fff;
    .head_wrap{
      border-top: .02rem solid #f6f6f6;
      display: flex;
      justify-content: flex-start;
      padding: .3rem;
      .name{
        text-align: center;
        width: 1.2rem;
        font-size: 12px;
      }
      .head{
        width: .72rem;
        height: .72rem;
        border-radius: .36rem;
        overflow: hidden;
        margin: 0 auto;
        img{
          width: .72rem;
          height: .72rem;
        }
      }
    }
    .has_top{
      padding: .3rem;
      display: flex;
      justify-content: space-between;
      .text{
        padding-left: .22rem;
        font-size: .28rem;
        border-left: .04rem solid #3596FD;
        .num{
          color: #3596FD;
        }
      }
      .all{
        height: 100%;
        color: #3596FD;
        font-size: .28rem;
      }
    }
  }
  .company{
    padding: .3rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      .p1{
        margin-bottom: .15rem;
      }
    }
    .right{
      .btn{
        color: #3596FD;
      }
    }
  }
  .scene{
    margin-top: .3rem;
    .arr{
      position: absolute;
      right: .2rem;
    }
    .i{
      margin-right: .1rem;
    }
    .icon{
      position: relative;
      padding-left: .3rem;
      height: .7rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      border-bottom: .02rem solid rgba(246,246,246,1);
    }
  }
  .top{
    background-color: #fff;
    width: 100%;
    position: relative;
    padding-bottom: .3rem;
    .photo{
      width: 6.9rem;
      height: 3.86rem;
      position: absolute;
      left: .3rem;
      top: .7rem;
      border-radius: .15rem;
    }
    .bg{
      width: 7.5rem;
      height: 3.5rem;
    }
    .title{
      padding: 0 .3rem;
      margin-top: 1.3rem;
      margin-bottom: .2rem;
      font-size: .32rem;
      font-weight: bold;
    }
    .little_wrap{
      padding: 0 .3rem;
      display: flex;
      justify-content: flex-end;
      .little{
        color: #979797;
        display: flex;
        align-items: center;
        .i1{
          margin-right: .1rem;
        }
        .i2{
          margin-left: .2rem;
          margin-right: .1rem;
        }
      }
    }
  }
</style>
