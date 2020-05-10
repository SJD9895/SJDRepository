<template>
  <el-dialog
    :visible.sync="isVisible"
    :title="$t('book_manage.Add_book')"
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
            :model="add_book"
            :rules="rules"
            ref="add_fang"
            class="addfang_el_room_form">
            <!-- 书籍名称 -->
            <el-form-item
              :label="$t('book_manage.book_name')"
              label-width="100px"
              prop="funmber">
              <el-input v-model="add_book.bookname" clearable
                        :placeholder="$t('book_manage.book_name_Please_input')" />
            </el-form-item>
            <!-- 书籍作者 -->
            <el-form-item
              :label="$t('book_manage.book_author')"
              label-width="100px"
              prop="bookauthor">
              <el-input v-model="add_book.bookauthor" clearable
                        :placeholder="$t('book_manage.book_author_Please_input')" />
            </el-form-item>
            <!-- 书籍价格 -->
            <el-form-item
              :label="$t('book_manage.book_price')"
              label-width="100px"
              prop="bookprice">
              <el-input v-model="add_book.bookprice" clearable
                        :placeholder="$t('book_manage.book_price_Please_input')" />
            </el-form-item>
            <!-- 书籍类别 -->
            <el-form-item
              :label="$t('book_manage.book_category')"
              label-width="100px"
              prop="cid">
              <el-select
                v-model="add_book.catid"
                :placeholder="$t('book_manage.book_category_select')"
                class="el_select_categoryBook"
                clearable>
                <el-option
                  v-for="item in options_cat"
                  :key="item.catid"
                  :label="item.catname"
                  :value="item.catid">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 上架时间 book_time_Please_input-->
            <el-form-item
              :label="$t('book_manage.book_upper_Shelf_time')"
              label-width="100px"
              prop="bookupperShelftime">
              <el-date-picker
                class="el_form_item_el_data_picker"
                v-model="add_book.bookupperShelftime"
                type="date"
                :placeholder="$t('book_manage.book_time_Please_input')">
              </el-date-picker>
            </el-form-item>
            <!-- 请选者书籍图片 -->
            <!--<el-form-item>
              <el-button
                type="primary"
                class="el_button_add_fang_room"
                >{{$t('book_manage.Select_book_pictures')}}</el-button>
            </el-form-item>-->
<!--            <el-form-item>
              <el-upload
                class="upload-demo"
                action="http://localhost:8080/accommodation/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="add_book.fileList">
                <el-button
                  size="small"
                  type="primary"
                  >{{$t('book_manage.Select_book_pictures')}}</el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >{{$t('book_manage.Select_book_pictures_check')}}</div>
              </el-upload>
            </el-form-item>-->
            <el-form-item label="logo" prop="logo">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="string"
                accept="image/jpeg,image/png,image/jpg"
                list-type="picture-card"
                :before-upload="onBeforeUploadImage"
                :http-request="UploadImage"
                :on-change="fileChange"
                :file-list="add_book.fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <!-- 新增房间 -->
              <el-button
                type="primary"
                class="el_button_add_fang_room"
                v-on:click="add_manage_books">{{$t('book_manage.add_books')}}</el-button>
            </el-form-item>
            <el-form-item
              class="el_form_el_form_item_el_button_resetFome_book">
              <!-- 重置  class="el_form_el_form_item_el_button_resetFome" -->
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="div_span_close_dialog_add_book_room">
          <span slot="footer" class="dialog-footer">
            <el-button @click="isVisible = false">取 消</el-button>
            <el-button type="primary" @click="isVisible = false">确 定</el-button>
          </span>
    </div>
  </el-dialog>
</template>
<script src="../js/addbook.js"></script>
<style src="../css/addbook.css"></style>
