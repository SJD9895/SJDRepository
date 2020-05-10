<template>
  <el-dialog
    :visible.sync="isVisible"
    :title="$t('Renting_house.add_Renting_house')"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
    @close="closeaddDialog"
    class="add_house_room_el_dialog">
    <div class="addhouse_room_div">
      <el-row type="flex" style="height: 50px;"></el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="18">
          <el-form
            status-icon
            :model="add_house"
            :rules="rules"
            ref="add_house"
            class="addhouse_el_room_form">
            <!-- 住宿编号 -->
            <el-form-item
              :label="$t('Renting_house.Renting_house_number')"
              label-width="100px"
              prop="rhnumber">
              <el-input v-model="add_house.rhnumber" clearable
                        :placeholder="$t('Renting_house.Renting_house_input_rhnumber')" />
            </el-form-item>
            <!-- 方式  Renting_house.Renting_house_mode-->
            <el-form-item
              :label="$t('Renting_house.Renting_house_mode')"
              label-width="100px"
              prop="rhmode_id">
              <el-select
                v-model="add_house.rhmode_id"
                :placeholder="$t('Renting_house.Renting_house_input_mode')"
                class="el_select_house_rhmode"
                clearable>
                <el-option
                  v-for="item in options_house_rhmode"
                  :key="item.rhmode_id"
                  :label="item.rhmode_name"
                  :value="item.rhmode_id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 租金 -->
            <el-form-item
              :label="$t('Renting_house.Renting_house_price')"
              label-width="100px"
              prop="rhprice">
              <el-input v-model="add_house.rhprice" clearable
                        :placeholder="$t('Renting_house.Renting_house_input_price')" />
            </el-form-item>
            <!-- 对应户型 -->
            <el-form-item
              :label="$t('Renting_house.Renting_house_Corresponding_Apartment')"
              label-width="100px"
              prop="aid">
              <el-select
                v-model="add_house.aid"
                :placeholder="$t('Renting_house.Renting_house_input_Corresponding_Apartment')"
                class="el_select_house_apartment"
                clearable filterable>
                <el-option
                  v-for="item in options_house_apartment"
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
              prop="rhorientation"
              class="el_form_item_house_rhorientation">
              <el-radio-group
                v-model="add_house.rhorientation"
                class="el_radio_group_house_rhorientation">
                <el-radio
                  :label="1"
                  border
                  class="el_radio_group_house_rhorientation_east">东
                </el-radio>
                <el-radio
                  :label="2"
                  border
                  class="el_radio_group_house_rhorientation_east">西
                </el-radio>
                <el-radio
                  :label="3"
                  border
                  class="el_radio_group_house_rhorientation_east">南
                </el-radio>
                <el-radio
                  :label="4"
                  border
                  class="el_radio_group_house_rhorientation_east">北
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
              prop="rhreleasetime"
              >
                <el-date-picker
                  class="el_form_item_house_rhreleasetime"
                  v-model="add_house.rhreleasetime"
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
                v-model="add_house.prid"
                :placeholder="$t('Renting_house.Renting_house_Select_release_rhprovinceid')"
                class="el_select_house_rhprovinceid"
                clearable v-on:change="selCityByProvince_code_add" filterable>
                <el-option
                  v-for="item in options_house_rhprovinceid"
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
                v-model="add_house.ciid"
                :placeholder="$t('Renting_house.Renting_house_Select_release_rhcityid')"
                class="el_select_house_rhciid"
                clearable v-on:change="selAreaByCity_code_add" filterable>
                <el-option
                  v-for="item in options_house_rhciid"
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
                v-model="add_house.arid"
                :placeholder="$t('Renting_house.Renting_house_Select_release_rhareaid')"
                class="el_select_house_rharid"
                clearable>
                <el-option
                  v-for="item in options_house_rharid"
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
              prop="rhdetailedaddress">
              <el-input v-model="add_house.rhdetailedaddress" clearable
                        :placeholder="$t('Renting_house.Renting_house_input_rhdetailedaddress')" />
            </el-form-item>
            <el-form-item>
              <!-- 新增房间 -->
              <el-button
                type="primary"
                class="el_button_add_house_room"
                v-on:click="add_Renting_house_button('add_house')"
              >{{$t('Renting_house.add_Renting_house')}}</el-button>
            </el-form-item>
            <el-form-item
              class="el_form_el_form_item_el_button_resetFome_house">
              <!-- 重置  class="el_form_el_form_item_el_button_resetFome" -->
              <el-button>重置</el-button>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="div_span_close_dialog_add_house_room">
          <span slot="footer" class="dialog-footer">
            <el-button @click="isVisible = false">取 消</el-button>
            <el-button type="primary" @click="isVisible = false">确 定</el-button>
          </span>
    </div>
  </el-dialog>
</template>

<script src="../js/addhouse.js">
</script>

<style src="../css/addhouse.css">

</style>
