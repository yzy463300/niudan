<template>
  <div class="initiation">
    <div class="tip" v-show='tipShow'>
      <div class="content tc bbox">
        <div class="title">{{title}}</div>
        <div class="context" v-html='content'>
          <!--  <p>1、拟申请入会的单位，首先应该仔细阅读《长沙市电子商务协会章程》，以便了解会员的权利和义务；然后如实填写《长沙市电子商务协会入会申请表》，并发到协会邮箱cseca@cseca.net；</p>
          <p>2、协会秘书处收到申请后，组织副会长以上代表实地考察拟入会单位的经营场所，并有简短的座谈。然后将申请表和考察意见提交常务理事会进行资格审核，审核同意后，拟申请常务理事以上职务的准会员提交会员代表大会表决通过，表决通过后，秘书处即通知入会单位递交加盖公章的《长沙市电子商务协会入会申请表》和营业执照复印件以及公司简介并分别加盖公章和法人代表签字；</p>
          <p>3、长沙市电子商务协会将依据《章程》业务范围，开展人才培训、政策法规服务、行业交流等，会员应根据《章程》规定按时交纳会费。协会从2010年度开始收取会费，会费按公历年度计算，每年3月31日前交纳。</p> -->
        </div>
      </div>
      <div class="agree"><van-button type="info" size="large" @click='onAgree'>同意注册</van-button></div>
    </div>
    <!-- form -->
    <div class="form bbox" v-show='formShow'>
      <h2>长沙电子商务协会</h2>
      <p class="p1">入会申请</p>
      <van-cell-group>
        <van-field
          v-model="companyName"
          required
          clearable
          label="公司名称"
          placeholder="请输入公司名称"
        />
        <van-field
          v-model="address"
          required
          clearable
          label="公司地址"
          placeholder="请输入公司地址"
        />
        <van-field
          v-model="name"
          required
          clearable
          label="姓名"
          placeholder="请输入真实姓名"
        />
        <van-field
          v-model="position"
          required
          clearable
          label="职务"
          placeholder="请输入所在公司职务"
        />
        <van-field
          v-model="phone"
          required
          clearable
          type="tel"
          label="手机号码"
          placeholder="请输入手机号码"
        />
        <van-field
          v-model="email"
          required
          clearable
          label="邮箱"
          placeholder="请输入邮箱号码"
        />

       
      </van-cell-group>
      <div class="submit"><van-button type="info" size="large" @click='onSubmit'>提交申请</van-button></div>
    </div>
    <!-- 提交成功 -->
    <div class="success wrap" v-show='resultType == "success"'>
      <div class="main vtc tc">
        <p class="icon"><van-icon name="passed" color="#3596FD" size="10em"/></p>
        <p class="p1">入会申请提交成功</p>
        <p class="p2">请务必关注“长沙电商协会”公众号获取审核进度</p>
        <p class="qrcode"><img src="../../assets/home/home_thumb.png" ></p>
        <van-button size="large" type="info" class="btn">点击关注</van-button>
      </div>
    </div>
    <!-- 审核通过 -->
    <div class="success wrap" v-show='resultType == "pass"'>
      <div class="main vtc tc">
        <p class="icon"><van-icon name="passed" color="#3596FD" size="10em"/></p>
        <p class="p1">恭喜您审核通过</p>
        <p class="p2">请完善会员基础信息，方可正式加入我们哦！</p>
        <van-button size="large" type="info" class="btn">完善会员内容</van-button>
      </div>
    </div>
    <!-- 审核未通过 -->
    <div class="fail wrap" v-show='resultType == "not_pass"'>
      <div class="main vtc tc">
        <p class="icon"><van-icon name="close" color="#3596FD" size="10em"/></p>
        <p class="p1">很遗憾，您的申请未通过</p>
        <p class="p2" style=" text-align: left;"><span class="red" style="color:red;">原因是：</span>秘书处与贵单位通过电话，电话打不通，并且贵单位并非电商企业及相关服务单位。</p>
        <van-button size="large" type="info" class="btn">返回首页</van-button>
      </div>
    </div>
    <!-- 提交失败 -->
    <div class="fail wrap" v-show='resultType == "fail"'>
      <div class="main vtc tc">
        <p class="icon"><van-icon name="close" color="#3596FD" size="10em"/></p>
        <p class="p1">入会申请提交失败</p>
        <p class="p2">请务必关注“长沙电商协会”公众号获取审核进度</p>
        <p class="qrcode"><img src="../../assets/home/home_thumb.png" ></p>
        <p class="p2">长按二维码关注</p>
        <!-- <van-button size="large" type="info" class="btn">点击关注</van-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { joinRequestSubmit,getJoinRule,getRecentlyJoinRequestStatus } from '../../service/getData.js'
