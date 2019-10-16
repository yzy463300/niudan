<template>
  <div class="send_inform">
    <div class="content" v-show="!isChose">
      <p class="title">发件人:</p>
      <div class="border bbox">
        <p class="name">{{userList+''}}</p>
        <p class="add">
          <van-button plain type="info" size="mini" @click='isChose = true'>选择</van-button>
        </p>
      </div>
      <!--  -->
      <p class="title">标题:</p>
      <div class="border bbox">
        <input type="text" id='title' v-model="title" placeholder="请填写通知标题">
      </div>
      <!--  -->
      <p class="title">内容:</p>
      <div class="text_wrap">
        <ytextarea class="" v-model="content" length="500" placeholder="请填写通知内容"></ytextarea>
      </div>
      <p class="title">发送方式:</p>
      <div class="border bbox radio_wrap">
        <van-radio-group v-model="send_type">
          <van-radio name="0">只发模版消息</van-radio>
          <van-radio name="1">只发短信</van-radio>
          <van-radio name="2">模版消息和短信都发</van-radio>
        </van-radio-group>
      </div>
      <p class="title" v-if='send_type == 0'>发送模版消息失败时,自动转为短信消息:</p>
      <div class="border bbox radio_wrap" v-if='send_type == 0'>
        <van-radio-group v-model="fail_send_mobile">
          <van-radio name="0">否</van-radio>
          <van-radio name="1">是</van-radio>
        </van-radio-group>
      </div>
      <p class="submit_wrap">
        <van-button size="large" type="info" class="submit" @click='submit'>发送</van-button>
      </p>
    </div>
    <!-- <div v-show="isChose"> -->
      <transition name="van-slide-up">
        <ChoseUser class="" v-show="isChose" @cancel='choseuserChange'></ChoseUser>
      </transition>
    <!-- </div> -->
  </div>
</template>

<script>
import { createNotice } from '@/service/getData.js'
import ytextarea from '../../../components/Ytextarea.vue'
import ChoseUser from '@/page/Me/Push/ChoseUser'
export default {
  data () {
    return {
      isChose:false,
      userList:'已选中0位收件人',
      receiver_id_list:'',
      content:'',
      title:'',
      send_type:'0',
      fail_send_mobile:'0'
    }
  },
  mounted(){},
  activated(){},
  methods:{
    choseuserChange(params){
      console.log(params)
      this.isChose = false
      this.receiver_id_list = params.receiver_id_list
      this.userList = params.userList

    },
    async submit(){
      if (this.userList.length <= 0) {
        this.$dialog.alert({message: '请选择发件人'})
        return
      }
      if (!this.title) {
        this.$dialog.alert({message: '请填写标题'})
        return
      }
      if (!this.content) {
        this.$dialog.alert({message: '请填写内容'})
        return
      }
      const params = {
        receiver_id_list: this.receiver_id_list,  //接收用户的userid
        send_type: +this.send_type,                    //发送方式，0：只发模版消息，1：只发短信，2：模版消息和短信都发
        fail_send_mobile: +this.fail_send_mobile,             //是否在发送模版消息失败时，自动转为短信消息，0：否，1：是 
        title: this.title,                       //通知标题 
        content: this.content, 
      }
      const res = await createNotice(params)
      if (res) {
        this.$dialog.alert({message: '发送成功'})
        this.$router.replace({path:'push'})
      }

    } 
  },
  components:{
    ytextarea,
    ChoseUser
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.van-radio{
  margin-top: .2rem;
}
.submit_wrap{
  padding-top: .6rem;
}
.add{
  display: flex;
  justify-content: flex-end;
  padding-top: .15rem;
  color: #1989fa;
  .van-button--mini{
    color: #1989fa;
  }
}
.send_inform{
  background-color: #fff;
  padding-top: 0;
  padding-bottom: 1rem;
}
input{
  width: 100%;
  border: none;
}
textarea{
  border: none;
}
.border{
  width: 6.9rem;
  border: .02rem solid #D2D2D2;
  border-radius: .1rem;
  padding: .3rem;
}
.border.radio_wrap{
  border: none;
  padding-top: 0;
}
.content{
  padding: 0 .3rem;

  padding-top: .4rem;
  .title{
    margin-top: .2rem;
    margin-bottom: .4rem;
  }
  .text_wrap{
    width: 6.9rem;
    height: 5rem;
  }
}
</style>
