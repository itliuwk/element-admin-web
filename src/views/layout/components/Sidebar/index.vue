<template>
  <div class="wrapper_left">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="$route.path" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :active-text-color="variables.menuActiveText" :collapse-transition="false"
        mode="vertical">
        <sidebar-item v-for="route in appRoutes || app_routes" :key="route.path" :item="route"
          :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div class="slider_bottom">
      <svg-icon @click.native="click_collapse" icon-class="right" style="cursor: pointer;width: 100%"
        v-if="isCollapse" />
      <svg-icon @click.native="click_collapse" style="cursor: pointer;width: 100%" icon-class="left"
        v-if="!isCollapse" />
    </div>
  </div>

</template>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

.wrapper_left {
  height: 100%;
  display: flex;
  flex-direction: column;

  .scrollbar-wrapper {
    flex: 1;
  }
}

.el-scrollbar {
  height: 100%;
}

.slider_bottom {
  height: 40px;
  background: $menuActiveText;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { GET_PERMISSIONS } from '@/api/permissions'

import { setCookie } from '@/utils/cookie.js'

export default {
  components: { SidebarItem },
  async mounted () {
    let permissions = await GET_PERMISSIONS().then(res => res);
    setCookie('permissions', JSON.stringify(permissions));
    if (permissions.admin) {  // 判断 权限 为 true
      let app_routers = this.app_routes.map(item => {
        item.hidden = false;
        return item
      });
      this.appRoutes = app_routers
    } else {
      let app_routers = this.app_routes.map(item => {
        item.hidden = true;
        if (permissions.permissions.includes(item.value)) {  //判断父  有没有权限
          item.hidden = false;
          if (item.children) {
            item.children = item.children.map(subItem => {
              subItem.hidden = true;
              if (permissions.permissions.includes(subItem.value)) {    //判断子  有没有权限
                subItem.hidden = false
              }
              return subItem;
            });
          }
        }
        return item
      });
      this.appRoutes = app_routers
    }
  },
  computed: {
    ...mapGetters(["app_routes", "sidebar"]),
    variables () {
      return variables;
    },
    isCollapse () {
      return !this.sidebar.opened;
    }
  },
  data () {
    return {
      appRoutes: [],
      permissions: {},
    }
  },
  methods: {
    ...mapActions({
      toggleSideBar: "toggleSideBar"
    }),
    click_collapse () {
      this.toggleSideBar();
    }
  }
};
</script>
