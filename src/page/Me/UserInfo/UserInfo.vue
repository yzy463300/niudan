<template>
  <div class="userinfo" v-if='id'>
    <!--  -->
    <div class="form_wrap">
      <van-cell-group>
        <!--  -->
          <van-field
            v-model="name"
            label="姓名"
            placeholder="请输入真实姓名"
            :disabled = "disabled"
          />
          <van-field
            v-model="telephone"
            label="手机号"
            placeholder="请输入手机号"
            :disabled = "disabled"
            :readonly = "disabled"
          />
          <van-field
            v-model="company_name"
            label="公司名"
            placeholder="请输入公司名"
            :disabled = "disabled"
          />
            <!--  -->
          <van-field
            v-model="position"
            label="职位"
            placeholder="请输入职位"
            :disabled = "disabled"
          />
          <!--  -->
          <p class="sex">手机号是否公开:</p>
          <van-radio-group v-model="tel_public" class="dadio_group" :disabled = "disabled">
            <van-radio name="1">是(仅对协会会员公开)</van-radio>
            <van-radio name="2">否</van-radio>
          </van-radio-group>
          <!--  -->
          <p class="sex">性别:</p>
          <van-radio-group v-model="real_sex" class="dadio_group" :disabled = "disabled">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
          <!--  -->
          <van-cell title="生日" :is-link="!disabled" :clickable="!disabled" :value="getBrithday(birth_day,1)" @click="pickBrithday" />
          
          <!-- 籍贯 -->
          <van-cell title="籍贯" :is-link="!disabled" :clickable="!disabled" :value="region" @click="pickAddress"/>

      </van-cell-group>
      <!-- 时间选择 -->
      <div class="brithday" v-show="brithdayShow">
        <transition name="van-slide-up">
          <van-datetime-picker
            title="请选择生日"
            v-model="birth_day"
            type="date"
            v-show="brithdayShow"
            :min-date="minDate"
            :formatter="formatter"
            @confirm="getBrithday"
            @cancel="brithdayShow=false"
          />
        </transition>
      </div>
      <!-- 地址选择 -->
      <div class="address" v-show='addressShow'>
        <transition name="van-slide-up">
          <van-area v-show='addressShow' :area-list="areaList" @confirm="getAddress" @cancel="addressShow=false"/>
        </transition>
      </div>
    </div>
    <div class="btn_wrap" v-if="disabled">
      <van-button size="large" type="info" @click='disabled = false'>编辑</van-button>
    </div>
    <div class="btn_wrap tc" v-else>
      <van-button type="info" @click='onSave' class="save">保存</van-button>
      <van-button type="info" @click='disabled = true' class="cancel">取消</van-button>
    </div>
  </div>
</template>

<script>
import { getUserinfo,updateUserinfo } from '@/service/getData.js'
import area from '../../../utils/area.js'
export default {
  data () {
    return {
      areaList:area,
      radio:'男',
      brithdayShow:false,
      addressShow:false,
      maxDate: new Date(),
      minDate: new Date(1900,1,1),
      brithdayData:null,
      addressData:null,
      disabled:true,
      info:null,
      id:0,
      admin_type:0,
      name:'',
      telephone:'',
      tel_public:'',
      company_name:'',
      position:'',
      real_sex:'',
      birth_day:'',
      region:''
    }
  },
  props:{
  },
  mounted(){},
  async activated(){
    const res = await getUserinfo()
    this.name = res.data.info.name
    this.telephone = res.data.info.telephone
    this.tel_public = res.data.info.tel_public+'' || '2'
    this.company_name = res.data.info.company_name
    this.position = res.data.info.position
    this.real_sex = res.data.info.real_sex+'' || '1'
    this.birth_day = res.data.info.birth_day || '2019-01-01'
    this.region = res.data.info.region
    this.admin_type = res.data.admin_type
    this.id = res.data.id
    if (this.name) {
      this.disabled = true
    }else{
      this.disabled = false
    }
    console.log(this.birth_day)
  },
  methods:{
    pickAddress(){
      if (!this.disabled) {
        this.addressShow = true
      }
    },
    async onSave(){
      if (!this.name) {
        this.$dialog.alert({
          title: '提示',
          message: '请填写真实姓名'
        })
        return
      }
      if (!this.telephone && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.telephone)) {
        this.$dialog.alert({
          title: '提示',
          message: '请填写正确手机号'
        })
        return
      }
      if (!this.company_name) {
        this.$dialog.alert({
          title: '提示',
          message: '请填写公司名'
        })
        return
      }
      if (!this.position) {
        this.$dialog.alert({
          title: '提示',
          message: '请填写职位'
        })
        return
      }
      if (!this.birth_day) {
        this.$dialog.alert({
          title: '提示',
          message: '请选择生日'
        })
        return
      }
      if (!this.region) {
        this.$dialog.alert({
          title: '提示',
          message: '请选择籍贯'
        })
        return
      }
      const params = {
        name:this.name,
        real_sex:this.real_sex,
        tel_public:this.tel_public,
        telephone:this.telephone,
        position:this.position,
        birth_day:new Date(this.birth_day).Format("yyyy-MM-dd"),
        region:this.region,
        company_name:this.company_name
      }
      const res = await updateUserinfo(params)
      if (res) {
        this.$dialog.alert({message:'保存成功'})
        this.$router.replace('/meCenter')
      }
    },
    pickBrithday(){
      if (!this.disabled) {
        this.brithdayShow = true
      }
    },
    getBrithday(tmp,type){
      console.log(tmp)
      // if (!tmp) {
      //   this.brithdayShow = false
      //   return
      // }
      if (typeof tmp == 'string') {
        var value = new Date(tmp)
      }else{
        var value = tmp
      }
      const year = value.getFullYear()
      const month = +value.getMonth() + 1
      const day = value.getDate()
      if (!type) {
        this.brithdayShow = false
      }
      console.log(this.birth_day)
      return `${year}年${month}月${day}日`
    },
    getAddress(value){
      const province = value[0].name
      const city = value[1].name
      const area = value[2].name
      this.region = `${province} ${city} ${area}`
      this.addressShow = false
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
    }
  },
  components:{

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .btn_wrap{
    padding: .4rem .3rem;
    .save{
      padding: 0 50px;
      margin-right: .2rem;
    }
    .cancel{
      padding: 0 50px;
    }
  }
  .address{
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
  .brithday{
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
  .sex{
    padding: 10px 15px;
    font-size: 14px;
  }
  .van-radio{
    margin-bottom: 10px;
  }
  .dadio_group{
    padding: 0 15px;
  }
  .userinfo{
    background-color: #fff;
    padding-top: .4rem;
  }
  .header{
   position: relative;
   margin: 0 auto;
   width: 6.9rem;
   height: 3.4rem;
   border-radius: .15rem;
   box-shadow: 0px 0px 10px #ccc;
   padding: .3rem;
   .flex_wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
   }
   .left{
    .usernma{
      font-size: .38rem;
    }
    .company{
      color: #979797;
      font-size: .24rem;
      padding: .1rem 0;
    }
    .position{
      color: #979797;
      font-size: .24rem;
    }
   }
   .right{
      .head_wrap{
        width: 1.2rem;
        height: 1.2rem;
        overflow: hidden;
        border-radius: .6rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
   }
   .tel{
      position: absolute;
      left: .3rem;
      bottom: .3rem;
   }
  }
  .form_wrap{
  }
</style>
