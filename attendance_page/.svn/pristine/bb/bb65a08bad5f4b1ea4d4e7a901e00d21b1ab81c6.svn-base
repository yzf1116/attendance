<template>
  <div class="header">
    <div class="logo">
      <!--<img width="400" src="../../assets/img/login.png">-->
    </div>
    <div class="logo-menu">
      <div v-if="navType=='default'">
        <!--<el-menu theme="dark" :default-active="onRoutes" class="el-menu-demo" mode="horizontal" unique-opened-->
        <!--router>-->
        <!--<el-menu-item v-for="(item,index) in menuList.link" :index="item.menu_url" :key="index">{{item.menu_name}}-->
  
        <!--</el-menu-item>-->
        <!--</el-menu>-->
      </div>
      <div  v-else style="overflow: auto; zoom: 1;">
        <ul class="navClass">
          <li  v-for="(item,index) in menuList.public" :key="index" :class="[item.menu_url===active?'navClassli active':'navClassli']" @click="navClick(item.menu_url)">
            {{item.menu_name}}
  
          </li>
        </ul>
      </div>
      <div class="line"></div>
    </div>
    <div class="user-info">
      <div>
        <span>{{time}}</span>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <img class="user-logo" src="../../assets/img/img.jpg"> {{username}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">
              <icon class="lgout" name="power-off"></icon>
              <span>注销</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div v-clickoutside="handleClose">
      <div style="" class="themeClass">
        <div @click="changNavShow">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </div>
        <transition name="bling-in">
          <div v-show="navShow" class="main">
            <div class="arrow-up">
              <!--向上的三角-->
            </div>
            <div class="contentTheme">
              <div class="themeTitle">
                <h3>
                  <i class="el-icon-setting">主题设置</i>
                </h3>
              </div>
              <div style="font-size: 12px;padding: 10px"> 你可以从这里选择和预览主题的布局和样式</div>
              <div style="text-align: center;padding: 10px;background:rgba(190, 157, 151, 0.17)">导航选择</div>
              <div style="padding: 10px; border-bottom: 1px solid #e7eaec;">
                <span style="padding-left: 10px;">导航一</span>
                <el-switch v-model="switchType" on-color="#13ce66" off-color="#ff4949" on-text="" off-text="" style="float: right" on-value="default" off-value="other" @change="navChange">
                </el-switch>
              </div>
              <div style="padding: 10px; border-bottom: 1px solid #e7eaec;">
                <span style="padding: 10px;">导航二</span>
                <el-switch v-model="switchType" on-color="#13ce66" off-color="#ff4949" on-text="" off-text="" style="float: right" on-value="other" off-value="default" @change="navChange">
                </el-switch>
              </div>
              <div style="text-align: center;padding: 10px;background:rgba(190, 157, 151, 0.17)">皮肤选择</div>
              <div style="color: rgba(255, 255, 255, 0.85)">
                <span class="colorChoose" style="display:block;background-color: rgb(50, 65, 87);text-align: center;padding: 10px;cursor: pointer " @click="themeHandleCommand('default')">默认</span>
                <span class="colorChoose" style="display:block;background-color: #ff4949;text-align: center;padding: 10px;cursor: pointer" @click="themeHandleCommand('red')">红色</span>
                <span class="colorChoose" style="display:block;background-color: #408080;text-align: center;padding: 10px;cursor: pointer" @click="themeHandleCommand('purple')">墨绿</span>
              </div>
            </div>
  
          </div>
        </transition>
      </div>
    </div>
  
  </div>
</template>
<script>
import Icon from "../../../node_modules/vue-awesome/components/Icon";
import { toggleClass } from 'assets/js/commonManage.js';
export default {
  components: { Icon }, data() {
    return {
      switchType: 'default',
      active: '',
      menuList: [],
      name: 'linxin',
      time: ''
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    },
    username() {
      let username = localStorage.getItem('username');
      return username ? username : this.name;
    },
    navType() {
      return this.$store.getters.getNavType
    },
    navShow() {
      return this.$store.getters.getNavShow;
    }
  },
  created: function () {
    //            var _self = this;
    this.menuList = JSON.parse(this.$getStore("gMenuList"));


  },
  methods: {
    handleClose: function () {
      this.$store.dispatch('setNavShow', false)
    },

    navChange(value) {
      this.$store.dispatch('setNavTye', value)
    },
    /**
     * 主题切换
     * @param command
     */
    themeHandleCommand(command) {
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
        case 'purple':
          toggleClass(document.body, 'purple-theme')
          this.$store.dispatch('changeTheme', '')

          break

      }
    },
    changNavShow() {
      if (this.$store.getters.getNavShow) {
        this.$store.dispatch('setNavShow', false)
      } else {
        this.$store.dispatch('setNavShow', true)
      }
    },
    navClick(url) {
      console.log(url)
      this.active=url;
      this.$store.dispatch('changeNav', url)
    },


    /**
     * 用户注销
     * @param command
     */
    handleCommand(command) {
      if (command == 'loginout') {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = "islogin=true; expires=" + date.toGMTString();
        //                    localStorage.removeItem('ms_username')
        window.localStorage.clear();
        this.$router.push('/login');
      }
    }
  }
}

