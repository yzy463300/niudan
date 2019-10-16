<template>
  <div class="my_ticket">
    <div class="header"></div>
    <div class="tab">
      <div class="left tc">
        <p class="p1">本年参与</p>
        <p class="p2"><span>{{}}</span>次</p>
        <p class="p3">{{}}</p>
      </div>
      <div class="right tc">
        <p class="p1">总共参与</p>
        <p class="p2"><span>{{}}</span>次</p>
        <p class="p3">{{}}</p>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多"
      @load="onLoad"
    >
      <div class="list">
        <div class="item" v-for="(item,index) in lists" @click='onClick(item.join_id)'>
          <div class="top">
            <div class="left"><img :src="item.thumb_img || 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png'" alt=""></div>
            <div class="right">
              <p class="title ">{{item.title}}</p>
              <p class="time textoverflow">{{new Date(+item.start_time2*1000).Format("yyyy-MM-dd hh:mm")}} 开始</p>
              <p class="address textoverflow">{{item.address}}</p>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <span class="status" v-if="item.status == 0">未核销</span>
              <span class="status green" v-if="item.status == 1">已核销</span>
              <span class="status red" v-if="item.status == 2">已申请退款</span>
              <span class="status red" v-if="item.status == 3">已过期</span>
              <span class="price">￥{{item.total_amount/100}}</span>
            </div>
            <div class="btn">查看电子票</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { activityJoinList } from '@/service/getData.js'
export default {
  data () {
    return {
      pageIndex:1,
      loading: false,
      finished: false,
      lists:[],
    }
  },
  props:{
   
  },
  mounted(){
  },
  activated(){
    this.pageIndex = 1
    this.lists = []
    this.loading = false
    this.finished = false
  },
  methods:{
    async onLoad(){
      const res = await activityJoinList({
         page:this.pageIndex++,
         size:12
      })
      this.lists = this.lists.concat(res.data.lists)
      this.loading = false
      if (this.lists.length >= res.data.count) {
        this.finished = true
      }
    },
    onClick(id){
      this.$router.push({path:'/orderDetail',query:{join_id:id}})
      this.$emit('check-ticket',id)
    }
  },
  components:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .list{
    margin-top: .35rem;
    .item{  
      margin-top: .3rem;
      background-color: #fff;
      .top{
        padding: .3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
          margin-right: .2rem;
          img{
            width: 2.6rem;
            height: 1.6rem;
          }
        }
        .right{
          width: 4rem;
          .title{
            line-height: .45rem;
            font-size: .28rem;
          }
          .time{
            line-height: .45rem;
            font-size: .24rem;
            color: #979797;
          }
          .address{
            font-size: .24rem;
            color: #979797;
          }
        }
      }
      .bottom{
        height: 1.1rem;
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        border-top: .02rem solid #f6f6f6;
        .left{
          .status{
            color: #3596FD;
            font-size: .28rem;
            margin-right: .3rem;
          }
          .red{
            color: red;
          }
          .green{
            color: #49d439;
          }
          .price{
            color: #FFB100;
            font-size: .28rem;
          }
        }
        .btn{
          display: inline-block;
          font-size: .24rem;
          height: .5rem;
          line-height: .5rem;
          border-radius: .1rem;
          text-align: center;
          padding: 0 .2rem;
          color: #fff;
          background-color: #3596FD;
        }
      }
    }
  }
  .header{
    width: 100%;
    height: 1.6rem;
    background-image: url(../../../assets/me_bg.jpg);
  }
  .tab{
    margin: 0 auto;
    margin-top: -1rem;
    width: 6.9rem;
    height: 2rem;
    background-color: #fff;
    border-radius: .15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .p1{
      font-size: .28rem;
    }
    .p2{
      font-size: .24rem;
      padding: .1rem 0;
      span{
        font-weight: bold;
        font-size: .38rem;
      }
    }
    .p3{
      font-size: .24rem;
      color: #3596FD;
    }
    .left{
       flex-grow:1;
      border-right: .02rem solid #f6f6f6;
    }
    .right{
       flex-grow:1;

    }
  }
</style>
