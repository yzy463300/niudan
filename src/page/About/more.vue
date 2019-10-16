<template>
  <div class="more">
    <!-- 列表 -->
    <div class="list-wrap bbox">
      <div class="head">
        <div class="title">协会动态</div>
        
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
            <div class="content">{{item.title}}</div>
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
      loading: false,
      finished: false,
      list:[]
    }
  },
  mounted(){
  },
  activated(){
    this.list = []
    this.pageIndex = 1
    this.loading = false
    this.finished = false
  },
  methods:{
    gotoArticle(article_id){
      this.$router.push({path:'/informDetail',query:{article_id}})
    },
   async onLoad() {
     const res = await getNewsList({
       page:this.pageIndex++,
       size:6
     })
     this.list = this.list.concat(res.data.lists)
     this.loading = false
     if (this.list.length >= res.data.count) {
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
 @base:#3596FD;
 .home{
   padding-bottom: 50px;
 }
 .list-wrap{
   margin-top: .2rem;
   padding: .3rem;
   background-color: #fff;
   .van-list{
     .item{
       padding: .3rem 0;
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
         height: 80%;
         /*display: -webkit-box; */
         /*-webkit-line-clamp:2;*/
         /*-webkit-box-orient:vertical;*/
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
</style>