</script>
<style scoped>
/*箭头向上*/

.themeClass {
  float: right;
  cursor: pointer;
  padding: 0 20px;
  font-size: 12px
}

.themeClass .el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.themeClass .el-dropdown-menu .el-dropdown-item {
  color: #fff;
}

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  line-height: 60px;
  color: #fff;
}



.header .logo {
  float: left;
  text-align: center;
}

.logo-menu {
  float: left;
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-menu__item {
  text-align: center;
}

.logo-menu .el-menu--dark {
  background-color: #242f42;
}

.el-menu--horizontal>.el-menu-item:hover {
  border-bottom: 5px solid #c1d2de;
}

.el-menu-item.is-active {
  color: #20a0ff;
  background-color: #324157;
  border-bottom: 5px solid #20a0ff;
}



/* Export Animations */

.logo>img {
  animation: rotateInDownRight 1s 0s 1 both
}



/* export keyframes  */

@keyframes rotateInDownRight {
  from {
    transform-origin: right bottom;
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }

  to {
    transform-origin: right bottom;
    transform: none;
    opacity: 1;
  }
}

.lgout {
  color: rgba(212, 17, 17, 0.71);
  padding: 0 10px;
  -moz-transform: scale(1.1, 1.1);
  -webkit-transform: scale(1.1, 1.1);
  -o-transform: scale(1.1, 1.1);
}

.navClass {
  font-size: 14px;
  height: 60px;
  line-height: 55px;
  float: right;
  background: transparent;
  padding: 0;
  margin: 0;  
  margin-left: 200px;
}
.active{
   border-bottom: 5px solid #5191FD;
  color: #5191FD !important;
}

.navClassli {
  text-align: center;
  color: rgb(191, 203, 217);
  margin: 0;
  float: left;
  width: 80px;
  list-style: none;
  position: relative;
  cursor: pointer;
}

.navClassli:hover {
  border-bottom: 5px solid #5191FD;
}

.colorChoose:hover {
  /*background-color: #5F9EDF !important;*/
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
  zoom: 1.05;
}

.main {
  line-height: normal;
  color: #000000;
  position: absolute;
  right: 0;
  top: 50px;
  width: 230px;
  z-index: 100;
}

.arrow-up {
  position: relative;
  width: 0;
  height: 0;
  margin-left: 20px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
  z-index: 105;
}

.contentTheme {
  position: relative;
  background: #fff;
  -moz-box-shadow: -1px 1px 20px rgba(31, 45, 61, 0.65);
  -webkit-box-shadow: -1px 1px 20px rgba(31, 45, 61, 0.65);
  box-shadow: -1px 1px 20px rgba(31, 45, 61, 0.65);
  z-index: 100;
}

.themeTitle {
  border-bottom: 1px solid #e7eaec;
  color: #676a6c;
  padding: 10px;
}

.fadeInRight {
  animation: fadeInRight 0.2s 0s 1 both
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

.fadeOutLeft {
  animation: fadeOutLeft 1s 0s 1 both
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

.boingInUp {
  animation: boingInUp 0.7s 0s 1 both;
}

.bling-in-enter-active {
  animation: boingInUp 0.7s 0s 1 both;
}

.bling-in-leave-active {
  animation: spaceOutDown 1s 0s 1 both
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
