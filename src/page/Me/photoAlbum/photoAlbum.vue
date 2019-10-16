<template>
  <div class="photo">
    <div class="search_wrap">
      <!-- <div class="left" @click='sortShow = true'>
        <van-icon name="apps-o" size="2em" color="#3596FD"/>
        <p>分类</p>
      </div> -->
      <div class="right">
        <form action="/">
          <van-search
            v-model="searchValue"
            placeholder="搜索相册名"
            show-action
            shape="round"
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多相册"
      @load="onLoad"
    >
      <div class="list" v-if='lists.length > 0'>
        <div class="item" v-for="(item,index) in lists" :key='index' @click='gotoDetail(item.id)'>
          <div class="left">
            <p class="title "><span class="name textoverflow">{{item.name}}&nbsp;&nbsp;</span><span class="num">({{item.num}}张)</span></p>
            <p class="time">{{new Date(+item.addtime*1000).Format('yyyy-MM-dd')}}</p>
          </div>
          <div class="right" v-if='admin_type == 2'>
            <van-button size="mini" plain type="info" @click='onEdit(item.id)' >编辑</van-button>
            <van-button size="mini" plain type="danger" @click='onDelete(item.id)'>删除</van-button>
          </div>
        </div>
      </div>
    </van-list>
    <div class="add" @click='popShow = true' v-if='admin_type == 2'>
      <van-icon name="plus" />
      新建相册
    </div>
    <!-- 时间选择 -->
      <div class="time_chose" v-show="timeShow">
        <transition name="van-slide-up">
          <van-datetime-picker
            title="请选择活动开始时间"
            v-model="currentDate"
            type="datetime"
            v-show="timeShow"
            :formatter="formatter"
            @confirm="onConfirm"
            @cancel="timeShow=false"
          />
        </transition>
      </div>

    <!-- 弹出新建相册选项 -->
    <transition name="van-slide-up">
      <div class="pop" v-show="popShow">
        <van-cell-group>
          <van-field v-model="name" label="相册名称" placeholder="创建一个新的相册名称" />
           <van-cell  title="活动开始时间" is-link :value="time" @click="timeShow = true" />
        </van-cell-group>
        <div class="btn_wrap">
          <div class="save" @click='onSave'>下一步</div>
          <div class="cancel" @click='popShow = false'>取消</div>
        </div>
      </div>
    </transition>
    <!-- 分类上拉菜单 -->
    <van-actionsheet
      v-model="sortShow"
      :actions="sortList"
      @select="sortSelect"
    />
  </div>
</template>
<script>
import { osssign,deletePhotoAlbum,getPhotoAlbumList,getUserinfo } from '@/service/getData.js'
export default {
  data () {
    return {
      pageIndex:1,
      loading:false,
      finished:false,
      name:'',
      currentDate:new Date(),
      timeShow:false,
      popShow:false,
      lists:[],
      sortList:[//分类列表
        {
          id:1,
          name:'职务分组'
        },
        {
          id:2,
          name:'部门分组'
        },
        {
          id:3,
          name:'企业类型分组'
        },
      ],
      sortShow:false,
      searchValue:'',
      admin_type:'',
    }
  },
  computed:{
    time(){
      const year = this.currentDate.getFullYear()
      const month = +this.currentDate.getMonth() + 1
      const day = this.currentDate.getDate()
      return `${year}年${month}月${day}日`
    }
  },
  mounted(){},
  async activated(){
    const res = await getUserinfo()
    this.pageIndex = 1
    this.admin_type = res.data.info.admin_type
  },
  methods:{
    
    async onLoad() {
      this.getData({
        page:this.pageIndex++,
        size:10
      })
    },
    async getData(params){
      const res = await getPhotoAlbumList(params)
      this.lists = this.lists.concat(res.data.lists)
      this.loading = false
      if (this.lists.length >= res.data.count) {
        this.finished = true
      }
    },
    onConfirm(){
      this.timeShow = false
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
       return `${value}日`
      } 
      return value;
    },
    pickClick(){

    },
    gotoDetail(id){
      this.$router.push({path:'/photoDetail',query:{album_id:id,admin_type:this.admin_type}})
    },
    onEdit(id){
      this.$router.push({path:'/photoDetail',query:{album_id:id}})
    },
    async onDelete(id){
      this.$dialog.confirm({
        title: '提示',
        message: '是否确认删除?'
      }).then(() => {
        this.confirmDel(id)
      }).catch(()=>{})
    },
    async confirmDel(id){
      const res = await deletePhotoAlbum({album_id:id})
      this.$dialog.alert({
        message: '相册删除成功'
      });
      this.lists = []
      this.pageIndex = 1
      this.getData({
        page:this.pageIndex++,
        size:10
      })
    },
    onSave(){
      if (!this.name) {
        this.$dialog.alert({
          message: '请填写相册名称'
        });
        return
      }
      const params = {
        create:1,//是否是创建相册
        name : this.name,
        startTime : Math.floor(Date.parse(this.currentDate)/1000)
      }
      console.log(params.startTime)
      this.$router.push({path:'/photoDetail',query:params})
      this.$emit('on-save',params)
    },
    sortSelect(a){
      this.$emit('select-click',a.id)
      this.sortShow = false
    },
    onSearch(){
      this.lists = []
      this.pageIndex = 1
      this.getData({
        page:this.pageIndex++,
        size:99,
        keyword:this.searchValue
      })
    },
    onCancel(){
      this.lists = []
      this.pageIndex = 1
      this.getData({
        page:this.pageIndex++,
        size:10
      })
    }
  },
  components:{
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@base:#3596FD;
  .no{
    padding: .5rem 0;
    font-size: .32rem;
  }
  .btn_wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 50px;
    width: 100%;
    .save{
      height: .98rem;
      width: 50%;
      background-color: @base;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
    .cancel{
      height: .98rem;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red;
      color: #fff;
    }
  }
  .time_chose{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.8);
    z-index: 9999;
    .van-picker{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
  .add{
    position: fixed;
    left: 0;
    bottom: 50px;
    width: 100%;
    height: .98rem;
    color: #ffff;
    font-size: .38rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @base;
  }
  .photo{
    padding-bottom: 1.98rem;
    .pop{
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
    }
  }
  .list{
    margin-top: .15rem;
    .item{
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: .3rem;
      justify-content: space-between;
      margin-bottom: .2rem;
      .left{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        width: 60%;
        .title{
          display: flex;
          width: 100%;
          font-size: .28rem;
          .name{
            max-width: 70%;
            display: inline-block;
          }
          .num{
            color: @base;
          }
        }
        .time{
          font-size: .24rem;
          color: #979797;
        }
      }
      .right{
      }
    }
  }
  .photo{
    .van-button--info{
      color: #1989fa;
    }
  }
  .van-list{
      padding-top: 60px;

  }
 .search_wrap{
   display: flex;
   justify-content: flex-start;
   position: fixed;
   left: 0;
   top: 0;
   z-index: 500;
   width: 100%;
   box-shadow:  0 0.01rem 0.2rem #ccc;
   .left{
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     color:@base;
     margin-left: .3rem;
   }
   .right{
     flex-grow: 1;
   }
 }
</style>
