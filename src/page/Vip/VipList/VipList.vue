<template>
  <div class="vip_list">
    <div class="top">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          background="#fff"
          @search="onSearch"
          @cancel="onCancel"
          @clear="onClear"
        />
      </form>
      <!-- <div class="map" @click='nearbyClick'>
        <van-icon name="map-marked" size="1.6em" color="#3596FD"/>
        附近
      </div> -->
    </div>
    <div class="main">
      <van-tabs v-model="active" color="#3596FD" title-active-color="#3596FD">
        <van-tab :title="item.label" v-for="(item,index) in navList" :key='index' v-if='item.children.length > 0'>
          <div class="item_wrap scroll">
            <div class="item" v-for="(it,ind) in item.children" @click='itemClick(it.id)' :key='ind'>
              <div class="left"><img :src="it.logo" height="131" width="201" alt=""></div>
              <div class="right">
                <div class="name">{{it.name}}</div>
                <div class="business"><span class="tag">业务范围:</span>{{JSON.parse(it.business).join('、')}}</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { memberList } from '@/service/getData.js'
export default {
  data () {
    return {
      value:'',
      active:0,
      navList:[],
      data:{
        lists:[
          {
            title:'平台类',
            items:[
              {
                id:'1',
                company:'湖南虫洞文化传播有限公司',
                business:'化妆品、电商',
              },
            ]
          },
          {
            title:'应用类',
            items:[
              {
                id:'1',
                company:'湖南虫洞文化传播有限公司',
                business:'化妆品、电商',
              },
            ]
          },
          {
            title:'专委',
            items:[
              {
                id:'1',
                company:'湖南虫洞文化传播有限公司',
                business:'化妆品、电商',
              },
            ]
          },
        ]
      }
    }
  },
  props:{},
  mounted(){},
  activated(){
    this.getMemberList()
  },
  methods:{
    async getMemberList(keyword){
      console.log(keyword)
      const res = await memberList({keyword})
      this.navList = res.data.groupList[0].options
      this.navList.forEach((item,index)=>{
        Object.assign(item,{children:[]})
        res.data.memberList.forEach((it,index)=>{
          try{
            let arr = JSON.parse(it[res.data.groupList[0]['id']])
            arr.forEach((i,index)=>{
              if (i === item.value) {
                item.children.push(it)
              }
            })
          }catch(err){
            if (it[res.data.groupList[0]['id']] == item.value) {
              item.children.push(it)
            }
          }
        })
      })
    },
    itemClick(id){
      this.$router.replace({path:'/vipDetail',query:{member_id:id}})
    },
    nearbyClick(){
      this.$emit('nearbyClick')
    },
    onSearch(){
      this.getMemberList(this.value)
      // this.$emit('onSearch',this.value)
    },
    onCancel(){
      this.getMemberList()
    },
    onClear(){
      this.getMemberList()
    }
  },
  components:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' >
  .main{
    margin-top: .1rem;
  }
  .vip_list{
    .van-tabs--line{
      padding-top: 0;
      position: static;
      box-shadow: 0 0.01rem 0.2rem #ccc;
    }
    .van-tabs__wrap{
      position: static;
    }
    .item_wrap{
      position: absolute;
      left: 0;
      bottom:0;
      right: 0;
      top: 2.1rem;
    }
    .item{
      padding: .3rem;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      background-color: #fff;
      align-items: center;
      border-bottom: .02rem solid #f6f6f6;
      .right{
        .name{
          font-size: .32rem;
          margin-bottom: .1rem;
        }
        .business{
          color: #979797;
          .tag{
            color: #FFB100;
            margin-right: .1rem;
          }
        }
      }
      .left{
        margin-right: .3rem;
        img{
          width: 1rem;
          height: 1rem;
          border-radius: .1rem;
        }
      }  
    }
    .top{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      .van-search{
        /*padding-right: 0;*/
      }
      .van-cell{
        background-color: #f6f6f6;
      }
      form{
        flex-grow:1;
      }
      .map{
        width: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #3596FD;
      }
    }
  }

</style>
