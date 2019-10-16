<template>
  <div class="me" v-if="info">
    <div class="header bbox">
      <div class="left">
        <div class="head_wrap"><img :src="info.headimgurl" alt=""></div>
      </div>
      <div class="right">
        <p class="name">{{info.name || info.nickname}}</p>
        <p class="company">公司: {{info.company_name}}</p>
        <p class="position">职务: {{info.position}}</p>
      </div>
      <div class="r_company">
        <p class="p1">{{companyAttr}}</p>
        <p class="qr" @click="show = true">
          <van-icon name="qr" size="2em" color="#ffffff"/>
        </p>
      </div>
    </div>
    <div class="tab">
      <div class="item">
        <p class="text">{{}}</p>
        <p class="icon">协会职务</p>
      </div>
      <div class="item">
        <p class="text">{{}}</p>
        <p class="icon">活跃度</p>
      </div>
      <div class="item">
        <p class="text">{{}}</p>
        <p class="icon">协会年龄</p>
      </div>
    </div>
    <div class="lists">
      <van-row class='row'>
        <van-col v-for="(item,index) in lists" class='bbox col' span="6" v-if="item.type.indexOf(1) !== -1 && admin_type == 0">
          <div class="clo_wrap" @click="itemClick(item.url)" >
            <van-icon :name="item.icon" size="2em" color="#3596FD" class="icon" />
            {{item.text}}
          </div>
        </van-col>
        <van-col v-for="(item,index) in lists" class='bbox col' span="6" v-if="item.type.indexOf(2) !== -1 && admin_type == 1">
          <div class="clo_wrap" @click="itemClick(item.url)" >
            <van-icon :name="item.icon" size="2em" color="#3596FD" class="icon" />
            {{item.text}}
          </div>
        </van-col>
        <van-col v-for="(item,index) in lists" class='bbox col' span="6" v-if="item.type.indexOf(3) !== -1 && admin_type == 2">
          <div class="clo_wrap" @click="itemClick(item.url)" >
            <van-icon :name="item.icon" size="2em" color="#3596FD" class="icon" />
            {{item.text}}
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 绑定管理员 -->
    <div class="bind_admin alert" v-show='glShow'>
      <div class="main vtc bbox">
        <van-cell-group>
          <van-field
              v-model="telephone"
              required
              clearable
              label="手机号"
              placeholder="请输入手机号"
          />
          <van-field
            v-model="sms"
            center
            clearable
            label="短信验证码"
            placeholder="请输入验证码"
          >
            <van-button slot="button" size="small" :type="sceneType" @click='sendSence()'>{{btnText}}</van-button>
          </van-field>
        </van-cell-group>
        <div class="btn_w"><van-button type="primary" size='large' @click='senceSubmit()'>提交</van-button></div>
        <div class="btn_w"><van-button plain type="primary" size='large' @click='glShow=false'>取消</van-button></div>
        <!-- <van-icon class='close' @click='glShow=false' name="clear" color='red' size='2.5em'/> -->
      </div>
    </div>
    <!-- 二维码详情 -->
    <van-popup v-model="show" class="qrcode"><img :src="qrcode" alt=""></van-popup>
  </div>
