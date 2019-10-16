<template>
  <div class="contacts">
    <div class="search_wrap">
      <div class="left" @click='sortShow = true'>
        <van-icon name="apps-o" size="2em" color="#3596FD"/>
        <p>分类</p>
      </div>
      <div class="right">
        <form action="/">
          <van-search
            v-model="searchValue"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
      </div>
    </div>
    <van-collapse v-model="activeNames" class='list_padding'>
      <van-collapse-item v-for="(item,index) in lists" :title="item.label" :key='item.label' :name="index" v-if='item.children.length > 0'>
        <div class="item" v-for='(it,index) in item.children' @click='gotoDetail(it,lists[index])'>
          <div class="left">
            <div class="head_wrap">
              <img :src="it.headimgurl || 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png'">
            </div>
            <div class="context" >
              <p class="nickname">{{it.name}}</p>
              <p class="company">
                {{item.name}}
                <!-- <van-icon name="arrow" size="1em"/> -->
              </p>
            </div>
          </div>
          <van-icon name="phone-o" size="2em" color="#3596FD" @click='phoneClick(it.telephone)'/>
        </div>
      </van-collapse-item>
    </van-collapse>
    <!-- 分类上拉菜单 -->
    <van-actionsheet
      v-model="sortShow"
      :actions="groupList"
      @select="sortSelect"
    />
  </div>
</template>
<script>
import { contactList } from '@/service/getData.js'
export default {
  data () {
    return {
      searchValue:'',
      sortShow:false,
      lists:[],
      activeNames: [0],
      data:{},
      groupList:[],
      memberList:[]
    }
  },
  mounted(){
   
  },
  async activated(){
    const res = await contactList()
    if (res) {
      this.data = res.data
      this.groupList = res.data.groupList//分组信息   
      this.sortSelect(this.groupList[0])
    }
  },
  methods:{
    gotoDetail(it,item){
      console.log(it,item)
      this.$router.push({path:'/contactsDetail',query:{
        id:item.id,
        userid:it.userid,
        name:it.name,
        telephone:it.telephone,
        position:it.position,
        // nickname:it.nickname,
        headimgurl:it.headimgurl,
        company:item.name,
        // brief_name:item.brief_name,
      }})
    },
    onSelect(){
      
    },
    onSearch(){},
    onCancel(){
      this.searchValue = ''
    },
    phoneClick(tel){
      location.href= `tel:${tel}`
    },
    sortSelect(it) {
      console.log(it)
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.lists = []
      this.sortShow = false;
      it.options.forEach((item,index)=>{
        this.$set(item,'children',[])
        this.$set(item,'name','')
        this.$set(item,'id','')
        this.$set(item,'brief_name','')
        this.data.memberList.forEach((et,index)=>{
          item.brief_name = et.brief_name
          item.name = et.name
          item.id = et.id
          try{
            let arr = JSON.parse(et[it['id']])
            arr.forEach((j,index)=>{
              if (j === item.value) {
                item.children = item.children.concat(et.user_list)
              }
            })
          }catch(err){
            if (et[it['id']] == item.value) {
              item.children = item.children.concat(et.user_list)
            }
          }
        })
        this.lists = it.options
      })
    }
  },
  components:{},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@base:#3596FD;
.list_padding{
  padding-top: 60px;
}
 .contacts{
  .search_wrap{
    background-color: #fff;
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
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem 0;
    border-bottom: .02rem solid #f6f6f6; 
    .left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .item:nth-last-child(1){
    border: none;
  }
  .context{
    .nickname{
      font-size: .28rem;
      color: #000;
    }
    .company{
      display: flex;
      align-items: center;
      color: #979797;
      font-size: .22rem;
    }
  }
  .head_wrap{
    width: .6rem;
    height: .6rem;
    border-radius: .3rem;
    overflow: hidden;
    margin-right: .2rem;
    img{
      width: .6rem;
      height: .6rem;
      border-radius: .3rem;
    }
  }
 }
</style>
