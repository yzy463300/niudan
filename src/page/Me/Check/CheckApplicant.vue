<template>
  <div class="check_applicant">
    <van-tabs @change='resetList' v-model="active" color="#3596FD" title-active-color="#3596FD" >
      <van-tab :title="item" v-for="(item,index) in navList" :key='index'>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多"
          @load="onLoad"
        >
          <div class="item" v-for="(item,index) in list" :key='index' @click='gotoArticle(item)'>
            <div class="item bbox it">
              <div class="left">
                <p class="p1" v-if='item.check_status == 0'>活动报名申请待审批</p>
                <p class="p1" v-if='item.check_status == 1'>活动报名申请通过</p>
                <p class="p1" v-if='item.check_status == 2'>活动报名申请未通过</p>
                <p class="p2">申请人:{{item.name}}</p>
                <p class="p3">{{new Date(+item.add_time*1000).Format("yyyy-MM-dd hh:mm")}}</p>
              </div>
              <div class="right">
                处理
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
        </van-list>
        <div class="item_wrap">
          
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>
<script>
import { freeJoinActivityRequestList } from '@/service/getData.js'
export default {
  data () {
    return {
      list:[{
        "request_id": 1,        //申请id
        "user_id": 1,           //申请者用户id
        "activity_id": 1,       //活动id
        "title": "",            //活动标题
        "name": "",             //姓名
        "mobile": "",           //手机号
        "position": "",         //职位
        "check_status": 0,      //审核状态，0：待审核，1：审核通过，2：审核不通过
        "check_msg": "",        //审核理由
        "add_time": ""          //申请时间戳
        }],
      pageIndex:1,
      active:0,
      loading: false,
      finished: false,
      check_status:-1,
      navList:['全部','待审核','通过','未通过'],
    }
  },
  mounted(){
  },
  async activated(){
    this.resetList()
  },
  watch:{
    active(val){
      if (val == 0) {
        this.check_status = -1
      }
      if (val == 1) {
        this.check_status = 0
      }
      if (val == 2) {
        this.check_status = 1
      }
      if (val == 3) {
        this.check_status = 2
      }
    }
  },
  methods:{
    resetList(){
      this.pageIndex = 1
      this.loading = false
      this.finished = false
      this.list = []
    },
    gotoArticle(item){
      this.$router.push({path:'/checkDetail',query:{
        request_id:item.request_id,
        name:item.name,
        position:item.position,
        mobile:item.mobile,
        add_time:item.add_time,
        check_status:item.check_status,
        title:item.title,
        check_msg:item.check_msg 
      }})
    },
    async onLoad() {
      const res = await freeJoinActivityRequestList({
        check_status:this.check_status,
        page:this.pageIndex++,
        size:5
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
 .it{
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .3rem .4rem;
  width: 100%;
  .left{
    .p1{
      color: #3596FD;
      font-size: .32rem;
    }
    .p2{
      padding: .15rem 0;
    }
    .p3{
      color:#979797;
    }
  }
  .right{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3596FD;
  }
 }
</style>
