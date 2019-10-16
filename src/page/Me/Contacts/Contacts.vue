<template>
  <div class="contacts">
    <van-cell-group>
      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入真实姓名"
        :error-message="usernameErr"
      />
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
        :error-message="phoneErr"
      />
      <van-field
        v-model="position"
        label="职务"
        placeholder="请输入所在公司职务"
        :error-message="positionErr"
      />
      <van-field
        v-model="email"
        label="邮箱"
        placeholder="请输入邮箱"
        :error-message="emailErr"
      />
      <van-field
        v-model="wx"
        label="微信"
        placeholder="请输入微信号"
        :error-message="wxErr"
      />
    </van-cell-group>
    <div class="btn_wrap">
      <van-button size="large" type="info" @click='onSave'>保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username:'',
      phone:'',
      position:'',
      email:'',
      wx:'',
      usernameErr:'',
      phoneErr:'',
      positionErr:'',
      emailErr:'',
      wxErr:'',
    }
  },
  mounted(){
  },
  activated(){
  },
  methods:{
   onSave(){
    if (!this.username) {
      this.usernameErr = '请输入真实姓名'
      return
    }else{
      this.usernameErr = ''
    }
    if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone))) {
      this.phoneErr = '请输入正确的手机号'
      return
    }else{
      this.phoneErr = ''
    }
    if (!this.position) {
      this.positionErr = '请输入公司职位'
      return
    }else{
      this.positionErr = ''
    }
    if (!(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(this.email))) {
      this.emailErr = '请输入正确的邮箱号'
      return
    }else{
      this.emailErr = ''
    }
    if (!this.wx) {
      this.wxErr = '请输入微信号'
      return
    }else{
      this.wxErr = ''
    }
    const params = {
      username:this.username,
      phone:this.phone,
      position:this.position,
      email:this.email,
      wx:this.wx
    }
    // this.$emit('on-save',params)
   }
  },
  components:{
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
 .btn_wrap{
  padding: .5rem .4rem;
 }
</style>
