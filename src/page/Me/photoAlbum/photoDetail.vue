<template>
  <div class="photo_detail">
    <div class="top">
      <div class="left">
        <p class="title">{{name}}</p>
        <p class="time">{{new Date(+addtime*1000).Format('yyyy-MM-dd')}} <span>共{{imgList.length}}张</span></p>
      </div>
      <div class="right">
        <van-button size="small" type="info" @click="onEdit" v-if='imgList.length>0 && admin_type == 2'>{{btnText}}</van-button>
      </div>
    </div>
    <div class="list bbox">
      <van-row gutter="10" >
        <van-col span="8" v-for="(item,index) in imgList" :key='index' class="img_wrap" >
          <p class="img" :style='{backgroundImage:"url("+ item.content +")"}' @click='onPreView(index)'></p>
          <van-icon @click="onDelete(index)" v-show="isEdit" class="close" name="clear" size='2em' color="red"/>
        </van-col>
        <van-col span="8" class="img_wrap" v-if="admin_type == 2">
          <p class="img" >
            <van-uploader class='uploader' name="uploader" :after-read="onRead" :max-size='maxSize' @oversize='onOversize()'>
              <van-icon name="plus"  size='3em' color='#3596FD'/>
            </van-uploader>
          </p>
        </van-col>
      </van-row>
      <!-- <div class="no tc" v-else>还未上传图片</div> -->
    </div>
    <div class="add" @click='onSubmit()' v-show='submitShow && imgList.length > 0 && admin_type == 2'>
      提交
    </div>
    <van-image-preview
      v-model="preViewShow"
      :images="images"
    >
      <template v-slot:preViewIndex>第{ preViewIndex }页</template>
    </van-image-preview>
  </div>
</template>

<script>
import { osssign,createPhotoAlbum,updatePhotoAlbum,deletePhotoAlbum,photoSubmit,getPhotoAlbumDetail } from '@/service/getData.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      submitShow:true,
      preViewIndex:0,
      preViewShow:false,
      maxSize:1024 * 1024 * 3,
      isEdit:false,
      btnText:"编辑",
      time:'2019-4-29',
      num:15,
      imgList:[],
      create:0,
      name:'',
      album_id:0,
      addtime:'',
      admin_type:0,
    }
  },
  props:{
    data:{}
  },
  computed:{
    images(){
      let arr = []
      this.imgList.forEach((item,index)=>{
        arr.push(item.content)
      })
      return arr
    }
  },
  mounted(){},
  async activated(){
    this.imgList = []
    this.create = this.$route.query.create
    this.name = this.$route.query.name
    this.addtime = this.$route.query.startTime
    this.album_id = this.$route.query.album_id
    this.admin_type = this.$route.query.admin_type
    if (this.album_id) {
      const res = await getPhotoAlbumDetail({album_id:this.album_id})
      this.addtime = res.data.addtime
      this.num = res.data.num
      this.name = res.data.name
      res.data.photos.forEach((item,index)=>{
        var obj = {
          content:item,
          file:null
        }
        this.imgList.push(obj)
      })
    }
  },
  methods:{
    async onSubmit(){
      let uploaded = false
      let count = 0
      let nameArr = []
      if (this.imgList.length > 0) {
        for (var i = 0; i < this.imgList.length; i++) {
          if (this.imgList[i].file) {
            const res = await osssign()
            res.data.key_prefix = res.data.key_prefix + Date.now() + '.' + this.imgList[i]['file']['name'].split('.').splice(-1)
            this.imgList[i]['content'] = res.data.key_prefix
            nameArr.push(res.data.key_prefix) 
            Object.assign(res.data,{file:this.imgList[i]['file']})
            const data = await photoSubmit(res.data)
          }
        }
        if (this.album_id) {
          const arr = []
          for (var i = 0; i < this.imgList.length; i++) {
            if (!this.imgList[i].file) {
              arr.push(this.imgList[i]['content'])
            }
          }
          nameArr = nameArr.concat(arr)
          const res = await updatePhotoAlbum({
            album_id:this.album_id,
            name:this.name,
            photos:nameArr
          })
          if (res) {
            this.$dialog.alert({
              message: '相册更新成功'
            });
          }
        }else{
          console.log('sss')
          const albumData = await createPhotoAlbum({
            name:this.name,
            photos:nameArr,
            photo_time:this.addTime
          })
          this.album_id = albumData.data.album_id
          this.$dialog.alert({
            message: '相册创建成功'
          });
        }
      }
      else{
        Toast.fail('无图片上传')
      }
    },
    onPreView(index){
      if (!this.isEdit) {
        this.preViewShow = true
        this.preViewIndex = index
      }
    },
    onRead(file, detail) {
      this.imgList.push(file)
    },
    onOversize(){
      Toast.fail('图片大小不能超过3M')
    },
    onDelete(index){
      this.$dialog.confirm({
        title: '提示',
        message: '确认是否删除？'
      }).then(() => {
        console.log(index)
        this.imgList.splice(index,1)
      }).catch(() => {
        Toast.fail('删除失败,请重试')
        // on cancel
      });
      
    },
    onEdit(){
     this.isEdit = !this.isEdit
     if (this.isEdit == true) {
      this.btnText = '完成'
      this.submitShow = false
     }
     if (this.isEdit == false) {
      this.btnText = '编辑'
      this.submitShow = true
     }
    }
  },
  components:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  @base:#3596FD;
  .uploader{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img_wrap{
    position: relative;
  }
  .close{
    position: absolute;
    right: -.1rem;
    top: -.3rem;
  }
  .add{
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
  .photo_detail{
    padding: .3rem;
    background-color: #fff;
    padding-bottom: .98rem;

  }
  .list{
    .img{
      margin-bottom: 10px;
      width: 2.16rem;
      height: 2.16rem;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      border: .02rem solid #979797;
    }
    .no{
      color: #979797;
      font-size: .36rem;
      padding: .5rem 0;
    }
  }
 .top{
  padding-top: .3rem;
  margin-bottom: .4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .left{
    .title{
      font-size: .38rem;
      font-weight: bold;
    }
    .time{
      padding-top: .2rem;
      color: #979797;
      font-size: .28rem;
    }
  }
  .right{

  }
 }
</style>
