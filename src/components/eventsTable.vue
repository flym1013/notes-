<template lang="html">
  <section class="event-all" :class="{'event-all-show':isShow}">
    <div class="table-box">
      <div class="edit-input" :class="{'edit-input-show': is_edit}">
                <input type="text" v-model="info.value" ref="content" @keyup.enter="editData">
                <button @click="editData">确定</button>
      </div>
      <div class="screen-box">
        <div class="div-select">
          <div class="div-value">
            <select class="" name="" v-model="selectIndex" @change="select">
              <option :value="null">全部</option>
              <option :value="0">未完成</option>
              <option :value="1">已完成</option>
              <option :value="2">已取消</option>
            </select>
        </div>
        </div>
        <input type="text" class="div-search" v-model="screen_title" placeholder="筛选关键词" @change="search">
      </div>
      <table class="event-table">
        <thead>
            <tr>
                <th>#</th>
                <th>所有事项</th>
                <th width="">类型</th>
                <th width="">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in arr">
                <td align="center">{{index + 1}}</td>
                <td>{{item.value}}</td>
                <td align="center">{{item.num | statusFilter}}</td>
                <td align="center" style="font-size: 0;"><button @click="showInput(item)">编辑</button>
                <button class="del-btn" @click="showDialog(item)">删除</button></td>
            </tr>
        </tbody>
    </table>
    </div>
    <transition name="dialog">
      <n-dialog v-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog" v-model="delInfo"></n-dialog>
    </transition>
  </section>
</template>

<script>
import nDialog from './dialog.vue'
export default {
  data () {
    return {
      info: {},
      delInfo: {},
      is_edit: false,
      dialog: false,
      tips: '',
      screen_title: '',
      arr: [],
      selectIndex: null
    }
  },
  components: {
    nDialog
  },
  props: ['isShow'],
  computed: {
  },
  watch: {
    'screen_title' () {
      this.search()
    }
  },
  created () {
    this.arr = this.$root.todoItem // 定义中间变量
  },
  methods: {
    showInput (item) {
      this.is_edit = true
      this.info = item
    },
    editData () {
      this.is_edit = false
    },
    showDialog (item) {
      this.dialog = true
      this.delInfo = item
      this.tips = '删除后无法恢复，确认清空吗？'
    },
    sureDialog () {
      this.$root.todoItem.splice(this.$root.todoItem.indexOf(this.delInfo), 1) // 查到该对象的index，并删除它
      localStorage.setItem('todoItem', JSON.stringify(this.$root.todoItem)) // 删除之后，再次存储到本地
      this.dialog = false
    },
    select () {
      this.query()
    },
    search () {
      this.query()
    },
    query () {
      if (this.selectIndex || this.selectIndex === 0) {
        this.arr = this.$root.todoItem.filter((item) => item.num === this.selectIndex) // 精确查询
      } else {
        this.arr = this.$root.todoItem
      }
      if (this.screen_title) this.arr = this.$root.todoItem.filter((item) => item.value.indexOf(this.screen_title) > -1) // 模糊查询
    }
  }
}
</script>

<style lang="scss">
.event-all{
        position: absolute;
        left:0px;
        top:70px;
        right:0;
        bottom:0;
        transform: translateX(-100%);
        transition: transform .5s;
        overflow-Y: scroll;
        background: #fff;
        &.event-all-show{
            transform: translateX(0);
            transition: transform .5s;
        }
        &::-webkit-scrollbar{
            width:0;
        }
        .table-box{
            width:100%;
            max-width:1000px;
            margin: 20px auto 70px;
            .event-table{
                width:100%;
                padding:0;
                border:{
                    left:1px solid #eee;
                    top:1px solid #eee;
                }
                border-spacing: 0px;
                td,th{
                    position: relative;
                    height: 40px;
                    min-width: 0;
                    padding:5px 10px;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    border:{
                        right:1px solid #eee;
                        bottom:1px solid #eee;
                    }
                }
                button{
                    padding:3px 7px;
                    font-size: 12px;
                    color: #fff;
                    border:0;
                    margin: 0 3px 3px 0;
                    &.del-btn{
                        background: #f57067 !important;
                    }
                }
            }
            .edit-input{
                position: fixed;
                top:0;
                width:100%;
                max-width: 1000px;
                margin:auto;
                height:60px;
                padding:10px 100px 10px 10px;
                box-sizing: border-box;
                z-index:10;
                transform: translateY(-260px);
                transition: transform .3s;
                background: #f3f3f3;
                border:1px solid #eee;
                border-radius:4px;
                &.edit-input-show{
                    transform: translateY(0);
                }
                input{
                    float: left;
                    width:100%;
                    height:40px;
                    padding:5px 10px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                }
                button{
                    position: absolute;
                    right: 10px;
                    width:80px;
                    height:40px;
                    color: #fff;
                    border:0;
                }
            }
            .screen-box{
                position: relative;
                padding: 0 0 10px 95px;
                height:35px;
                .div-select{
                    position: absolute;
                    left:0;
                    top:0;
                    width:85px;
                    height:35px;
                    padding:0 10px;
                    box-sizing: border-box;
                    border:1px solid #eee;
                    font-size:12px;
                    color: #999;
                    cursor: pointer;
                    &:after{
                        position: absolute;
                        right:6px;
                        top:12px;
                        width:6px;
                        height:6px;
                        content: '';
                        border:{
                            right:1px solid #999;
                            bottom: 1px solid #999;
                        }
                        transform: rotate(45deg);
                    }
                    &.active{
                        .div-select-body{
                            height:122px;
                            border:1px solid #eee;
                            box-shadow: 0 0 1px #ddd;
                        }
                    }
                }
                .div-value{
                    line-height: 35px;

                }
                .div-select-body{
                    position: absolute;
                    left:0;
                    top:38px;
                    width:85px;
                    height:0;
                    padding-left: 10px;
                    line-height: 30px;
                    box-sizing: border-box;
                    overflow: hidden;
                    z-index:10;
                    box-shadow: none;
                    border: none;
                    border-radius: 3px;
                    background: #fff;
                    transition: all .3s;
                }
                .div-search{
                    width:100%;
                    height:35px;
                    line-height: 25px;
                    padding:5px 10px;
                    box-sizing: border-box;
                    border:1px solid #eee;
                    font:{
                        size:12px;
                        family: Arial,'Microsoft YaHei';
                    }
                    color: #999;
                }
            }
        }
    }
</style>
