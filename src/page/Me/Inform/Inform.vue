<template>
  <div class="inform">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多通知"
      @load="onLoad"
    >
      <van-cell @click="itemClick(item.notice_id)" v-for="(item,index) in list" :key='item.notice_id' :title="item.title" is-link  :label='new Date(+item.add_time*1000).Format("yyyy-MM-dd")' class='item'/>
    </van-list>
  </div>
</template>

<script>
import { receivedNoticeList } from '@/service/getData.js'
export default {
  data () {
    return {
      pageIndex:1,
      loading:false,
      finished:false,
      list:[]
    }
  },
  mounted(){},
  activated(){},
  methods:{
    async onLoad(){
      const res = await receivedNoticeList({
        page:this.pageIndex++,
        size:6
      })
      this.list = this.list.concat(res.data.lists)
      this.loading = false
      if (this.list.length >= res.data.count) {
        this.finished = true
      }
    },
    itemClick(id){
      this.$router.push({path:'informDetail',query:{notice_id:id,type:'information'}})
    }
  },
  components:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
 .item{
  margin-top: .3rem;
 }
</style>
