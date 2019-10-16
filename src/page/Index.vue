<template>
  <div class="home">
    <div class="top">
      <!-- 轮播 -->
       <van-swipe :autoplay="3000" class="swiper tc">
         <van-swipe-item v-for="(image, index) in images" :key="index" class='tc'>
           <img class="banner-img" v-lazy="image.thumb_img" />
         </van-swipe-item>
       </van-swipe>
       <!-- 通告栏 -->
       <van-notice-bar
         class='bbox'
         color='#979797'
         :text="text"
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
        <div class="item" v-for="(item,index) in list" :key='index' @click='gotoArticle(item.article_id)'>
          <img :src="item.thumb_img" alt="" class="thumb">
          <div class="right">
            <div class="content ">{{item.title}}</div>
            <div class="time">{{new Date(+item.add_time*1000).Format("yyyy-MM-dd")}}</div>
          </div>
        </div>
      </van-list>
    </div>
    
  </div>
</template>

<script>
import { getFocusList,getNoticeList,getNewsList } from '@/service/getData.js'
export default {
  data () {
    return {
      pageIndex:1,
      m:require('../assets/ticket_bg.png'),
      list: [],
      loading: false,
      finished: false,
      getMore:'/more',
      text:'',
      topLink:['about','vipList','initiation','contact'],
      tabList:[
        {
          url:require('../assets/home/home_i1.png'),
          text:'关于我们'
        },
        {
          url:require('../assets/home/home_i2.png'),
          text:'会员展示'
        },
        {
          url:require('../assets/home/home_i3.png'),
          text:'申请入会'
        },
        {
          url:require('../assets/home/home_i4.png'),
          text:'联系我们'
        }
      ],
      images:[]
    }
  },
  methods:{
      gotoArticle(article_id){
        this.$router.push({path:'/informDetail',query:{article_id}})
      },
      async onLoad() {
        const res = await getNewsList({
          page:this.pageIndex++,
          size:3
        })
        this.list = this.list.concat(res.data.lists)
        this.loading = false
        if (this.list.length >= res.data.count) {
          this.finished = true
        }
      },
      async onGetFocusList(){
        const res = await getFocusList()
        this.images = res.data.lists
      },
      async onGetNoticeList(){
        const res = await getNoticeList({
          page:1,
          size:1,
        })
        this.text = res.data.lists[res.data.lists.length - 1].title

      }
  },
  computed:{},
  async activated(){
    // this.list = []
    // this.pageIndex = 1
    this.onGetFocusList()
    this.onGetNoticeList()
  },
  async mounted(){
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  @base:#3596FD;
  
  .home{
    padding-bottom: 50px;
    .van-notice-bar{
      width: 7.06rem;
      height: .76rem;
      margin: 0 auto;
      background-image: url(../assets/notice.png);
      background-size: cover;
      background-color: #fff;
      padding-left: 1.2rem;
    }
  }
  .list-wrap{
    margin-top: .2rem;
    .van-list{
      .item{
        padding: .3rem;
        background-color: #fff;
        border-bottom: .02rem solid #f6f6f6;
        display: flex;
      }
    }
    .item{
      padding: .3rem 0;
      border-bottom: .02rem solid #f6f6f6;
      display: flex;
      .link{
        display: flex;
      }
      .right{
        width: 5.15rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        .content{
          width: 100%;
          height: .8rem;
          display: -webkit-box; 
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          text-overflow: ellipsis;
          overflow:hidden; 
        }
        .time{
          display: flex;
          align-items: center;
        }
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
      background-color: #fff;
      padding: .3rem;
    }
    .title{
      border-left: .04rem solid @base;
      padding-left: .2rem;
      font-weight: bold;
      font-size: .28rem;
      color: #000;
    }
    .list-more{
      display: flex;
      align-items: center;
      color: @base;
      font-style: .28rem;
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
    margin-top: .1rem;
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
    padding: .2rem 0;
    .banner-img{
      width: 6.9rem;
      height: 2.9rem;
      border-radius: .1rem;
    }
  }
  
</style>