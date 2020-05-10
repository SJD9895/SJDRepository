<template>
  <el-container>
    <!--顶部 style="border-bottom: 1px solid gray;"-->
    <el-header class="el_header_tow">
      <el-row style="margin: 10px 15px">
        <el-col :span="1">
          <!--收缩条-->
          <a href="#" @click="changeCollapse" style="font-size: 25px;color:#909399;"><i
            :class="collpaseIcon"></i></a>
        </el-col>
      </el-row>
    </el-header>
    <!--中央区域-->
    <el-main>
      <el-container>
        <!--左侧导航栏-->
        <el-aside :style="{width:collpaseWidth}">
          <!--default-active代表导航栏默认选中哪个index, :collapse决定导航栏是否展开，为boolean类型
          :router决定导航栏是否开启路由模式，即在菜单item上设置路由是否生效，值为boolean类型-->
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :router="true"
          >

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-upload"></i>
                <span>房间管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home_index/addfang">添加房间</el-menu-item>
                <el-menu-item index="/home_index/fanglist">房间列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>书籍管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home_index/addbook">添加书籍</el-menu-item>
                <el-menu-item index="/home_index/booklist">书籍列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- 住宿管理 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-school"></i>
                <span>住宿管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home_index/addhouse">添加住宿</el-menu-item>
                <el-menu-item index="/home_index/houselist">住宿列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- 医疗管理 -->
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-s-management"></i>
                <span slot="title">医疗管理</span>
              </template>
              <el-submenu index="6-4">
                <span slot="title">医生信息管理</span>
                <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
                <el-menu-item index="/home_index/doctorlist">医生信息管理列表页</el-menu-item>
              </el-submenu>
              <el-submenu index="6-4-2">
                <span slot="title">就诊管理</span>
                <!--<el-menu-item index="1-4-1">选项12</el-menu-item>-->
                <el-menu-item index="/home_index/patientlist">就诊管理列表页</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>

        </el-aside>
        <!--主内容显示区域-->
        <el-main class="el_main_view">
          <!--路由渲染-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-main>
    <!--底部-->
    <!--<el-footer style="border-top: 1px solid gray"></el-footer>-->
  </el-container>
</template>

<script>
// 这一大段JS就是为了做收缩/展开导航栏而用的！
export default {
  name: 'Main',
  data() {
    return {
      isCollapse: false, // 决定左侧导航栏是否展开
    };
  },
  computed: {
    collpaseIcon() { // 左侧导航栏是否展开状态的图标
      // 如果是展开状态就图标向右，否则图标向左
      return this.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold';
    },
    collpaseWidth() { // 左侧导航栏是否展开状态的宽度
      // 如果是展开状态就导航栏宽度为65px，否则200px
      return this.isCollapse ? '65px' : '200px';
    },
  },
  methods: {
    changeCollapse() { // 更改左侧导航栏展示状态
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style scoped>
  /*整体显示区域布局样式*/
  .el_header_tow{
    background-color: lavenderblush;
    margin-top: -2.2%!important;
    width: 100%;
  }
  .el-container {
    height: 100%;
  }

  .el-header, .el-main {
    padding: 0;
  }

  /*左边导航栏具体样式*/
  .el-menu-vertical-demo.el-menu {
    padding-left: 20px;
    text-align: left;
    height: 100%;
    padding: 0;
  }

  el-container > .el-menu-vertical-demo.el-menu {
    padding: 0;
  }

  .el-submenu .el-menu-item, .el-menu-item {
    min-width: 50px;
  }

  .el-menu-item {
    padding: 0;
  }

  .el_main_view{
    margin-left: 1%;
    margin-top: 1%;
  }
</style>
