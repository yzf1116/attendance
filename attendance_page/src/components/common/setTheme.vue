<template>
  <transition name="bling-in">
    <div v-show="navShow" class="main" v-clickoutside="handleClose">
      <div class="themeTitle">
        <h3><i class="el-icon-setting">主题设置</i></h3>
      </div>
      <div style="font-size: 12px;padding: 10px"> 你可以从这里选择和预览主题的布局和样式</div>
      <div style="text-align: center;padding: 10px;background:rgba(190, 157, 151, 0.17)">导航选择</div>
      <div style="padding: 10px; border-bottom: 1px solid #e7eaec;">
        <span style="padding-left: 10px;">导航一</span>
        <el-switch
          v-model="navType"
          on-color="#13ce66"
          off-color="#ff4949"
          on-text=""
          off-text="" style="float: right"
          on-value="default"
          off-value="other"
          @change="navChange">
        </el-switch>
      </div>
      <div style="padding: 10px; border-bottom: 1px solid #e7eaec;">
        <span style="padding: 10px;">导航二</span>
        <el-switch
          v-model="navType"
          on-color="#13ce66"
          off-color="#ff4949"
          on-text=""
          off-text="" style="float: right"
          on-value="other"
          off-value="default"
          @change="navChange">
        </el-switch>
      </div>
      <div style="text-align: center;padding: 10px;background:rgba(190, 157, 151, 0.17)">皮肤选择</div>
      <div style="color: rgba(255, 255, 255, 0.85)">
      <span style="display:block;background-color: rgb(50, 65, 87);text-align: center;padding: 10px;cursor: pointer "
            @click="themeHandleCommand('default')">默认</span>
        <span style="display:block;background-color: #ff4949;text-align: center;padding: 10px;cursor: pointer"
              @click="themeHandleCommand('red')">红色</span>
        <span style="display:block;background-color: #408080;text-align: center;padding: 10px;cursor: pointer"
              @click="themeHandleCommand('purple')">墨绿</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import {toggleClass} from 'assets/js/commonManage.js';
  export default {
    data() {
      return {}
    },
    methods: {
      handleClose:function () {
        this.$store.dispatch('setNavShow', false)
      },

      navChange(value){
        this.$store.dispatch('setNavTye', value)
      },
      /**
       * 主题切换
       * @param command
       */
      themeHandleCommand(command){
        switch (command) {
          case 'default':
            toggleClass(document.body, 'default-theme')
            this.$store.dispatch('changeTheme', 'dark')
            console.log(this)
            break;
          case 'red':
            toggleClass(document.body, 'red-theme')
            this.$store.dispatch('changeTheme', '')
            break;
          case  'purple':
            toggleClass(document.body, 'purple-theme')
            this.$store.dispatch('changeTheme', '')

            break

        }
      },
    },
    components: {},
    created() {

    },
    mounted() {

    },
    updated() {
    },
    computed: {
      navType(){
        return this.$store.getters.getNavType
      },
      navShow(){
        return this.$store.getters.getNavShow;
      }
    }
  }
</script>

<!-- 添加 "scoped " css作用域只作用于本文件，不作用全局-->
<style scoped>
  .main {

    position: absolute;
    right: 0;
    top: 60px;
    width: 230px;
    background: #fff;
    z-index: 100;
    -moz-box-shadow: -1px 1px 20px rgba(31, 45, 61, 0.65);
    -webkit-box-shadow: -1px 1px 20px rgba(31, 45, 61, 0.65);
    box-shadow: -1px 1px 20px rgba(31, 45, 61, 0.65);
  }

  .themeTitle {
    border-bottom: 1px solid #e7eaec;
    color: #676a6c;
    padding: 10px;
  }

  .fadeInRight{
    animation:fadeInRight 0.2s 0s 1 both
  }
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeOutLeft{
    animation:fadeOutLeft 1s 0s 1 both
  }
  @keyframes fadeOutLeft {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
  }
  .boingInUp{
    animation:boingInUp 0.7s 0s 1 both;
  }

  .bling-in-enter-active {
    animation:boingInUp 0.7s 0s 1 both;
  }
  .bling-in-leave-active {
    animation:spaceOutDown 1s 0s 1 both
  }
  @keyframes boingInUp {
    0% {
      opacity: 0;
      transform-origin: 50% 0%;
      transform: perspective(800px) rotateX(-90deg);
    }

    50% {
      opacity: 1;
      transform-origin: 50% 0%;
      transform: perspective(800px) rotateX(50deg);
    }

    100% {
      opacity: 1;
      transform-origin: 50% 0%;
      transform: perspective(800px) rotateX(0deg);
    }
  }

  @keyframes boingOutDown {
    0% {
      opacity: 1;
      transform-origin: 100% 100%;
      transform: perspective(800px) rotateX(0deg) rotateY(0deg);
    }

    20% {
      opacity: 1;
      transform-origin: 100% 100%;
      transform: perspective(800px) rotateX(0deg) rotateY(10deg);
    }

    30% {
      opacity: 1;
      transform-origin: 0% 100%;
      transform: perspective(800px) rotateX(0deg) rotateY(0deg);
    }

    40% {
      opacity: 1;
      transform-origin: 0% 100%;
      transform: perspective(800px) rotateX(10deg) rotateY(10deg);
    }

    100% {
      opacity: 0;
      transform-origin: 100% 100%;
      transform: perspective(800px) rotateX(90deg) rotateY(0deg);
    }
  }
  @keyframes spaceOutDown {
    0% {
      opacity: 1;
      transform-origin: 50% 100%;
      transform: scale(1) translate(0%, 0%);
    }

    100% {
      opacity: 0;
      transform-origin: 50% 100%;
      transform: scale(.2) translate(0%, 200%);
    }
  }



</style>
