<template>
  <div class="chose_user">
    <div class="add bbox" @click='confirm'>
      <van-button size='small' plain type="info" @click='cancel'>取消</van-button>
      <van-button size='small' type="info" class='c' @click='cancel'>完成({{result.length}})</van-button>
    </div>
    <van-tabs v-model="active" color="#3596FD" title-active-color="#3596FD" >
      <van-tab :title="i.name" v-for="(i,j) in groupList" :key='i.name'>
        <van-collapse v-model="ac">
            <van-collapse-item :name='item.label' v-for="(item,index) in data[j]" :key='item.label' v-show='item.childrens.length > 0'>
              <div slot="title" class="flex">
                <!-- {{item}} -->
                <span>{{item.label}}</span>
                <div class="wrap">
                  <van-button plain size="mini" type="info" @click.stop="choseAll(item,index)" v-if='!item.isfull'>全选</van-button>
                  <van-button  size="mini" type="warning" @click.stop="reserveAll(item,index)" v-if='item.isfull'>反选</van-button>
                  <!-- <van-button plain size="mini" type="info" @click.stop>已选{{item.choseNum}}</van-button> -->
                </div>
              </div>
              <div class="list">
                <div class="item" v-for="(it,ind) in item.childrens" :key='it.id'>
                  <van-checkbox-group v-model="result" >
                    <van-checkbox
                      label-position='left'
                      :key="it.userid"
                      :name="it.userid"
                      :disabled="!it.userid"
                      @click='checkboxChange()'
                    >
                      <div class="left">
                        <div class="head_wrap">
                          <img :src="it.headimgurl || 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png'" height="131" width="201" alt="">
                        </div>
                        <div class="text_wrap">
                          <p class="p1"><span class="name">{{it.name}} </span><span class="tel">{{it.telephone}}</span></p>
                          <p class="p2">
                            {{it.company}}
                          </p>
                        </div>
                      </div>
                    </van-checkbox>
                  </van-checkbox-group>
                </div>
              </div>
            </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { contactList } from '@/service/getData.js'
export default {
  data () {
    return {
      active:0,
      num:0,
      checked:false,
      result:[],
      ac:[],
      activeNames: 0,
      data:[],
      groupList:[],
      memberList:[],
    }
  },
  props:{},
  computed:{
    userList(){
      let arr = []
      this.data.forEach((item,index)=>{
        item.forEach((it,index)=>{
          this.result.forEach((j,index)=>{
            it.childrens.forEach((i,index)=>{
              if (i.userid == j) {
                arr.push(i.name)
              }
            })
          })

        })
      })
      arr = this.uniq(arr)
      return arr
    }
  },
  async mounted(){
    const res = await contactList()
    if (res) {
      this.groupList = res.data.groupList
      this.memberList = res.data.memberList
      this.groupList.forEach((item,index)=>{
        item.options.forEach((i,index)=>{
          this.$set(i,'choseNum',0)
          this.$set(i,'isfull',false)
          this.$set(i,'useridList',[])
          this.$set(i,'childrens',[])
          this.memberList.forEach((it,index)=>{
            it.user_list.forEach((x,index)=>{
              if (!x.userid) {
                it.user_list.splice(index,1)
              }
              this.$set(x,'company',it.name)
            })
            try{
              let arr = JSON.parse(it[item['id']])
              arr.forEach((j,index)=>{
                if (j === i.value) {
                  i.childrens = i.childrens.concat(it.user_list)
                }
              })
            }catch(err){
              if (it[item['id']] == i.value) {
                i.childrens = i.childrens.concat(it.user_list)
              }
            }
          })
          i.childrens.forEach((user,index)=>{
            i.useridList.push(user.userid)
          })
        })
        this.data.push(item.options)
      }) 
    }
  },
  methods:{
    uniq(array){
        var temp = []; //一个新的临时数组
        for(var i = 0; i < array.length; i++){
            if(temp.indexOf(array[i]) == -1){
                temp.push(array[i]);
            }
        }
        return temp;
    },
    checkboxChange(){
      setTimeout(()=>{
        this.data.forEach((item,index)=>{
          item.forEach((it,index)=>{
            if (this.isContained(this.result,it.useridList)) {
              it.isfull = true
            }else{
              it.isfull = false
            }
            this.result.forEach((userid,index)=>{
              it.useridList.forEach((id,index)=>{
                if (userid == id) {
                  it.choseNum++
                }
              })
            })
          })
        })
      })
    },
    isContained(aa, bb) {
      if(!(aa instanceof Array) || !(bb instanceof Array) || ((aa.length < bb.length))) {
        return false;
      }
      for (var i = 0; i < bb.length; i++) {
        var flag = false;
        for(var j = 0; j < aa.length; j++){
          if(aa[j] == bb[i]){
            flag = true;
            break;
          }
        }
        if(flag == false){
          return flag;
        }
      }
      return true;
    },
    checkClick(index,ind){
      this.$refs.checkboxes[ind].toggle();
      // console.log(this.data[this.active][index].childrens[ind])
      this.checkNum()
    },
    tabChange(){},
    confirm(){},
    cancel(){
      this.$emit('cancel',{
        receiver_id_list:this.result,
        userList:this.userList
      })
    },
    choseAll(item,index){
      this.data[this.active][index].isfull = true
      item.childrens.forEach((item,index)=>{
        if (item.userid) {
          this.result.push(item.userid)
        }
      })
      this.result = this.filterArr(this.result)
      this.checkboxChange()
    },
    reserveAll(item,index){
      this.data[this.active][index].isfull = false
      for (let i = this.result.length - 1; i >= 0; i--) {
        item.useridList.forEach((userid,ind)=>{
          if (this.result[i] == userid) {
            this.result.splice(i,1)
          }
        })
      }
      this.checkboxChange()
    },
    filterArr(arr){
      var hash=[];
      for (var i = 0; i < arr.length; i++) {
        if(hash.indexOf(arr[i])==-1){
         hash.push(arr[i]);
        }
      }
      return hash;
    }
  },
  components:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@base:#3596FD;
.chose_user{
  background-color: #fff;
}
  .add{
    padding: .2rem .5rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    /*height: .98rem;*/
    color: #ffff;
    font-size: .38rem;
    display: flex;
    align-items: center;
    .c{
      color: #fff;
      .van-button--info{
       color:#fff;
      }
    }
    /*background-color: @base;*/
  }
  .item{
    padding-bottom: .2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 6rem;
      .text_wrap{
        .p1{
          font-size: .28rem;
          .name{
            color: #000;
          }
          .tel{
            color: #3596FD;
          }
        }
        .p2{
          display: flex;
          align-items: center;
          font-size: .22rem;

        }
      }
      .head_wrap{
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: .2rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .right{

    }
  }
 .van-button--info{
  color:#1989fa;
 }
 .flex{
  display: flex;
  justify-content: space-between;
 }
</style>