export default {
  data () {
    return {
      tipShow:true,
      formShow:false,
      resultType:'',
      companyName:'',
      address:'',
      name:'',
      position:'',
      phone:'',
      email:'',
      title:'',
      content:'',
      data:{}
    }
  },
  mounted(){
  },
  async activated(){
    const res = await getJoinRule()
    console.log(res)
    this.title = res.data.title
    this.content = res.data.content
  },
  methods:{
   onAgree(){
    this.tipShow = false
    this.formShow = true
   },
   async checkStatus(){
     const res = await getRecentlyJoinRequestStatus()
     if (res) {
      this.data = res.data
      if (res.data.status == 0) {//审核中
        this.resultType = 'success'
      }
      if (res.data.status == 4) {//已拒绝
        this.resultType = 'not_pass'
      }
      if (res.data.status == 8) {//通过
        this.resultType = 'pass'
      }
     }
   },
   async onSubmit(){
    if (!this.companyName) {
      this.$dialog.alert({
        message: '请填写单位名称'
      });
      return
    }
    if (!this.address) {
      this.$dialog.alert({
        message: '请填写单位地址'
      });
      return
    }
    if (!this.name) {
      this.$dialog.alert({
        message: '请填写姓名'
      });
      return
    }
    if (!this.position) {
      this.$dialog.alert({
        message: '请填写职务'
      });
      return
    }
    if (!this.phone && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
      this.$dialog.alert({
        message: '请填写正确的手机号码'
      });
      return
    }
    if (!this.email && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(this.email)) {
      this.$dialog.alert({
        message: '请填写正确邮箱地址'
      });
      return
    }
    const params = {
      unit_name: this.companyName,     //单位名称，必填
      unit_address: this.address,  //单位地址，必填
      linkman: this.name,       //联系人，必填
      telephone: this.phone,     //联系电话，必填
      email: this.email,         //电子邮箱
      zhiwu: this.position,         //职务，必填
    }
    const res = await joinRequestSubmit(params)
    if (res) {
      this.resultType = 'success'
      // this.$dialog.alert({
      //   message: '提交成功'
      // });
    }else{
      this.$router.replace('/')
    }
   }
  },
  components:{

  },

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
    .qrcode{
      margin: 0 auto;
      margin-top: .2rem;
      padding: .1rem;
      background-color: #fff;
      box-shadow: 0px 0px 10px 1px #ccc;
      width: 2.1rem;
      height: 2.1rem;
      img{
        width: 2.1rem;
        height: 2.1rem;
      }
    }
    .main{
      width: 6rem;
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
  .form{
    background-color: #fff;
    padding-top: .7rem;
    padding-bottom: .5rem;
    .submit{
      width: 6.9rem;
      margin: 0 auto;
      margin-top: .5rem;
    }
    h2{
    padding-left: .3rem;
    }
    .p1{
      padding-left: .3rem;
      margin-bottom: .5rem;
    }
  }
 .tip{
    background-color: #f6f6f6;
    padding-bottom:.8rem; 
    .agree{
      width: 6rem;
      margin: 0 auto;
    }
    .content{
      margin: .4rem auto;
      width: 6.9rem;
      background-color: #fff;
      border-radius: .1rem;
      padding: .4rem .3rem;
      .title{
        color: #3596FD;
        font-weight: bold;
        font-size: .38rem;
        text-decoration: underline;
      }
      .context{
        p{
          text-align: left;
          margin-top: .5rem;
          line-height: .5rem;
        }
      }
    }
 }
</style>
