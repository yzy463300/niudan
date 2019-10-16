<template>
  <div class="status">
    <div class="top">
      <div class="left">
        <div class="num icon">
          <van-icon name="share"  color="#3596FD"/>
          <span>群发人数:{{task_count}}</span>
        </div>
        <div class="read_num icon">
          <van-icon name="eye-o"  color="#3596FD"/>
          <span>已阅人数:{{read_count}}</span>
        </div>
       <!--  <div class="sender icon">
          <van-icon name="user-o"  color="#3596FD"/>
          <span>发送人:{{creator_id}}</span>
        </div> -->
        <div class="time icon">
          <van-icon name="clock-o" color="#3596FD"/>
          <span>时间:{{new Date(+add_time*1000).Format('yyyy-MM-dd hh:mm')}}</span>
        </div>
      </div>
      <!-- <div class="right" @click='onDetail()'>
        <span>内容详情</span>
        <van-icon name="arrow"  color="#3596FD"/>
      </div> -->
    </div>
    <div class="tab">
      <van-tabs v-model="active" @change='onChange'>
        <van-tab title="全部"></van-tab>
        <van-tab title="已阅读"></van-tab>
        <van-tab title="未阅读"></van-tab>
      </van-tabs>
    </div>
    <van-list
      class='v_list'
      v-model="loading"
      :finished="finished"
      finished-text="没有更多"
      @load="onLoad"
    >
      <div class="item bbox" v-for="item in list">
        <div class="left">
          <div class="head_wrap">
            <img :src="item.headimgurl || 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png'" height="131" width="201" alt="">
          </div>
          <div class="text">
            <p class="p1"><span class="name">{{item.name}}</span><span class="tel" @click='onTel(item.telephone)'>{{item.telephone}}</span></p>
            <p class="company">{{item.company}}</p>
          </div>
        </div>
        <div class="right">
          {{item.statusText}}
        </div>
      </div>
    </van-list>
  <!--   <div class="btn_wrap">
     <div class="left_btn" @click='sendTmp()'>再推模版消息</div>
     <div class="right_btn" @click='sendNote()'>转短信通知</div>
   </div> -->
  </div>
</template>

<script>
import { noticeStatusReports, } from '@/service/getData.js'
export default {
  data () {
    return {
      pageIndex:1,
      loading: false,
      finished: false,
      active:0,
      task_count:'',
      read_count:'',
      creator_type:'',
      creator_id:'',
      add_time:'',
      send_status:-1,
      notice_id:0,
      list:[],
    }
  },
  async activated(){
    this.notice_id = this.$route.query.notice_id
  },
  computed:{
    is_read(){
      if (this.active == 0) return -1
      if (this.active == 1) return 1
      if (this.active == 2) return 0
    }
  },
  methods:{
    onTel(tel){
      location.href = `tel:${tel}`
    },
    onChange(){
      this.pageIndex = 1
      this.loading = false
      this.finished = false
      this.list = []
    },
    async onLoad(){
      this.getData({
        page:this.pageIndex++,
        size:6,
        is_read:this.is_read,
        send_status:this.send_status,
        notice_id:this.notice_id
      })
    },
    async getData(params){
      const res = await noticeStatusReports(params)
      this.task_count = res.data.info.task_count
      this.read_count = res.data.info.read_count
      this.creator_type = res.data.info.creator_type
      this.creator_id = res.data.info.creator_id
      this.add_time = res.data.info.add_time
      this.list = this.list.concat(res.data.lists)
      this.loading = false
      if (this.list.length >= res.data.count) {
        this.finished = true
      }
    },
   
    onDetail(){
      this.$emit('on-detail')
    },
    sendTmp(){
      this.$emit('send-tmp')
    },
    sendNote(){
      this.$emit('send-note')
    },
  },
  components:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .btn_wrap{
    height: 1rem;
    width: 100%;
    display: flex;
    color: #fff;
    font-size: .32rem;
    text-align: center;
    line-height: 1rem;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    .left_btn{
      width: 50%;
      background-color: rgba(9,186,8,1);
    }
    .right_btn{
      width: 50%;
      background-color: rgba(53,150,252,1);
    }
  }
  .v_list{
    margin-top: .3rem;
    .item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .3rem .5rem;
      background-color: #fff;
      border-bottom: .02rem solid #f6f6f6;
      .left{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .right{
        color: #09bb07;
      }
      .head_wrap{
        margin-right: .3rem;
        width: .8rem;
        height: .8rem;
        border-radius: .4rem;
        overflow: hidden;
        img{
          width: .8rem;
          height: .8rem;
        }
      }
      .text{
        .p1{
          margin-bottom: .1rem;
          .name{
            font-size: .32rem;
            margin-right: .2rem;
          }
          .tel{
            color: #3596fd;
            font-size: .28rem;
          }
        }
        .company{
          color: #979797;
          font-size: .22rem;
        }
      }
    }
  }
 .top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-bottom: .1rem;
  padding-right: .2rem;
  .left{
    display: flex;
    flex-wrap: wrap;
    width: 5.5rem;
    flex-direction: column;
    .icon{
      display: flex;
      align-items: center;
      margin-top: .1rem;
      padding-left: .2rem;
      span{
        margin-left: .1rem;
      }
    }
  }
  .right{
    display: flex;
    align-items: center;
    color: #3596FD;
  }
  .icon{
    /* display: flex;
    align-items: center; */
  }
 }
</style>
