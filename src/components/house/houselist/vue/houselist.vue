<template>
  <div>
    <addhouse v-if="addhouse.addshow" :isaddShow="addhouse.addshow"
             :dialogRow="addhouse.adddialogRow"
              @get_queryData_Rentinghouseist="getRentinghouseList"
             @closeaddDialog="hideAddhouseDialog"/>
    <updatehouse v-if="updatehouse.upshow" :isupdateShow="updatehouse.upshow"
                :dialogupdateRow="updatehouse.updialogRow"
                 @get_queryData_Rentinghouseist_update="getRentinghouseList"
                @closeupdDialog="hideupdatehouseDialog"/>

    <el-row>
      <el-form :inline="true"  class="demo-form-inline">
        <!-- 添加住宿 -->
        <el-form-item class="el_form_item_fang_add_buton">
          <el-button type="info" plain
                     class="el_button_add_fang"
                     v-on:click="addRentinghouse"
          >{{$t('Renting_house.Renting_house_add')}}</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 删除 -->
          <el-button
            type="primary"
            v-on:click="delete_house_rhids"
            class="el_button_select"
          >
            {{$t('el_table_operation.el_table_delete')}}
          </el-button>
        </el-form-item>
      </el-form>

    </el-row>
    <div class="table_container">
      <el-table
        v-loading="houseloading"
        :data="houselistData"
        style="width: 100%"
        align='center'
        @select="selecthouseTable"
        @select-all="selechousetAll"
      >

        <!-- 复选框 -->
        <el-table-column
          type="selection"
          align='center'
          width="60">
        </el-table-column>

        <!-- 住宿编号 Renting_house.Renting_house_number -->
        <el-table-column
          prop="rhnumber"
          :label="$t('Renting_house.Renting_house_number')"
          align='center'
          width="130">
        </el-table-column>

        <!-- 所在区 Renting_house.Renting_house_cation -->
        <el-table-column
          prop="arname"
          :label="$t('Renting_house.Renting_house_cation')"
          align='center'
          width="180">
        </el-table-column>

        <!-- 方式 Renting_house.Renting_house_mode-->
        <el-table-column
          prop="display_rhmode"
          align='center'
          :label="$t('Renting_house.Renting_house_mode')"
        >
        </el-table-column>

        <!-- 租金 Renting_house.Renting_house_price-->
        <el-table-column
          prop="rhprice"
          align='center'
          :label="$t('Renting_house.Renting_house_price')"
        >
        </el-table-column>

        <!-- 户型 Renting_house.Renting_house_Apartment -->
        <el-table-column
          prop="aname"
          align='center'
          :label="$t('Renting_house.Renting_house_Apartment')"
        >
        </el-table-column>
        <!-- 朝向 -->
        <el-table-column
          prop="rhorientation"
          align='center'
          :label="$t('Renting_house.Renting_house_rhorientation')"
        >
        </el-table-column>
        <!-- 详细地址 -->
        <el-table-column
          prop="rhdetailedaddress"
          align='center'
          :label="$t('Renting_house.Renting_house_rhdetailedaddress')"
        >
        </el-table-column>
        <!-- 发布时间 Renting_house_rhreleasetime-->
        <el-table-column
          prop="display_rhreleasetime"
          align='center'
          :label="$t('Renting_house.Renting_house_rhreleasetime')"
        >
        </el-table-column>
        <el-table-column
          prop="operation"
          align='center'
          label="操作"
          width="180">
          <template slot-scope='scope'>
            <el-button
              type="warning"
              icon='edit'
              size="mini"
              @click='onEditMoneyHouse(scope.row)'
            >{{$t('el_table_operation.el_table_edit')}}</el-button>
            <!-- 删除 rhid -->
            <el-button
              type="danger"
              icon='delete'
              size="mini"
              v-on:click="delete_House_ByRhid(scope.row.rhid)"
            >{{$t('el_table_operation.el_table_delete')}}</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-row>
        <el-col :span="24">
          <div class="pagination_el_pagination">
            <el-pagination
              :page-sizes="pageSizes"
              :page-size="dataSize"
              :layout="layout"
              :total="total"
              :current-page='pageIndex'
              @current-change='handleCurrentChange'
              @size-change='handleSizeChange'>
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>
<script src="../js/houselist.js">

</script>

<style src="../css/houselist.css">

</style>
