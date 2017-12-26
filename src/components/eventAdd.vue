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
      let obj = {}
      obj.value = this.content
      obj.num = 0
      obj.numValue = '未完成'
      obj.index = 1
      obj.time = formateTime()
      this.$root.todoItem.push(obj)
      localStorage.setItem('todoItem', JSON.stringify(this.$root.todoItem))
      this.content = ''
    }
  }
}
</script>

<style lang="scss">
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
