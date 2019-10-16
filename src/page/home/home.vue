<template>
  <div class="home">
    <div class="top">
      <!-- 轮播 -->
       <van-swipe :autoplay="3000" class="swiper tc">
         <van-swipe-item v-for="(image, index) in images" :key="index" class='tc'>
           <img class="banner-img" v-lazy="image" />
         </van-swipe-item>
       </van-swipe>
       <!-- 通告栏 -->
       <van-notice-bar
         text="中国智慧三农大会在京圆满召开，协会农业电商企业表现不凡。"
         left-icon="volume-o"
       />
       <!-- 顶部导航 -->
       <div class="top-tab bbox">
         <div v-for="(item,index) in tabList" class="item">
            <router-link :to="topLink[index]">
              <img :src="item.url" class="icon">
              <p>{{item.text}}</p>
            </router-link>
         </div>
       </div>
    </div>
    <!-- 列表 -->
    <div class="list-wrap bbox">
      <div class="head">
        <div class="title">协会动态</div>
        <div class="list-more">
            <router-link :to="getMore" class="list-more-a">
              <span>更多</span><van-icon name="arrow" color="#3596FD"/>
            </router-link>
        </div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多资讯"
        @load="onLoad"
      >
        <div class="item" v-for="item in list" >
          <router-link :to="item.link" class='link'>
            <img :src="item.thumb" alt="" class="thumb">
            <div class="right">
              <div class="content">{{item.content}}</div>
              <div class="time">{{item.time}}</div>
            </div>
          </router-link>
        </div>
      </van-list>
    </div>
    <!-- 底部导航 -->
    <Tabbar :to="toUrl" :active='0'></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar/Tabbar'
export default {
  data () {
    return {
      list: [
        {
          thumb:require('../../assets/home/home_thumb.png'),
          content:'中国智慧三农大会在京圆满召开，协会农业电商企业表现不凡。',
          time:'2019-01-10',
          link:'/vip/vipDetail'
        },
        {
          thumb:require('../../assets/home/home_thumb.png'),
          content:'中国智慧三农大会在京圆满召开，协会农业电商企业表现不凡。',
          time:'2019-01-10',
          link:'/vip/vipDetail'
        },
      ],
      loading: false,
      finished: false,
      getMore:'/vip/vipList',
      topLink:['/about','/vip/vipList','/apply/action','/apply/contact'],
      tabList:[
        {
          url:require('../../assets/home/home_i1.png'),
          text:'关于我们'
        },
        {
          url:require('../../assets/home/home_i2.png'),
          text:'会员展示'
        },
        {
          url:require('../../assets/home/home_i3.png'),
          text:'申请入会'
        },
        {
          url:require('../../assets/home/home_i4.png'),
          text:'联系我们'
        }
      ],
      toUrl:['/home','/apply/list','/me/photoAlbum','/contacts','/me/me'],//标签栏路由
      images:[
        require('../../assets/home/home_thumb.png'),
        require('../../assets/home/home_thumb.png'),
      ],//轮播图
    }
  },
  methods:{
      onLoad() {
        
      }
  },
  components:{
    Tabbar
  },
  computed:{},
  async mounted(){
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  @base:#3596FD;
  .home{
    padding-bottom: 50px;
  }
  .list-wrap{
    margin-top: .2rem;
    padding: .3rem;
    background-color: #fff;
    .item{
      padding: .3rem 0;
      border-bottom: .02rem solid #f6f6f6;
      .link{
        display: flex;
      }
      .right{
        width: 5.15rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: stretch;
      }
      .thumb{
        width: 1.44rem;
        height: 1.3rem;
        margin-right: .32rem;
      }
      .content{
        color: #000;
        font-size: .28rem;
        line-height: .4rem;
      }
      .time{
        color: #979797;
        font-size: .24rem;
      }
    }
    .head{
      display: flex;
      justify-content: space-between;
    }
    .title{
      border-left: .04rem solid @base;
      padding-left: .2rem;
      font-weight: bold;
      font-size: .32rem;
      color: #000;
    }
    .list-more{
      display: flex;
      align-items: center;
      color: @base;
      .list-more-a{
        display: flex;
        align-items: center;
      }
      span{
        color: @base;
      }
    }
  }
  .top{
    background-color: #fff;
  }
  .top-tab{
    margin-top: .4rem;
    padding: 0 .4rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-bottom: .2rem;
    .item{
      text-align: center;
      p{
        margin-top: .1rem;
        color: #000;
      }
    }
    .icon{
      width: .8rem;
      height: .8rem;
    }
  }
  .swiper{
    padding: .3rem 0;
    .banner-img{
      width: 6.9rem;
      height: 2.9rem;
    }
  }
  
</style>