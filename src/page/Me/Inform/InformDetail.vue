<template>
  <div class="inform_detail">
    <h1>{{data.title}}</h1>
    <p class="p1"><span class="company">{{data.publisher}}</span><span class="time">{{new Date(+data.add_time*1000).Format("yyyy-MM-dd")}}</span></p>
    <p class="p2"><span class="read">{{data.view_count}}人已读</span><!-- <span class="unread">{{data.unredNum}}人未读</span> --></p>
    <div class="content" v-html='data.content'></div>
  </div>
</template>
<script>
import { getArticleDetail,receivedNoticeDetail } from '@/service/getData.js'
export default {
  data () {
    return {
      data:{}
    }
  },
  props:{
   
  },
  mounted(){
  },
  async activated(){
    if (this.$route.query.type == 'information') {
      const notice_id = this.$route.query.notice_id
      const res = await receivedNoticeDetail({notice_id})
      this.data = res.data

    }else{
      const article_id = this.$route.query.article_id
      const res = await getArticleDetail({article_id})
      this.data = res.data
    }
  },
  methods:{
   
  },
  components:{

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .inform_detail{
    padding: .6rem .3rem;
    background-color: #fff;
  }
 .p1{
  color: #979797;
  padding: .2rem 0;
  font-size: .28rem;
  .company{
    margin-right: .2rem;
  }
 }
 .p2{
  font-size: .28rem;
  .read{
    color: #3596FD;
    margin-right: .2rem;
  }
  .unread{
    color: #979797;
  }
 }
 .content{
  padding-top: .3rem;
  font-size: .28rem;
  line-height: .48rem;
 }
</style>
