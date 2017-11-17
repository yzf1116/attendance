<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>

    <div class="content">
      <vContentTitle></vContentTitle>
      <transition name="move"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  import vHead from 'common/Header.vue';
  import vSidebar from 'common/Sidebar.vue';
  import vContentTitle from 'common/ContentTitle.vue'

  export default {
    components: {
      vHead, vSidebar, vContentTitle
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
