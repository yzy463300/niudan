<template>
  <div class="text bbox">
    <textarea id="textarea" v-model='text' :placeholder="placeholder" ></textarea>
    <p class="length">{{text.length}}/{{length}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text:'',
    }
  },
  props:['length','placeholder','value'],
  mounted(){
  },
  watch:{
    text(){
      this.$emit('input',this.text)
    }
  },
  activated(){},
  methods:{
  },
  components:{

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .text{
    position: relative;
    width: 100%;
    height: 100%;
    border:.02rem solid #D2D2D2;
    border-radius: .1rem;
    padding: .3rem;
    padding-bottom: .8rem;
    display: flex;
    flex-wrap: wrap;   
  }
  .length{
    position: absolute;
    right: .3rem;
    bottom: .1rem;
    height: .5rem;
    line-height: .5rem;
  }
 #textarea{
  width: 100%;
  height: 100%;
  display: block;
  border:none;
 }
</style>
