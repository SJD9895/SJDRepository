<template>
  <el-dialog
    :visible.sync="isupVisible"
    :title="$t('fang_Room.update_fang_Room')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="closeupdDialog"
    class="update_fang_room_el_dialog">
    <div class="addfang_room_div">
      <el-row type="flex" style="height: 50px;"> </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="18">
          <el-form
            status-icon
            :model="update_fang"
            :rules="rules"
            ref="update_fang"
            class="addfang_el_room_form">
            <!-- 房间ID -->
            <el-form-item class="el_form_item_fang_fid">
              <el-input v-model="update_fang.fid"></el-input>
            </el-form-item>

            <!-- 房间编号
              prop="funmber" 和 v-model的v-model="addfang.funmber" 一样 用于重置
             -->
            <el-form-item
              :label="$t('fang_Room.fang_Room_name')"
              label-width="100px"
              prop="funmber">
              <el-input
                v-model="update_fang.funmber"
                clearable
                :placeholder="$t('fang_Room.fang_Room_input_name')"
                :disabled="true"/>
            </el-form-item>
            <!-- 房间种类 -->
            <el-form-item
              :label="$t('fang_Room.fang_Room_category')"
              label-width="100px"
              prop="cid">
              <el-select
                v-model="update_fang.cid"
                :placeholder="$t('fang_Room.fang_Room_select_category')"
                class="update_fang_el_select_category"
                clearable
                :disabled="true">
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
                v-model="update_fang.price"
                :placeholder="$t('fang_Room.Unit_price_of_accommodation')"
                :disabled="true">
              </el-input>
            </el-form-item>
            <!-- 房间设备 fang_Room_equipment-->
            <!-- network: '网络',
      Computer: '电脑',
      Desk: '书桌',
      television: '电视' -->
            <el-form-item
              :label="$t('fang_Room.fang_Room_equipment')"
              label-width="100px"
              prop="checkList">
              <el-checkbox-group v-model="update_fang.checkList">
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
                v-model="update_fang.value_start"
                clearable
                :placeholder="$t('fang_Room.fang_Room_select_start')"
                class="update_fang_el_select_start"
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
              <!-- 新增房间 v-on:click="update_fang_Room('update_fang')"-->
              <el-button
                type="primary"
                class="update_fang_el_button_add_fang_room"
                v-on:click="update_fang_Room('update_fang')"
              >{{ $t("fang_Room.update_fang_Room") }}</el-button
              >
            </el-form-item>
            <el-form-item
              class="update_el_form_el_form_item_el_button_resetFome"
            >
              <!-- 重置  class="el_form_el_form_item_el_button_resetFome" -->
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="div_span_close_dialog_update_fang_room">
      <!--<span slot="footer" class="dialog-footer">
        <el-button @click="isVisible = false">取 消</el-button>
        <el-button type="primary" @click="isVisible = false">确 定</el-button>
      </span>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="isupVisible = false">取 消</el-button>
        <el-button type="primary" @click="isupVisible = false">确 定</el-button>
      </span>
    </div>
  </el-dialog>
</template>

<script src="../js/fangupdate.js"></script>

<style src="../css/fangupdate.css"></style>
