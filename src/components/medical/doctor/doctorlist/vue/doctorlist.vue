<template>
  <div class="template_div">
    <adddoctor v-if="adddoctor.adddoctor_show" :adddoctor_show="adddoctor.adddoctor_show"
             :adddoctor_dialogRow="adddoctor.adddoctor_dialogRow" @getFang_RoomList="getDoctorList"
             @closeadd_doctorDialog="hideAdddoctorDialog"/>
    <el-row>
      <!-- 房间号 -->
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item class="el_form_item_fang_add_buton">
          <el-button type="info" plain  class="el_button_add_fang"
                     v-on:click="addfangroom">{{$t('fang_Room.add')}}</el-button>
        </el-form-item>
        <!-- 房间编号 -->

        <el-form-item :label="$t('fang_Room.fang_Room_name')"
                      label-width="100px">
          <el-input v-model="fang_funmber" clearable
                    :placeholder="$t('fang_Room.fang_Room_input_name')" />
        </el-form-item>

        <!-- 房间种类 -->
        <el-form-item :label="$t('fang_Room.fang_Room_category')" label-width="100px">
          <!--<el-input  placeholder="请输入管理员姓名"></el-input>-->
          <el-select v-model="cat_cid" :placeholder="$t('fang_Room.fang_Room_select_category')"
                     class="el_select_category" clearable >
            <el-option
              v-for="item in options_cat"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- fang_Room_min_price: '价格在',
    fang_Room_max_price: '到' -->
        <!-- 价格在 -->
        <el-form-item :label="$t('fang_Room.fang_Room_min_price')"
                      label-width="100px" >
          <el-input v-model="fang_minprice" clearable
                    :placeholder="$t('fang_Room.fang_Room_price')" />
        </el-form-item>

        <!-- 到 -->
        <el-form-item :label="$t('fang_Room.fang_Room_max_price')"
                      label-width="100px" >
          <el-input v-model="fang_manprice" clearable
                    :placeholder="$t('fang_Room.fang_Room_price')" />
        </el-form-item>

        <el-form-item class="el_form_item_el_button_select">
          <!-- el_table_select -->
          <el-button
            type="primary"
            v-on:click="getDoctorList"
            class="el_button_select"
          >
            {{$t('el_table_operation.el_table_select')}}
          </el-button>
        </el-form-item>

        <el-form-item>
          <!-- 删除 -->
          <el-button
            type="primary"
            v-on:click="delete_fang_fids"
            class="el_button_select"
          >
            {{$t('el_table_operation.el_table_delete')}}
          </el-button>
        </el-form-item>
      </el-form>

      <!--
      fang_funmber,fang_minprice,fang_manprice
      -->
    </el-row>

    <div class="table_container">
      <el-table
        v-loading="loading"
        :data="fanglistData"
        style="width: 100%"
        align='center'
        @select="selectTable"
        @select-all="selectAll"
      >
        <!-- 复选框 -->
        <el-table-column
          type="selection"
          align='center'
          width="60">
        </el-table-column>

        <!--  (医生编号)-->
        <el-table-column
          prop="docnumber"
          :label="$t('medical_doctor.doctor_el_table_docnumber')"
          align='center'
          width="130">
        </el-table-column>

        <!-- 医生姓名 -->
        <el-table-column
          prop="docname"
          :label="$t('medical_doctor.doctor_el_table_docname')"
          align='center'
          width="180">
        </el-table-column>

        <!-- 医生性别 -->
        <el-table-column
          prop="docsex_val"
          align='center'
          :label="$t('medical_doctor.doctor_el_table_docsex')"
        >
        </el-table-column>

        <!-- 所属科室 -->
        <el-table-column
          prop="depname"
          align='center'
          :label="$t('medical_doctor.doctor_el_table_department')"
        >
        </el-table-column>

        <!-- 职务级别 -->
        <el-table-column
          prop="jobname"
          align='center'
          :label="$t('medical_doctor.doctor_el_table_Jobrank')"
        >
        </el-table-column>

        <!-- 联系方式 -->
        <el-table-column
          prop="docphone"
          align='center'
          :label="$t('medical_doctor.doctor_el_table_docphone')"
        >
        </el-table-column>

        <!-- 看诊人数 -->
        <el-table-column
          prop="concount"
          align='center'
          :label="$t('medical_doctor.doctor_el_table_consult')"
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
              @click='onEditMoneyFang(scope.row)'
            >{{$t('el_table_operation.el_table_edit')}}</el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon='delete'
              size="mini"
              v-on:click="deletefangbyFid(scope.row.fid)"
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
<script src="../js/doctorlist.js"></script>
<style src="../css/doctorlist.css"></style>
