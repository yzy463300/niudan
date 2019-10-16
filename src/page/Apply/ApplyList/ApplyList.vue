<template>
  <div class="wrap">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多"
      @load="onLoad"
    >
    <div class="list">
      <div class="item" v-for="item in headList">
        <div class="left">
          <div class="head_img_wrap">
            <img :src="item.headimgurl" alt="">
          </div>
          <div class="content">
            <div class="p1">
              <span class="name">{{item.name}}</span>
              <span class="tag1" v-if="item.join_type == 0">游客</span>
              <span class="tag1" v-if="item.join_type == 1">会员单位</span>
              <span class="tag2" v-if="item.join_type == 2">付费购票</span>
            </div>
            <div class="p2">{{item.company_name}}</div>
          </div>
        </div>
        <div class="right">{{new Date(+item.add_time*1000).Format("yyyy-MM-dd hh:mm")}}</div>
      </div>
    </div>
    </van-list>

  </div>
</template>

<script>
import { activityJoinUsers } from '@/service/getData.js'
export default {
  data () {
    return {
      pageIndex:1,
      loading: false,
      finished: false,
      activity_id:0,
      headList:[],
      data:{
        lists:[
          {
            headImg:require('../../../assets/home/home_thumb.png'),
            name:'OLD丁',
            company:'长沙纳联互动有限公司',
            tag:1,//1:会员单位 2:付费购票
            time:'12分钟前'
          },
          {
            headImg:require('../../../assets/home/home_thumb.png'),
            name:'OLD丁',
            company:'长沙纳联互动有限公司',
            tag:2,//1:会员单位 2:付费购票
            time:'12分钟前'
          },
        ]
      }
    }
  },
  mounted(){
  },
  activated(){
    this.activity_id = this.$route.query.activity_id
  },
  methods:{
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
  .item{
    padding: .4rem;
    background-color: #fff;
    border-bottom: .02rem solid #f6f6f6;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .left{
      display: flex;
      align-items: center;
      .content{
        .p2{
          padding-top: .1rem;
          color: #979797;
        }
        .p1{
          .name{
            color: #000;
            font-size: .28rem;
            font-weight: bold;
          }
          .tag1{
            text-align: center;
            padding: 0 .2rem;
            height: .4rem;
            border-radius: .2rem;
            background-color: #FFCC59;
            color: #AA7601;
            font-size: .18rem;
          }
          .tag2{
            text-align: center;
            padding: 0 .2rem;
            height: .4rem;
            border-radius: .2rem;
            background-color: #257DF4;
            color: #fff;
            font-size: .18rem;
          }
        }
      }
      .head_img_wrap{
        width: .8rem;
        height: .8rem;
        overflow: hidden;
        border-radius: .4rem;
        margin-right: .2rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .right{
      color: #979797;
    }
  }
</style>
