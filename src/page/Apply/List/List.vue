<template>
  <div class="">
    <div class="fixed">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="搜索活动"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多"
      @load="onLoad"
    >
      <div class="item" v-for="(item,index) in lists" :key='index' @click='gotoPage(item.activity_id)'>
        <div class="top">
          <div class="thumb"><img :src="item.thumb_img" alt=""></div>
          <div class="right">
            <p class="title">{{item.title}}</p>
            <div class="time_wrap">
              <p class="time">{{new Date(+item.start_time*1000).Format("yyyy-MM-dd")}} 至  {{new Date(+item.end_time*1000).Format("yyyy-MM-dd")}}</p>
              <p class="num">名额: {{item.total_count}}</p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="tag">
            <span v-for="it in item.tags" class="span_tag">#{{it}}</span>
          </div>
          <van-button size="mini" type="warning" class="btn" color="#ccc" v-if='item.status == 0' >未开始</van-button>
          <van-button size="mini" type="info" class="btn" v-if='item.status == 1' >立即报名</van-button>
          <van-button size="mini" type="danger" class="btn" color="#ccc" v-if='item.status == 2'>已满</van-button>
          <van-button size="mini" type="danger" class="btn" color="#ccc" v-if='item.status == 3'>已结束</van-button>
        </div>
      </div>
    </van-list>
    
  </div>
</template>

<script>
import { getActivityList } from '@/service/getData.js'
export default {
  data () {
    return {
      pageIndex:1,
      loading:false,
      finished:true,
      value:'',
      lists:[],
      data:{  
        lists:[
          {
            thumb:require('../../../assets/home/home_thumb.png'),
            title:'2018企业申报政策项目年度总结系列培训（第六期）2018企业申报政策项目年度总结系列培训（第六期）',
            time:'1月6日 16:00-19:00',
            num:'30',
            tag:['思维导图','国际认证','右脑开发']
          }
        ]
      }
    }
  },
  mounted(){
  },
  async activated(){
    this.lists = []
    this.pageIndex = 1
    this.finished = false
    this.loading = false
    this.onLoad()
  },
  methods:{
    gotoPage(id){
      this.$router.push({path:'/action',query:{activity_id:id}})
    },
    async onLoad(){
      this.getData({
        page:this.pageIndex++,
        size:6,
        // keyword:
      })
    },
    async getData(params){
      const res = await getActivityList(params)
      this.lists = this.lists.concat(res.data.lists)
      this.loading = false
      if (this.lists.length >= res.data.count) {
        this.finished = true
      }
    },
    onSearch(){
      this.lists = []
      this.pageIndex = 1
      this.getData({
        page:this.pageIndex++,
        size:6,
        keyword:this.value
      })
    },
    onCancel(){
      this.lists = []
      this.pageIndex = 1
      this.finished = false
      this.loading = false
      this.onLoad()
    },
  },
  components:{
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .fixed{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 500;
    width: 100%;
    box-shadow:  0 0.01rem 0.2rem #ccc;
  }
  .van-list{
    padding-bottom: 50px;
    padding-top: 54px;
  }
  .item{
    display: flex;
    flex-direction: column;
    padding: .3rem;
    background-color: #fff;
    margin: .15rem 0;
    .top{
      display: flex;
      align-items: center;
      .right{
        width: 4.1rem;
        display: flex;
        flex-direction: column;
        align-content:space-between;
        justify-content: space-between;
        .title{
          line-height: .4rem;
          height: .8rem;
          font-size: .28rem;
          display: -webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          overflow: hidden;
        }
        .time_wrap{
          margin-top: .3rem;
          display: flex;
          justify-content: space-between;
          .time{
            font-size: .24rem;
            color: #979797;
          }
          .num{
            font-size: .24rem;
            color: #3596FD;
            display: flex;
            align-items: center;
          }
        }
      }
      .thumb{
        margin-right: .3rem;
        img{
          width: 2.6rem;
          height: 1.6rem;
        }
      }
    }
    .bottom{
      margin-top: .3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .span_tag{
        padding-right: .15rem;
        color: #3596FD;
      }
      .btn{
        color: #fff;
        font-size: .22rem;
      }
      .btn.disable{

      }
    }
  }
</style>
