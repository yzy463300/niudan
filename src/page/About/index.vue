<template>
  <div class="about">
    <p class="logo tc"><img src="../../assets/logo.png" height="49" width="370" alt=""></p>
    <div class="content" v-html='content'></div>
   
    <!-- <p class="cont"><strong>长沙市电子商务协会</strong>（英文全称：Changsha Electronic Commerce Association缩写CSECA）是由长沙市从事电子商务领域经营的部分企业提出申请，经长沙市民政局核准登记注册的地方性社团组织，接受长沙市商务局的业务指导和长沙市民间组织管理局的监督管理。协会于2009年11月正式成立。</p>
    <p class="title">协会的宗旨</p>
    <p class="cont">坚持党的基本路线，坚持科学发展观；遵守宪法、法律、法规和国家政策，遵守社会道德风尚；为政府服务，为社会服务，为会员服务，加强交流和合作，在政府和从事电子商务的企事业单位之间发挥桥梁、纽带作用，促进长沙市电子商务的健康发展。</p>
    <p class="title">协会的性质</p>
    <p class="cont">由长沙市范围内从事电子商务研究开发、应用等相关领域的企事业单位和个人自愿结合组成的地方性、行业性、非营利性社团组织。</p>
    <p class="title">协会的业务范围</p>
    <p class="cont">
      积极宣传贯彻国家有关的方针、政策、法规、条例；对政府制定有关电子商务的规划、政策、法规、标准提出意见和建议，并推动贯彻和实施；促进"行规行约"的建立和完善，提倡自律和公平竞争，维护会员的正当利益，反对侵害他人知识产权；向会员及有关部门提供电子商务发展情况、市场发展趋势、经济预测等信息，做好信息咨询服务和政策、技术、产业、市场导向工作；广泛开展电子商务学术交流，积极开展电子商务知识的普及教育和技能培训，总结电子商务发展过程中的经验和教训，介绍先进典型；经有关部门批准，加强国内外城市的合作与交流，组织国内外电子商务新产品、新技术展览、展销，为企业开拓国内外市场服务；促进城市间合作，共同推广发展电子商务新技术的应用，为跨城市发展电子商务牵线搭桥；承担有关部门和单位的电子商务业务和课题研讨，协助企业提高产品、服务质量，积极参加有关电子商务产品、认证及质量监督活动，全心全意为用户服务；开发信息资源，编辑出版电子商务书刊、声像资料；完成政府管理部门或会员交由协会办理的其他事项。协会热忱欢迎各行业的企、事业单位加入，共同为推进国民经济和社会信息化进程，发展电子商务事业做出贡献。
    </p> -->
    <div class="nav">
      <div class="item" v-for='(item,index) in navList' :class='[index == tabIndex ? "active" : ""]'  @click='onChange(index)'>{{item}}</div>
    </div>
  </div>
</template>

<script>
import { getAssocExtInfo1,getAssocExtInfo2,getAssocExtInfo3,getAssocExtInfo4 } from '@/service/getData.js'
export default {
  data () {
    return {
      tabIndex:0,
      navList:['协会简介','组织结构','协会章程','入会流程'],
      content:'',
    }
  },
  mounted(){
  },
  activated(){
    this.getContent()
  },
  methods:{
    onChange(index){
      this.tabIndex = index
      this.getContent()
    },
    async getContent(){
      if (this.tabIndex == 0) {
        var res = await getAssocExtInfo1()
      }
      if (this.tabIndex == 1) {
        var res = await getAssocExtInfo2()
      }
      if (this.tabIndex == 2) {
        var res = await getAssocExtInfo3()
      }
      if (this.tabIndex == 3) {
        var res = await getAssocExtInfo4()
      }
      this.content = res.data.content
    }
  },
  components:{

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  *{
    max-width: 100%;
  }
  .nav{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 1rem;
    background-color: #fff;
    .item{
      text-align: center;
      width: 25%;
      color: #3596fd;
    }
    .item.active{
      font-weight: bold;
    }
  }
  .about{
    background-color: #fff;
    padding: .4rem .3rem;
    padding-bottom: 1.4rem;
    font-size: .28rem;
    text-align: justify;
  }
  .title{
    font-weight: bold;
    margin-top: .3rem;
  }
  .cont{
    text-indent: 2em;
    margin-top: .2rem;
  } 
  .logo{
    padding-bottom:.4rem; 
    img{
      width: 3.7rem;
      height: .49rem;
    }
  }
</style>
