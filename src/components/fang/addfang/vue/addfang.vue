<template>
  <el-dialog
    :visible.sync="isVisible"
    :title="$t('fang_Room.add_fang_Room')"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
    @close="closeDialog"
    class="add_fang_room_el_dialog">
    <div class="addfang_room_div">
      <el-row type="flex" style="height: 50px;"></el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="18">
          <el-form
            status-icon
            :model="add_fang"
            :rules="rules"
            ref="add_fang"
            class="addfang_el_room_form">
            <!-- 房间编号 -->
            <el-form-item
              :label="$t('fang_Room.fang_Room_name')"
              label-width="100px"
              prop="funmber">
              <el-input v-model="add_fang.funmber" clearable
                        :placeholder="$t('fang_Room.fang_Room_input_name')" />
            </el-form-item>
            <!-- 房间种类 -->
            <el-form-item
              :label="$t('fang_Room.fang_Room_category')"
              label-width="100px"
              prop="cid">
              <el-select
                v-model="add_fang.cid"
                :placeholder="$t('fang_Room.fang_Room_select_category')"
                class="el_select_category"
                clearable
                v-on:change="Change_set_price(add_fang.cid)">
                <el-option
                  v-for="item in options_cat"
                  :key="item.cid"
                  :label="item.cname"
                  :value="item.cid">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 住宿单价 -->
            <el-form-item
              :label="$t('fang_Room.Unit_price_of_accommodation')"
              label-width="100px"
              prop="price">
              <el-input
                v-model="add_fang.price"
                :placeholder="$t('fang_Room.Unit_price_of_accommodation')"
                :disabled="true"></el-input>
            </el-form-item>
            <!-- 房间设备 fang_Room_equipment-->
            <el-form-item
              :label="$t('fang_Room.fang_Room_equipment')"
              label-width="100px"
              prop="checkList">
              <el-checkbox-group v-model="add_fang.checkList">
                <!-- 网络 -->
                <el-checkbox :label="$t('fang_Room.network')" />
                <!-- 电脑 -->
                <el-checkbox :label="$t('fang_Room.Computer')" />
                <!-- 书桌 -->
                <el-checkbox :label="$t('fang_Room.Desk')" />

                <!-- 电视 -->
                <el-checkbox :label="$t('fang_Room.television')" />

                <!--<el-checkbox label="禁用" disabled />
                <el-checkbox label="选中且禁用" disabled />-->
              </el-checkbox-group>
            </el-form-item>
            <!-- 房间状态 -->
            <el-form-item
              :label="$t('fang_Room.fang_Room_start')"
              label-width="100px"
              prop="value_start">
              <el-select
                v-model="add_fang.value_start"
                clearable
                :placeholder="$t('fang_Room.fang_Room_select_start')"
                class="el_select_start"
                :disabled="true">
                <el-option
                  v-for="item in options_start"
                  :key="item.value_start"
                  :label="item.label_start"
                  :value="item.value_start">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <!-- 新增房间 -->
              <el-button
                type="primary"
                class="el_button_add_fang_room"
                v-on:click="add_fang_Room('add_fang')">{{$t('fang_Room.add_fang_Room')}}</el-button>
            </el-form-item>
            <el-form-item
              class="el_form_el_form_item_el_button_resetFome">
              <!-- 重置  class="el_form_el_form_item_el_button_resetFome" -->
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="div_span_close_dialog_add_fang_room">
          <span slot="footer" class="dialog-footer">
            <el-button @click="isVisible = false">取 消</el-button>
            <el-button type="primary" @click="isVisible = false">确 定</el-button>
          </span>
    </div>
  </el-dialog>
</template>

<script src="../js/addfang.js">
</script>

<style src="../css/addfang.css">

</style>
