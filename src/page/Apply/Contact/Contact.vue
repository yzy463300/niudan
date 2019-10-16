<template>
  <div class="wrap">
    <h3>{{data.name}}</h3>
    <div class="list">
      <div class="item bbox">
        <div class="left">
          <div class="head">电话：</div>
          <div class="text">{{data.telephone}}</div>
        </div>
        <div class="right">
          <van-button plain size="mini" type="info" class="btn" @click='onTel(data.telephone)'>拨打电话</van-button>
        </div>
      </div>
      <div class="item bbox">
        <div class="left">
          <div class="head">传真：</div>
          <div class="text">{{data.fax}}</div>
        </div>
      </div>
      <div class="item bbox">
        <div class="left">
          <div class="head">邮箱：</div>
          <div class="text" id='email'>{{data.email}}</div>
        </div>
        <div class="right">
          <van-button plain size="mini" type="info" class="email_btn btn" :data-clipboard-text='data.email'>点击复制</van-button>
        </div>
      </div>
      <div class="item bbox">
        <div class="left">
          <div class="head">联系人：</div>
          <div class="text">{{data.linkman}}</div>
        </div>
      </div>
      <div class="item bbox">
        <div class="left">
          <div class="head">微信客服：</div>
          <div class="text">{{data.wx_account}}</div>
        </div>
        <div class="right">
          <van-button plain size="mini" type="info" class="btn wx_btn" :data-clipboard-text='data.wx_account'>点击复制</van-button>
        </div>
      </div>
      <div class="item bbox">
        <div class="left">
          <div class="head">地址：</div>
          <div class="text">{{data.address}}</div>
        </div>
      </div>
    </div>
    <div class="bottom_wrap">
      <div class="bottom bbox">
        <img :src="data.gh_qrcode" height="131" width="201" class="qrcode">
      </div>
      <p class="tip tc">长按二维码关注</p>
    </div>
    
  </div>
</template>

<script>
import { Toast } from 'vant';
import { getAssocInfo } from '@/service/getData.js'
export default {
  data () {
    return {
      data:{}
    }
  },
  mounted(){
    var clipboard = new ClipboardJS('.email_btn');
    var clipboard2 = new ClipboardJS('.wx_btn');

    clipboard.on('success', function(e) {
        Toast('已复制到粘贴板')
        e.clearSelection();
    });
    clipboard2.on('success', function(e) {
        Toast('已复制到粘贴板')
        e.clearSelection();
    });

  },
  async activated(){
    const res = await getAssocInfo()
    this.data = res.data
  },
  methods:{
    onTel(tel){
      location.href= `tel:${tel}`
    }
   
  },
  components:{

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .bottom_wrap{
    margin-top: .3rem;
    background-color: #fff;
    padding: .6rem 0;
  }
  .bottom{
    margin: .2rem auto;
    background-color: #fff;
    width: 2.4rem;
    height: 2.4rem;
    padding: .15rem;
    box-shadow: 0px 0px 10px #ccc;
    .qrcode{
      width: 100%;
      height: 100%;
    }

  }
  h3{
    padding: .4rem 0;
    background-color: #fff;
    text-align: center;
    font-weight: bold;
    margin-bottom: .3rem;
  }
  .item{
    height: .9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: .02rem solid #f6f6f6;
    padding: 0 .3rem;
    .btn{
      color: #3596FD;
    }
    .left{
      display: flex;
      align-items: center;
    }
    .head{
      width: 5em;
      text-align: justify;
      text-align-last: justify;
    }
    .text{

    }
  }
</style>
