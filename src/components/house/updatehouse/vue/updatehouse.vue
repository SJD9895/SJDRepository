<template>
  <el-dialog
    :visible.sync="isupVisible"
    :title="$t('Renting_house.update_Renting_house')"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
    @close="closeupdDialog"
   >
    <div class="update_house_room_div">
      <el-row type="flex" style="height: 50px;"></el-row>
      <el-form
        status-icon
        :model="update_house"
        :rules="rules"
        ref="update_house"
        class="updatehouse_el_room_form">
        <!-- 住宿ID -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_number')"
          label-width="100px"
          prop="update_house_rhid"
          class="hide_update_house_rhnumber">
          <el-input v-model="update_house.update_house_rhid" clearable
                    :placeholder="$t('Renting_house.Renting_house_input_rhnumber')" />
        </el-form-item>
        <!-- 隐藏的 住宿编号 -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_number')"
          label-width="100px"
          prop="update_house_rhnumber"
          class="hide_update_house_rhnumber">
          <el-input v-model="update_house.update_house_rhnumber" clearable
                    :placeholder="$t('Renting_house.Renting_house_input_rhnumber')" />
        </el-form-item>
        <!-- 显示的 住宿编号 -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_number')"
          label-width="100px"
          prop="update_house_updaterrhnumber">
          <el-input v-model="update_house.update_house_updaterrhnumber" clearable
                    :placeholder="$t('Renting_house.Renting_house_input_rhnumber')" />
        </el-form-item>
        <!-- 方式  Renting_house.Renting_house_mode-->
        <el-form-item
          :label="$t('Renting_house.Renting_house_mode')"
          label-width="100px"
          prop="update_house_rhmode_id">
          <el-select
            v-model="update_house.update_house_rhmode_id"
            :placeholder="$t('Renting_house.Renting_house_input_mode')"
            class="updatehouse_el_select_house_rhmode"
            clearable>
            <el-option
              v-for="item in update_house_options_house_rhmode"
              :key="item.update_house_rhmode_id"
              :label="item.update_house_rhmode_name"
              :value="item.update_house_rhmode_id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 租金 -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_price')"
          label-width="100px"
          prop="update_house_rhprice">
          <el-input v-model="update_house.update_house_rhprice" clearable
                    :placeholder="$t('Renting_house.Renting_house_input_price')" />
        </el-form-item>
        <!-- 对应户型 -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_Corresponding_Apartment')"
          label-width="100px"
          prop="aid">
          <el-select
            v-model="update_house.aid"
            :placeholder="$t('Renting_house.Renting_house_input_Corresponding_Apartment')"
            class="update_house_el_select_house_apartment"
            clearable filterable>
            <el-option
              v-for="item in update_house_options_house_apartment"
              :key="item.aid"
              :label="item.aname"
              :value="item.aid">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 朝向 -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_rhorientation')"
          label-width="100px"
          prop="update_house_rhorientation"
          class="update_house_el_form_item_house_rhorientation">
          <el-radio-group
            v-model="update_house.update_house_rhorientation"
            class="update_house_el_radio_group_house_rhorientation">
            <el-radio
              :label="1"
              border
              class="update_house_el_radio_group_house_rhorientation_east">东
            </el-radio>
            <el-radio
              :label="2"
              border
              class="update_house_el_radio_group_house_rhorientation_east">西
            </el-radio>
            <el-radio
              :label="3"
              border
              class="update_house_el_radio_group_house_rhorientation_east">南
            </el-radio>
            <el-radio
              :label="4"
              border
              class="update_house_el_radio_group_house_rhorientation_east">北
            </el-radio>
          </el-radio-group>

          <!--<el-radio-group v-model="add_house.rhorientation" size="mini">
            <el-radio label="1" border>备选项1</el-radio>
            <el-radio label="2" border>备选项2</el-radio>
          </el-radio-group>-->
        </el-form-item>
        <!-- 发布时间 -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_rhreleasetime')"
          label-width="100px"
          prop="update_house_rhreleasetime"
        >
          <el-date-picker
            class="update_house_el_form_item_house_rhreleasetime"
            v-model="update_house.update_house_rhreleasetime"
            type="date"
            :placeholder="$t('Renting_house.Renting_house_Select_release_time')">
          </el-date-picker>
        </el-form-item>
        <!-- 所在省 Renting_house_rhprovinceid -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_rhprovinceid')"
          label-width="100px"
          prop="prid">
          <el-select
            v-model="update_house.prid"
            :placeholder="$t('Renting_house.Renting_house_Select_release_rhprovinceid')"
            class="update_house_el_select_house_rhprovinceid"
            clearable v-on:change="sel_CityByProvince_code_update" filterable>
            <el-option
              v-for="item in update_house_options_house_rhprovinceid"
              :key="item.prid"
              :label="item.prname"
              :value="item.prid">
            </el-option>
          </el-select>
        </el-form-item>
        <!--
        Renting_house_rhcityid: '所在市',
Renting_house_rhareaid: '所在区',
        -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_rhcityid')"
          label-width="100px"
          prop="ciid" clearable>
          <el-select
            v-model="update_house.ciid"
            :placeholder="$t('Renting_house.Renting_house_Select_release_rhcityid')"
            class="update_house_el_select_house_rhciid"
            clearable v-on:change="sel_update_AreaByCity_code_update" filterable>
            <el-option
              v-for="item in update_house_options_house_rhciid"
              :key="item.ciid"
              :label="item.ciname"
              :value="item.ciid">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 所在区 -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_rhareaid')"
          label-width="100px"
          prop="arid" clearable filterable>
          <el-select
            v-model="update_house.arid"
            :placeholder="$t('Renting_house.Renting_house_Select_release_rhareaid')"
            class="update_house_el_select_house_rharid"
            clearable>
            <el-option
              v-for="item in update_house_options_house_rharid"
              :key="item.arid"
              :label="item.arname"
              :value="item.arid">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 详细地址 -->
        <el-form-item
          :label="$t('Renting_house.Renting_house_rhdetailedaddress')"
          label-width="100px"
          prop="update_house_rhdetailedaddress">
          <el-input v-model="update_house.update_house_rhdetailedaddress" clearable
                    :placeholder="$t('Renting_house.Renting_house_input_rhdetailedaddress')" />
        </el-form-item>
        <el-form-item>
          <!-- 新增房间 -->
          <el-button
            type="primary"
            class="update_house_el_button_add_house_room"
            v-on:click="update_house_button('update_house')"
          >{{$t('Renting_house.update_Renting_house')}}</el-button>
        </el-form-item>
        <el-form-item
          class="el_form_item_el_button_resetFome_house_update">
          <!-- 重置  class="el_form_el_form_item_el_button_resetFome" -->
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="update_house_div_span_close_dialog_update_house_room">
          <span slot="footer" class="dialog-footer">
            <el-button @click="isupVisible = false">取 消</el-button>
            <el-button type="primary" @click="isupVisible = false">确 定</el-button>
          </span>
    </div>
  </el-dialog>
</template>
<script src="../js/updatehouse.js">
</script>

<style src="../css/updatehouse.css">

</style>
