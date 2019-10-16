<template>
  <div class="push">
<!--   	<van-search
  	  v-model="value"
  	  placeholder="搜索活动"
  	  show-action
  	  shape="round"
  	  @search="onSearch"
  	>
  	  <div slot="action" @click="onSearch">搜索</div>
  	</van-search> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多通知"
      @load="onLoad"
    >
      <div class="list">
        <div class="item" v-for="item in list" @click='onClick(item.notice_id)'>
          <div class="left textoverflow">{{item.title}}</div>
          <div class="right">
            <div class="top">{{item.read_count}}/{{item.task_count}}</div>
            <van-button plain size="mini" type="info" >状态报告</van-button>
          </div>
        </div>
      </div>
    </van-list>
    <div class="send" @click='send()'>发送通知</div>
  </div>
</template>

<script>
import { createdNoticeList } from '@/service/getData.js'
export default {
  data () {
    return {
      pageIndex:1,
    	value:'',
      loading: false,
      finished: false,
      list: [],
    }
  },

  mounted(){
  },
  activated(){
    this.pageIndex = 1
    this.loading = false
    this.finished = false
    this.list = []
  },
  methods:{
    async onLoad() {
      const res = await createdNoticeList({
        page:this.pageIndex++,
        size:6
      })
      this.list = this.list.concat(res.data.lists)
      this.loading = false
      if (this.list.length >= res.data.count) {
        this.finished = true
      }
    },
    send(){
      this.$router.push({path:'SendInform'})
    },
    onClick(id){
      this.$router.push({path:'/statusReport',query:{notice_id:id}})
    },
    onSearch(){
      this.$emit('on-search',this.value)
    }
  },
  components:{

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  @base:#3596FD;
  .van-list{
    padding-bottom: 50px;
  }
  .send{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .98rem;
    color: #ffff;
    font-size: .38rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @base;
  }
 .push{
 	.item{
 		margin-top: .2rem;
 		border-left: .1rem solid #3596FD;
 		background-color: #fff;
 		padding: .3rem;
 		display: flex;
 		align-items: center;
 		.left{
 			line-height: .5rem;
 			padding-right: .4rem;
      width: 4.8rem;
 		}
		.right{
			padding-left: .3rem;
			border-left: .02rem solid #f6f6f6;
			display: flex;
			align-items: center;
			justify-content: space-around;
			flex-direction: column;
			color: #979797;
		}	
 	}
 	.van-button--info{
 		color:#1989fa;
 	}
 }
</style>
