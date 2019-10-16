<template>
  <div class="complain">
    <div class="tab">
      <p class="title">内容分类</p>
      <div class="btn_wrap">
        <div class="btn bbox" @click='tabIndex = index' :class="[tabIndex == index ? 'active' : '']" v-for="(item,index) in tabList">{{item}}</div>
      </div>
    </div>
    <div class="content">
      <p class="title">详细分类</p>
      <div class="text_wrap">
        <ytextarea class="" v-model="value" length="500" placeholder="请说明详细内容"></ytextarea>
      </div>
      <van-cell-group>
        <van-field
          v-model="name"
          required
          clearable
          label="姓名"
          placeholder="请输入姓名"
        />
        <van-field
          v-model="telephone"
          required
          clearable
          label="联系方式"
          placeholder="请输入手机号码"
        />
        <van-field
          v-model="email"
          required
          clearable
          label="邮箱"
          placeholder="请输入电子邮箱"
        />
      </van-cell-group>
      <van-button size="large" type="info" class="submit" @click='submit'>提交</van-button>
    </div>
  </div>
</template>

<script>
import { suggestSubmit } from '@/service/getData.js'
import ytextarea from '../../../components/Ytextarea.vue'
export default {
  data () {
    return {
      value:'',
      tabIndex:0,
      name:'',
      telephone:'',
      email:'',
      tabList:['投诉','建议','表扬','维权']
    }
  },
  mounted(){},
  activated(){},
  methods:{
    async submit(){
      if (!this.value) {
        this.$dialog.alert({message:'请填写投诉内容'})
        return
      }
      if (!this.name) {
        this.$dialog.alert({message:'请填写姓名'})
        return
      }
      if (!this.telephone && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.telephone)) {
        this.$dialog.alert({message:'请填写手机号码'})
        return
      }
      if (!this.email && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(this.email)) {
        this.$dialog.alert({message:'请填写邮箱地址'})
        return
      }
      const params = {
        content:this.value,
        type:this.tabIndex+1,
        name: this.name,      //姓名(选填)
        telephone: this.telephone, //联系电话(选填)
        email: this.email,     //邮箱(选填)
      }
      const res = await suggestSubmit(params)
      if (res) {
        this.value = ''
        this.tabIndex = 0
        this.$dialog.alert({message: '提交成功'})
        this.$router.replace('/meCenter')
      }
    }
  },
  components:{
    ytextarea
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .complain{
    background-color: #fff;
    padding: .4rem .3rem;
    .submit{
      margin-top: .8rem;
      margin-bottom: 1.4rem;
    }
  }
  .content{
    margin-top: .4rem;
    .title{
      margin-bottom: .4rem;
    }
    .text_wrap{
      width: 6.9rem;
      height: 4rem;
    }
  }
 .tab{
  .btn_wrap{
    margin-top: .4rem;
    display: flex;
    justify-content: space-between;
  }
  .btn{
    width: 1.5rem;
    height: .7rem;
    line-height: .7rem;
    text-align: center;
    color: #3596FD;
    border-radius: .1rem;
    border:.02rem solid #3596FD;
  }
  .btn.active{
    background-color: #3596FD;
    color: #fff;
  }
 }
</style>
