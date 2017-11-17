<template>
  <div class="sidebar" ref="sidebar">
    <el-menu :default-active="onRoutes" :style="'min-height: 2px'"   :theme="theme" unique-opened router>
      <div v-if="navType=='default'" >
        <div v-for="(item,index) in menuList">
          <div v-if="item.children.length>0">
            <el-submenu :index="item.id">
              <template slot="title">
                <icon :name="(item.menu_icon!='') ? item.menu_icon :'desktop'"></icon>
                <span class="box">{{item.menu_name}}</span>
              </template>
              <div v-for="child in item.children" :key="child.id">
                <el-menu-item :index="child.menu_url">{{child.menu_name}}</el-menu-item>
              </div>
            </el-submenu>
          </div>
          <div v-else>
            <el-menu-item :index="item.menu_url">
              <icon :name="(item.menu_icon!='') ? item.menu_icon :'desktop'"></icon>
              <span class="box"> {{item.menu_name}}</span>

            </el-menu-item>
          </div>
        </div>
      </div>
      <div v-else>
        <el-menu-item v-for="(item, index) in navMenuList" :key="index" :index="item.menu_url">{{item.menu_name}}</el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        menuList: [],

      }
    },
    created: function () {
      this.menuList = JSON.parse(this.$getStore("gMenuList")).public;

    },
    methods: {},
    computed: {
      theme(){
        return this.$store.getters.getTheme;
      },
      onRoutes() {
        return this.$route.path.replace('/', '');
      },
      navMenuList(){
        return this.$store.getters.getnavList;
      },
      navType(){
        return this.$store.getters.getNavType
      }


    }

  }
</script>

<style scoped>

  .sidebar {
    display: block;
    position: absolute;
    width: 190px;
    left: 0;
    top: 60px;
    bottom: 0;
    background: #ffffff;
    overflow-y: scroll;
  }

  .sidebar > ul {
    height: 100%;
  }

  .box {
    margin-left: 8px
  }

  .animationFrom {
    animation: slideFromLeft 1s 0s 1 both
  }

  @keyframes slideFromLeft {
    from {
      transform: translateX(-100%);
    }
  }

</style>
