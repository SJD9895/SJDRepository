<template>
  <div>
    <div class="div_el_menu">
      <el-container>
      <el-aside width="200">
        <!--<el-scrollbar>-->
          <el-menu
            default-active="/Home/home_index"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :collapse="isCollapse"
          >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>用户分析</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index/DataCount">数据统计</el-menu-item>
            <el-menu-item index="/index/UserManagement">用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-upload"></i>
            <span>资料上传</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Home/HelloAac">企业简介</el-menu-item>
            <el-menu-item index="/Home/HelloAac2">资讯动态</el-menu-item>
            <el-menu-item index="/index/ProductManagement">产品管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-upload"></i>
            <span>房间管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Home/addfang">添加房间</el-menu-item>
            <el-menu-item index="/Home/fanglist">房间列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-reading"></i>
            <span>书籍管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Home/addbook">添加书籍</el-menu-item>
            <el-menu-item index="/Home/booklist">书籍列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 住宿管理 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-school"></i>
            <span>住宿管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Home/addhouse">添加住宿</el-menu-item>
            <el-menu-item index="/Home/houselist">住宿列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

          <el-menu-item index="/index/PayList">
            <i class="el-icon-document"></i>
            <span slot="title">购买单列表</span>
          </el-menu-item>
          <el-menu-item index="/index/CollectList">
            <i class="el-icon-star-on"></i>
            <span slot="title">收藏列表</span>
          </el-menu-item>
        </el-menu>
        <!--</el-scrollbar>-->
      </el-aside>
        <div class="div_header_router_view_right">
          <div class="div_div_el_header_radio">
            <el-header>
              <div class="div_el_radio_group_button">
                <div class="el_header_div_img">
                  <img
                    src="../icon/1560be3292e9345001f897b966b7ecfd.jpg"
                    @click="isCollapseBoolean"
                    class="div_img_guanli"  />
                </div>
              </div>
              <div class="div_biaoti">
                <h3>后台系统后台</h3>
              </div>
              <div class="div_el_dropdown_zhanghu_shezhi">
                <el-dropdown>
                  <i class="el-icon-setting" style="margin-right: 10px;color: #fff;"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="SelfInfo">账户设置</el-dropdown-item>
                    <el-dropdown-item command="logout">登出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-header>
          </div>

          <div class="div_elmain_view">
            <el-main>
              <router-view/>
            </el-main>
          </div>
        </div>
      </el-container>
    </div>
  </div>
</template>

<script src="../js/Home.js"></script>

<style src="../css/Home.css"></style>
