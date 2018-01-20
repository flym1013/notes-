<template lang="html">
  <div class="event-add">
        <input type="text" class="n-input" v-model="content" placeholder="待办事项" @keyup.enter="submit">
        <button class="add-btn" @click="submit">提交</button>
    </div>
</template>

<script>
import { formateTime } from '../utils'
export default {
  data () {
    return {
      content: '',
      todoItem: []
    }
  },
  methods: {
    submit () {
      if (!this.content) return
      let obj = {} // 定义一个对象
      obj.value = this.content // 事件内容
      obj.num = 0 // 事件类型 0：未完成； 1：已完成； 2：已取消   添加事件件初始类型为0
      obj.numValue = '未完成' // 事件类型的值
      obj.index = 1 // 事件的索引值
      obj.time = formateTime()  // 事件完成的时间
      this.$root.todoItem.push(obj) // 将存有事件的对象存放到Vue的全局变量todoItem中
      localStorage.setItem('todoItem', JSON.stringify(this.$root.todoItem)) // 将所存放的事件本地保存
      this.content = '' // 清空输入框
    }
  }
}
</script>

<style lang="scss" scoped>
.event-add{
        position: relative;
        padding:30px 90px 30px 0;
        font-size: 16px;
        top: 60px;
        .n-input{
            width:100%;
            height:40px;
            padding:7px 10px;
            line-height: 26px;
            border:1px solid #c0ccda;
            border-radius:4px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            box-sizing: border-box;
            font-size:inherit;
            &:focus {
                outline: none;
            }
        }
        .add-btn{
            position: absolute;
            right:0;
            top:30px;
            width:80px;
            height:40px;
            line-height: 26px;
            color: green;
            /*transition: background .3s ease-in;*/
        }
    }
</style>
