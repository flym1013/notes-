<template lang="html">
  <div class="event-tools" :class="{'show-event-tools':isShow}">
    <ul class="tools-sidebar">
      <li>
        <button type="button" name="button" class="tools-btn" @click="openThem">切换主题</button>
      </li>
      <li>
        <button type="button" name="button" class="tools-btn" @click="export2Excel">下载数据</button>
        <!-- <input type="file" ref="file" name="name" value="" @click='getfile'> -->
      </li>
      <!-- <li>
        <button type="button" name="button" class="tools-btn" @click="uploadData">导入数据</button>
      </li> -->
      <li>
        <button type="button" name="button" class="tools-btn" @click="openTable">编辑数据</button>
      </li>
      <li>
        <button type="button" name="button" class="tools-btn" @click="showDialog">清空数据</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgFile: null,
      jsonData: [],
      list: []
    }
  },
  created () {
    // this.getfile()
    this.list = this.$root.todoItem // 定义中间变量
  },
  props: ['isShow'],
  methods: {
    // getfile () {  //上传文件并获取到
    //   this.$refs.file.onchange = () => {
    //     this.imgFile = this.$refs.file.files[0]
    //     let fr = new FileReader()
    //     // fr.onload = function () {
    //     //   document.getElementById('image').getElementsByTagName('img')[0].src = fr.result
    //     // }
    //     fr.readAsDataURL(this.imgFile)
    //     console.log(this.imgFile)
    //   }
    // },
    showDialog () {
      this.$emit('cleardialog')
    },
    openTable () {
      this.$emit('opentable')
    },
    uploadData () {},
    // downloadData (fileName, content) {  //下载数据
    //   let aTag = document.createElement('a')
    //   // let blob = new Blob([content])
    //   aTag.download = fileName
    //   aTag.href = URL.createObjectURL(content)
    //   aTag.click()
    //   URL.revokeObjectURL(content)
    // },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    export2Excel () {
      this.list = Object.assign([], this.list)
      this.list = this.list.map((item, index) => {
        const statusMap = {
          0: '未完成',
          1: '已完成',
          2: '已取消'
        }
        item.num = statusMap[Number(item.num)]
        item.index = index + 1
        return item
      })
      require.ensure([], () => {
        const { export_json_to_excel } = require('../vendor/Export2Excel.js')
        const tHeader = [ '#', '类型', '时间', '所有事项' ]
        const filterVal = [ 'index', 'num', 'time', 'value' ]
        const list = this.list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, 'notes')
      })
    },
    downloadData () {
      this.export2Excel()
    },
    openThem () {
    }
  }
}
</script>

<style lang="scss">
.event-tools{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 230px;
  padding: 100px 20px 30px;
  box-sizing: border-box;
  transform: translateX(-250px);
  transition: transform .3s;
  text-align: center;
  background: rgba(0,0,0,.5);
  font-size: 16px;
  z-index:9;
  &.show-event-tools{
      transform: translateX(0);
  }
  .tools-sidebar{
      & > li{
          line-height: 60px;
        }
   }
   .tools-btn{
          width:100px;
          height:40px;
          line-height: 26px;
          color: #fff;
          transition: background .3s ease-in;
      }
}
</style>
