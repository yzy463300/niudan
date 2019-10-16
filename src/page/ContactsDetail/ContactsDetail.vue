<template>
  <div class="contacts-detail">
    <div class="header">
      <img src="../../assets/home/home_thumb.png" height="131" width="201" class="thumb">
      <div class="mask bbox">
        <p class="name">{{name}}</p>
        <p class="company">{{company}}<img src="../../assets/company_icon.png" height="42" width="122" alt="" class="icon"></p>
        <div class="position">
          <p class="text">{{position}}</p>
          <p class="pv">
            <van-icon name="eye-o"/>
            <span class="pv_num">浏览数:{{1}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="contacts_content">
        <van-cell title="电话" :url="'tel:'+telephone" color="#589BF6" :value="telephone" icon="phone-o" is-link />
        <van-cell title="职位" color="#589BF6" :value="position" icon="manager-o"/>
    </div>
    <div class="card">
      <div class="head_img">
        <img :src="logo || 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png'" alt="">
      </div>
      <div class="right">
        <p class="company">{{company}}</p>
        <p class="business"><span class="n">业务范围: </span>{{business+''}}</p>
      </div>
    </div>
    <div class="card_btn" @click='toMember()'>查看企业主页</div>
    <!-- 列表 -->
    <div class="list-wrap bbox">
      <div class="head">
        <div class="title">参与过的活动</div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多"
        @load="onLoad"
      >
        <div class="item" v-for="item in list" @click='gotoMemberDetail(item.activity_id)'>
          <div class='link'>
            <img :src="item.thumb_img || 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png'" alt="" class="thumb">
            <div class="right">
              <div class="content textoverflow">{{item.title}}</div>
              <div class="time">时间: {{new Date(+item.start_time2*1000).Format("yyyy-MM-dd")}}开始</div>
              <div class="action_type">{{item.address}}</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { activityJoinList,getMemberDetail } from '@/service/getData.js'
export default {
  data () {
    return {
      logo:'',
      pageIndex:1,
      loading: false,
      finished: false,
      userid:'',
      name:'',
      telephone:'',
      position:'',
      // nickname:'',
      headimgurl:'',
      company:'',
      // brief_name:'',
      member_id:'',
      business:[],
      list:[]
    }
  },
  mounted(){

  },
  async activated(){
    this.list = []
    this.loading = false
    this.finished = false
    this.pageIndex = 1
    this.userid = +this.$route.query.userid
    this.member_id = this.$route.query.id
    this.name = this.$route.query.name
    this.telephone = this.$route.query.telephone
    this.position = this.$route.query.position
    // this.nickname = this.$route.query.nickname
    this.headimgurl = this.$route.query.headimgurl
    this.company = this.$route.query.company
    // this.brief_name = this.$route.query.brief_name
    const res = await getMemberDetail({member_id:this.member_id})
    if (res) {
      this.logo = res.data.logo
      res.data.base_info.forEach((item,index)=>{
        if (item.id == 'business') {
          this.business = item.value
        }
      })
    }
  },
  methods:{
    toMember(){
      this.$router.push({path:'/vipDetail',query:{member_id:this.member_id}})
    },
    gotoMemberDetail(activity_id){
      this.$router.push({path:'/action',query:{activity_id}})
    },
    async onLoad() {
      if (!this.userid) {
        this.loading = false
        this.finished = true
        return
      }
      const res = await activityJoinList({
        page:this.pageIndex++,
        size:3,
        user_id:this.userid
      })
      this.list = this.list.concat(res.data.lists)
      this.loading = false
      if (this.list.length >= res.data.count) {
        this.finished = true
      }
    },
  },
  components:{},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  @base:#3596FD;
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
        width: 4.5rem;
        display: flex;
        flex-wrap: wrap;
      }
      .thumb{
        width: 1.99rem;
        height: 1.2rem;
        margin-right: .32rem;
      }
      .content{
        color: #000;
        font-size: .28rem;
      }
      .time{
        width: 100%;
        color: #979797;
        font-size: .24rem;
      }
      .action_type{
        color: #979797;
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
      span{
        color: @base;
      }
    }
  }
  .card_btn{
    display: block;
    background-color: #fff;
    height: .8rem;
    text-align: center;
    line-height: .8rem;
    border-top: .02rem solid #f6f6f6;
    color: #589BF6;
  }
  .card{
    padding: .4rem .3rem;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    .right{
      width: 5.5rem;
      /*display: flex;*/
      /*flex-wrap: wrap;*/
      .business{
        color: #979797;
        .n{
          color: #FFB100;
        }
      }
    }
    .head_img{
      width: 1rem;
      height: 1rem;
      border-radius: .5rem;
      overflow: hidden;
      margin-right: .25rem;
      img{
        width: 1rem;
        height: 1rem;
      }
    }
  }
  .contacts_content{
    margin: .25rem 0;
  }
 .header{
  position: relative;
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding: .3rem;
    .name{
      font-size: .48rem;
    }
    .company{
      padding: .1rem 0;
      display: flex;
      align-items: center;
      font-size: .28rem;
      img{
        width: 1.22rem;
        height: .42rem;
      }
    }
    .position{
      font-size: .28rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      .pv{
        display: flex;
        align-items: center;
        background-color: #2179F0;
        border-radius: .25rem;
        height: .5rem;
        padding: 0 .2rem;
        .pv_num{
          margin-left: .1rem
        }
      }
    }
  }
  .thumb{
    width: 7.5rem;
    height: 4.5rem;
  }
 }
</style>