</template>
<script>
import { getUserinfo,sendSMSCode,bindMemberUser } from '@/service/getData.js'
import { Field } from 'vant';
export default {
  data () {
    return {
      glShow:false,
      sms:'',
      telephone:'',
      show:false,
      qrcode:require('../../../assets/home/home_thumb.png'),
      headImg:require('../../../assets/home/home_thumb.png'),
      name:'用户名',
      company:'湖南虫洞文化传播有限公司',
      companyPosition:'总经理',
      associationPostion:'会长单位',
      liveness:'活跃',
      years:'12年',
      companyAttr:'会员单位',
      lists:[
        {
          type:'1,2,3',
          icon:'smile-comment-o',//icon名称
          text:'我的通知',//选项名称
          url:'/inform'
        },
        {
          type:'1,2,3',
          icon:'coupon-o',
          text:'我的票券',
          url:'/myTicket'
        },
        {
          type:'1,2,3',
          icon:'user-circle-o',
          text:'个人信息',
          url:'/userinfo'
        },
        {
          type:'2',
          icon:'hotel-o',
          text:'公司信息',
          url:'/vipDetail',
        },
        {
          type:'1,2,3',
          icon:'records',
          text:'投诉建议',
          url:'/complain'
        },
        {
          type:'2',
          icon:'balance-list-o',
          text:'会费情况',
          url:'/duesDetail'
        },
        {
          type:'1,2,3',
          icon:'friends-o',
          text:'关于我们',
          url:'/about'
        },
        {
          type:'3',
          icon:'photo-o',
          text:'图库上传',
          url:'/photoAlbum'
        },
        {
          type:'3',
          icon:'comment-o',
          text:'智能推送',
          url:'/push'
        },
        {
          type:'1',
          icon:'todo-list-o',
          text:'入会申请',
          url:'/initiation'
        },
        {
          type:'1',
          icon:'manager-o',
          text:'绑定管理',
          url:'guanli'
        },
        {
          type:'2',
          icon:'manager-o',
          text:'报名审核',
          url:'/checkApplicant'
        }
      ],
      info:null,
      admin_type: 0,
      id: 1,
      member_id:0,
      sceneType:'primary',
      btnText:'发送验证码',

    }
  },
  async activated(){
    this.getuserData()
  },
  methods:{
    async getuserData(){
      const res = await getUserinfo()
      this.info = res.data.info
      this.admin_type = res.data.admin_type
      // this.admin_type = 2
      this.member_id = res.data.member_id
      this.id = res.data.id
    },
    async sendSence(){
      if (this.btnText == '发送验证码') {
        if (!this.telephone && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.telephone)) {
          this.$dialog.alert({message: '请填写正确的手机号'})
          return
        }
        const res = await sendSMSCode({
          telephone:this.telephone
        })
        if (res) {
          this.sceneType = 'warning'//15874120438 189083
          this.btnText = '已发送(60s)'
          var tick = 60
          var timer = setInterval(()=>{
            this.btnText = `已发送(${--tick}s)`
            if (tick == 0) {
              clearInterval(timer)
              this.btnText = '发送验证码'
              this.sceneType = 'primary'
            }
          },1000)
        }
      }
    },
    async senceSubmit(){
      if (!this.telephone && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.telephone)) {
        this.$dialog.alert({message: '请填写正确的手机号'})
        return
      }
      if (!this.sms) {
        this.$dialog.alert({message: '请填写验证码'})
        return
      }
      const res = await bindMemberUser({
        telephone:this.telephone,
        code:this.sms
      })
      if (res) {//绑定成功
        this.$dialog.alert({message: '绑定成功'})
        this.glShow = false
        this.getuserData()
      }
    },
    itemClick(url){//列表点击事件
      if (url == 'guanli') {//绑定管理
        this.glShow = true
      }
      else if (url == '/vipDetail') {//公司信息
        this.$router.push({path:url,query:{member_id:this.member_id}})
      }
      else{
        this.$router.push({path:url})
      }

      // this.$emit('icon-click',id)
    }
  },
  components:{
    Field
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .bind_admin{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .main{
      width: 7rem;
      padding: .5rem 0;
      background-color: #fff;
      border-radius: .1rem;
      padding-bottom: .3rem;
      .close{
        position: absolute;
        right: -.15rem;
        top: -.15rem;
      }
      .btn_w{
        margin: .2rem auto;
        width: 91%;
        .van-button--large{
          height: .9rem;
          line-height: .9rem;
        }
      }
    }
  }
  .me{
    padding-bottom: 65px;
  }
  .qrcode{
    img{
      width: 3rem;
      height: 3rem;
    }
  }
  .lists{
    margin: .8rem auto;
    width: 6.9rem;
    /*height: 6.04rem;*/
    background-color: #fff;
    border-radius: .1rem;
    .row{
      height: 100%;
    }
    .col{
      height: 33.3333333%;
      border-right: .02rem solid #f6f6f6;
      border-bottom: .02rem solid #f6f6f6;
      padding: .3rem 0;
      .clo_wrap{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .icon{
        margin-bottom: .1rem;
      }
    }
  }
  .tab{
    width: 6.9rem;
    height: 1.6rem;
    background-color: #fff;
    border-radius: .1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: stretch;
    margin: -.3rem auto;
    .item{
      flex-grow:1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      flex-direction: column;
      border-right: .02rem solid #f6f6f6;
      .text{
        font-size: .28rem;
        margin-bottom: .3rem;
      }
      .icon{
        width: 1.5rem;
        height: .36rem;
        line-height: .36rem;
        color: #fff;
        font-size: .24rem;
        text-align: center;
        background-color: #3596FD;
        border-radius: .18rem;
      }
    }
  }
  .header{
    padding: 0 .3rem;
    width: 100%;
    height: 2.56rem;
    background-image: url(../../../assets/me_bg.jpg);
    background-size: cover;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left{
      margin-right: .3rem;
      .head_wrap{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: .1rem;
        overflow: hidden;
        img{
          width: 1.2rem;
          height: 1.2rem;
        }
      }
    }
    .right{
      width: 3.5rem;
      margin-right: .5rem;
      color: #fff;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      flex-direction: column;
      flex-wrap: wrap;
      .name{
        font-size: .32rem;
        font-weight: bold;
      }
      .company{
        font-size: .24rem;
        padding: .05rem 0;
      }
      .position{
        font-size: .24rem;
      }
    }
    .r_company{
      display: flex;
      flex-direction: column;
      align-items: center;
      .p1{
        margin-bottom: .3rem;
        font-size: .18rem;
        height: .4rem;
        line-height: .4rem;
        color: #AA7601;
        padding: 0 .1rem;
        border-radius: .2rem;
        background-color: #FFCC59;
      }
      .qr{
        display: flex;
        padding: .03rem;
        border-radius: .05rem;
        background-color:#2179F0;
      }
    }
  }
</style>