<template>
  <div id="app">
    <n-header @tools="changePages"></n-header>
    <section class="container" :class="{'hide': table}">
      <n-add></n-add>
      <n-list></n-list>
      <n-sidebar
        :is-show="tools"
        @cleardialog="clearData"
        @opentable="table = true;tools = false"
      ></n-sidebar>
    </section>
    <transition name="dialog">
      <n-dialog v-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></n-dialog>
    </transition>
    <n-table @deldialog="delData" :is-show="table" @close="table = false"></n-table>
    <n-footer></n-footer>
  </div>
</template>

<script>
import nHeader from './components/header.vue'
import nAdd from './components/eventAdd.vue'
import nList from './components/eventsList.vue'
import nFooter from './components/footer.vue'
import nSidebar from './components/sidebar.vue'
import nDialog from './components/dialog.vue'
import nTable from './components/eventsTable.vue'
export default {
  data () {
    return {
      tools: false,
      dialog: false,
      table: false,
      tips: '',
      dialog_type: ''
    }
  },
  components: {
    nHeader, nAdd, nList, nFooter, nSidebar, nDialog, nTable
  },
  methods: {
    changePages () {
      if (this.table) {
        this.table = !this.table
      } else if (this.theme) {
        this.theme = !this.theme
      } else {
        this.tools = !this.tools
      }
    },
    clearData () {
      this.tools = false
      this.dialog = true
      this.dialog_type = 'clear'
      this.tips = '清空后无法恢复，确认清空吗？'
    },
    sureDialog () {
      this.$root.todoItem = []
      this.dialog = false
    },
    delData () {
      console.log(111)
    }
  }
}
</script>

<style lang='scss'>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
html,body,ul,li,input,p{
      margin:0;
      padding:0;
  }
  body{
      font-size: 16px;
      font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
  }
  input,button{
      -webkit-tap-highlight-color: transparent;
  }
  input[type=text]{
      -webkit-appearance: none;
  }
  button{
      padding:7px 0;
      outline: none;
      text-align: center;
      border-radius: 4px;
      box-sizing: border-box;
      font:{
          size:inherit;
          family: inherit;
      }
      cursor: pointer;
  }
  html,body{
      height: 100%;
  }
  ::-webkit-scrollbar{
      width: 0;
  }
  body,#app{
      width:100%;
      overflow-x: hidden;
  }
  #app{
      height: 100%;
      padding-bottom: 60px;
      box-sizing: border-box;
  }

  ul{
      list-style: none;
  }
  .container{
      width:100%;
      padding: 0 10px;
      max-width:800px;
      margin:auto;
      box-sizing: border-box;
      &.hide{
          display: none;
      }
  }
  .dialog-enter-active, .dialog-leave-active {
      transition: opacity .3s;
  }
  .dialog-enter, .dialog-leave-to{
      opacity: 0;
  }
</style>
