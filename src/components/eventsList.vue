<template lang="html">
  <div class="eventContent">
    <div class="event-tab" @click="changeCollapse(0,$event)">未完成
        <span :class="{'close-span': !collapse[0].show}"></span>
    </div>
    <div class="event-box" :style="{'height':'auto','display':'block'}">
      <ul>
          <li class="event-list" v-for="item in $root.todoItem" v-if="!item.num">
              <input type="checkbox" @click="moveTodone(item)">
                <div>{{item.value}}</div>
                <button class="cancel-btn" @click="cancel(item)">取消</button>
         </li>
      </ul>
    </div>
    <div class="event-tab" @click="changeCollapse(1,$event)">已完成
        <span :class="{'close-span': !collapse[1].show}"></span>
    </div>
    <div class="event-box" :style="{'height':'auto','display':'block'}">
      <ul>
          <li class="event-list" v-for="item in $root.todoItem" v-if="item.num===1">
              <input type="checkbox" @click="moveTodo(item)" checked>
                <div>{{item.value}}</div>
                <span class="event-time">{{item.time}}</span>
         </li>
      </ul>
    </div>
    <div class="event-tab" @click="changeCollapse(2,$event)">已取消
        <span :class="{'close-span': !collapse[2].show}"></span>
    </div>
    <div class="event-box" :style="{'height':'auto','display':'block'}">
      <ul>
          <li class="event-list" v-for="item in $root.todoItem" v-if="item.num===2">
              <input type="checkbox">
                <div class="event-delete">{{item.value}}</div>
                <button class="cancel-btn" @click="review(item)">恢复</button>
         </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      collapse: [
        {
          show: true
        },
        {
          show: true
        },
        {
          show: true
        }
      ],
      todoItem: []
    }
  },
  computed: {
  },
  methods: {
    moveTodone (item) {
      item.num = 1
      localStorage.setItem('todoItem', JSON.stringify(this.$root.todoItem))
    },
    moveTodo (item) {
      item.num = 0
      localStorage.setItem('todoItem', JSON.stringify(this.$root.todoItem))
    },
    changeCollapse (num, event) {
      this.todoItem = this.$root.todoItem
      const show = this.collapse[num].show
      if (show) {
        this.closeCollapse(event)
      } else {
        this.openCollapse(event)
      }
      this.collapse[num].show = !show
    },
    closeCollapse (event) { // 关闭折叠面板
      let ulElement = event.currentTarget.nextElementSibling
      let children = ulElement.getElementsByTagName('ul')[0]
      ulElement.style.height = children.offsetHeight + 'px'
      setTimeout(function () {
        ulElement.style.height = '0px'
        setTimeout(function () {
          ulElement.style.display = 'none'
        }, 300)
      }, 10)
    },
    openCollapse (event) { // 打开折叠面板
      let ulElement = event.currentTarget.nextElementSibling
      let children = ulElement.getElementsByTagName('ul')[0]
      ulElement.style.display = 'block'
      ulElement.style.height = children.offsetHeight + 'px'
      setTimeout(function () {
        ulElement.style.height = 'auto'
      }, 300)
    },
    cancel (item) {
      item.num = 2
      localStorage.setItem('todoItem', JSON.stringify(this.$root.todoItem))
    },
    review (item) {
      item.num = 0
      localStorage.setItem('todoItem', JSON.stringify(this.$root.todoItem))
    }
  }
}
</script>

<style lang="scss">
.eventContent {
        .event-tab {
            position: relative;
            height: 44px;
            line-height: 44px;
            padding-left: 20px;
            border-bottom: 1px solid green;
            box-sizing: border-box;
            background-color: green;
            cursor: pointer;
            span {
                position: absolute;
                right: 20px;
                top: 15px;
                width: 10px;
                height: 10px;
                content: '';
                border: {
                    top: 2px solid #fff;
                    right: 2px solid #fff;
                }
                transform: rotate(135deg);
                transition: transform .3s;
                &.close-span {
                    transform: rotate(45deg);
                }
            }
        }
        .event-box {
            list-style: none;
            overflow: hidden;
            border: {
                left: 1px solid #eee;
                right: 1px solid #eee;
            }
            transition: height .3s;
            .event-list {
                position: relative;
                min-height: 44px;
                line-height: 25px;
                padding: 10px 100px 10px 50px;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
                color: #373e40;
                input[type=checkbox] {
                    position: absolute;
                    left: 15px;
                    top: 12px;
                    width: 20px;
                    height: 20px;
                }
                .cancel-btn {
                    position: absolute;
                    right: 10px;
                    top: 7px;
                    width: 50px;
                    height: 30px;
                    line-height: 30px;
                    padding: 0;
                    background: #fff;
                    border: 1px solid #c0ccda;
                    color: #666;
                    font-size: 12px;
                }
                .event-time {
                    position: absolute;
                    right: 10px;
                    top: 0;
                    line-height: 44px;
                    font-size: 12px;
                    color: #aaa;
                }
                .event-delete {
                    text-decoration: line-through;
                    color: #999;
                }
            }
        }
    }
</style>
