<template>
  <div class="wrap" v-if="data.base_info">
    <div class="return_home" @click="homeBtnClick">首页</div>
    <div class="top">
      <div class="top_bg"><img src="../../../assets/me_bg.jpg" ></div>
      <div class="pv"><van-icon name="eye-o" color="#fff" size="1.2em"/>浏览数:{{}}</div>
      <div class="head_wrap">
        <div class="head"><img :src="data.logo" height="131" width="201" alt=""></div>
        <div class="company">{{data.name}}</div>
      </div>
      <div class="top_bottom bbox">
        <div class="item tc">
          <p class="p1">{{}}</p>
          <p class="icon">协会职务</p>
        </div>
        <div class="item tc">
          <p class="p1">{{}}</p>
          <p class="icon">活跃度</p>
        </div>
        <div class="item tc">
          <p class="p1">{{}}</p>
          <p class="icon">协会年龄</p>
        </div>
      </div>
    </div>
    <div class="list">
      <!-- <van-collapse v-model="activeNames">
        <van-collapse-item title="简介" name="1">
          {{data.base_info.brief_name}}
        </van-collapse-item>
      </van-collapse> -->
      <div class="item" v-for="item in data.base_info">
        <div class="p1">{{item.label}}</div>
        <div class="p2" v-if="item.type !== 'editor' && item.type !== 'upload'">{{item.value+''}}</div>
        <div class="p2" v-if='item.type == "editor"' v-html="item.value"></div>
        <div class="p2" v-if='item.type == "upload" '>
          <img :src="item.value" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMemberDetail } from '@/service/getData.js'
export default {
  data () {
    return {
      data:{/*
        years:'12年',
        liveness:'活跃',
        position:'会长单位',
        companyName:'御家汇股份有限公司',
        companyThumb:require('../../../assets/home/home_thumb.png'),
        pv:115,
        brief:'御泥坊(UNIFON)是一个护肤品牌，主要生产以面膜为主的护肤产品。(1)御泥坊所属企业御家汇股份有限公司拥有多款',
        lists:[
          {
            title:'企业性质',
            content:'私营企业'
          },
          {
            title:'企业性质',
            content:`联系电话：400-600-800<br>业务联系人：400-600-800`
          },
        ]*/
      },
      activeNames: ['1']
    }
  },
  props:{
    
  },
  mounted(){
  },
  async activated(){
    const member_id = this.$route.query.member_id
    const res = await getMemberDetail({member_id})
    this.data = res.data
    console.log(this.data)
  },
  methods:{
   homeBtnClick(){
    this.$router.replace('/')
    this.$emit('homeBtnClick')
   }
  },
  components:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .top_bg{
    height: 1.2rem;
    overflow: hidden;
  }
  .return_home{
    width: 1rem;
    height: 1rem;
    border-radius: .5rem;
    background-color: #3596FD;
    text-align: center;
    line-height: 1rem;
    color: #fff;
    position: fixed;
    right: 0;
    top: 8rem;
    z-index: 99;
  }
  .list{
    .item{
      margin-top: .2rem;
      padding: .3rem ;
      background-color: #fff;
      .p1{
        padding-left: .2rem;
        border-left: .04rem solid #3596FD;
        margin-bottom: .2rem;
      }
      .p2{
        line-height: .5rem;
        img{
          width: 100%;
        }
      }
    }
  }
  .top{
    .pv{
      color: #fff;
      height: .4rem;
      padding: 0 .2rem;
      background-color: #2179F0;
      position: absolute;
      right: .4rem;
      top: .6rem;
      border-radius: .2rem;
      display: flex;
      align-items: center;
    }
    .top_bottom{
      padding-top: .35rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item:nth-of-type(1){
        border-right: .02rem solid #EDEDED;
      }
      .item:nth-of-type(2){
        border-right: .02rem solid #EDEDED;
      }
      .item{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        align-items: center;
        .p1{
          text-align: center;
          font-size: .28rem;
          height: .7rem;
          line-height: .7rem;
        }
        .icon{
          width: 1.5rem;
          height: .42rem;
          line-height: .42rem;
          border-radius: .21rem;
          text-align: center;
          background-color: #3596FD;
          color: #fff;
          font-size: .24rem;
        }
      }
    }
    .head_wrap{
      position: absolute;
      left: .4rem;
      top: .4rem;
      display: flex;
      align-items: flex-end;
      .company{
        margin-left: .2rem;
        margin-bottom: .2rem;
        font-weight: bold;
      }
      .head{
        width: 1.4rem;
        height: 1.4rem;
        overflow: hidden;;
        border-radius: .1rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .top_bg{
      img{
        width: 7.5rem;
        height: 2.56rem;
      }
    }
    .top_bottom{
      height: 2.2rem;
      background-color: #fff;
    }
  }
</style>
