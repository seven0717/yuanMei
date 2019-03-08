<template>
  <div>
    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item v-for="item in tabArr" :key="item.id" :icon="item.icon" :to="item.rou_te" @click="changes(item.rou_te)">{{ item.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState,mapMutations } from 'vuex';
  import {Tabbar, TabbarItem} from 'vant';
  Vue.use(Tabbar).use(TabbarItem);

  export default {
    name: "index",
    data() {
      return {
        active: 0,
        //导航
        tabArr: [
          {id: 0, name: '首页', icon: 'home-o', rou_te: '/'},
          {id: 1, name: '推荐', icon: 'search', rou_te: '/kol'},
          {id: 2, name: '医生', icon: 'friends-o', rou_te: '/doctor'},
          {id: 3, name: '我的', icon: 'setting-o', rou_te: '/my'},
        ]
      }
    },
    computed:{
      ...mapState(['tabs'])
    },
    methods: {
      ...mapMutations(['TABS']),

      // tabbar路由跳转
      changes(index) {
        this.$router.push(index);
        this.$store.commit('TABS',index);
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/common.styl";
  .tabs {
    z-index 999;
  }
</style>
