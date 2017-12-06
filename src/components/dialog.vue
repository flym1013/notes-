<template lang="html">
  <div class="dialog">
    <div class="dialogWarpper">
      <div class="dialogHeader">
        <span class="headerTitle">提示</span>
      </div>
      <div class="dialogContent">
                {{msg}}
      </div>
      <div class="dialogBtn">
        <button type="button" name="button" @click="cancelBtn" class="cancelBtn">取消</button>
        <button type="button" name="button" @click="sureBtn" class="sureBtn">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['msg'],
  methods: {
    cancelBtn () {
      this.$emit('cancel')
    },
    sureBtn () {
      this.$emit('sure')
    }
  }
}
</script>

<style lang="scss">
.dialog{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: rgba(0, 0, 0, .4);
  z-index:999;
        .dialogWarpper {
            position: absolute;
            left: 50%;
            top: 20%;
            width:100%;
            max-width: 400px;
            transform: translateX(-50%);
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
            box-sizing: border-box;
            animation: dialog .5s;
        }
        .dialogHeader {
            padding: 20px 20px 0;
        }
        .dialogContent {
          padding: 30px 20px;
          color: #475669;
          font-size: 18px;
          text-align: center;
          p{
              font-size: 14px;
              margin-top: 10px;
          }
      }
  .dialogBtn{
    padding: 10px 20px 15px;
            text-align: right;
            button {
                font-size: 14px;
            }
            .cancelBtn{
              width: 50px;
              background: #fff;
              border: 1px solid #c0ccda;
              color: #1f2d3d;
            }
            .sureBtn{
              width: 50px;
              margin-left: 5px;
              color: #fff;
              transition: background .3s ease-in;
            }
  }
}
@keyframes dialog {
      from{
          top: 15%;
      }
  }
</style>
