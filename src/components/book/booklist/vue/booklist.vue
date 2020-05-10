<template>
  <div class="template_div">
    <addbook v-if="addbook.show" :isShow="addbook.show"
             :addbookRow="addbook.addbookRow"
             @closeDialog="hideAddbookDialog"/>
    <el-row>
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item class="el_form_item_fang_add_buton">
          <!-- 新增房间 -->
          <el-button type="info" plain  class="el_button_add_fang"
                     v-on:click="Add_books" >{{$t('book_manage.book_add')}}</el-button>
        </el-form-item>
        <!-- 书籍作者名称 -->
        <el-form-item :label="$t('book_manage.book_author')"
                      label-width="100px" class="el_form_item_book_author">
          <el-input v-model="fang_funmber" clearable
                    :placeholder="$t('fang_Room.book_author_Please_input')" />
        </el-form-item>
        <!-- 书籍名称 -->
        <el-form-item :label="$t('book_manage.book_name')"
                      label-width="100px">
          <el-input v-model="fang_funmber" clearable
                    :placeholder="$t('book_manage.book_name_Please_input')" />
        </el-form-item>

        <!-- 书籍种类 -->
        <el-form-item :label="$t('book_manage.book_category')" label-width="100px">
          <!--<el-input  placeholder="请输入管理员姓名"></el-input>-->
          <el-select v-model="cat_cid" :placeholder="$t('book_manage.book_category_select')"
                     class="el_select_category" clearable >
            <el-option
              v-for="item in options_cat"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <!--     book_min_price: '价格在',
    book_max_price: '到', -->
        <!-- 价格在 -->
        <el-form-item :label="$t('book_manage.book_min_price')"
                      label-width="100px" >
          <el-input v-model="fang_minprice" clearable
                    :placeholder="$t('book_manage.book_price_Please_input')" />
        </el-form-item>

        <!-- 到 -->
        <el-form-item :label="$t('book_manage.book_max_price')"
                      label-width="100px" >
          <el-input v-model="fang_manprice" clearable
                    :placeholder="$t('book_manage.book_price_Please_input')" />
        </el-form-item>

        <!--
            book_upper_Shelf_min_time: '书籍上架时间在',
    book_upper_Shelf_max_time: '到',
        -->
        <el-form-item :label="$t('book_manage.book_upper_Shelf_min_time')"
                      label-width="110px" >
          <el-input v-model="fang_manprice" clearable
                    :placeholder="$t('book_manage.book_time_Please_input')" />
        </el-form-item>

        <el-form-item :label="$t('book_manage.book_upper_Shelf_max_time')"
                      label-width="100px" >
          <el-input v-model="fang_manprice" clearable
                    :placeholder="$t('book_manage.book_time_Please_input')" />
        </el-form-item>
        <el-form-item class="el_form_item_el_button_select">
          <!-- el_table_select -->
          <el-button
            type="primary"
            v-on:click="getFangList"
            class="el_button_select"
          >
            {{$t('el_table_operation.el_table_select')}}
          </el-button>
        </el-form-item>

        <el-form-item>
          <!-- 删除 -->
          <el-button
            type="primary"
            class="el_button_select"
          >
            {{$t('el_table_operation.el_table_delete')}}
          </el-button>
        </el-form-item>

        <el-form-item>
          <!-- 删除 -->
          <el-button
            type="primary"
            class="el_button_select"
          >
            {{$t('el_table_operation.el_table_export')}}
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
      >
        <!-- 复选框 -->
        <el-table-column
          type="selection"
          align='center'
          width="60">
        </el-table-column>

        <!-- 书籍名称 -->
        <el-table-column
          prop="bookname"
          :label="$t('book_manage.book_name')"
          align='center'
          width="130">
        </el-table-column>

        <!-- 书籍作者 -->
        <el-table-column
          prop="bookauthor"
          :label="$t('book_manage.book_author')"
          align='center'
          width="180">
        </el-table-column>

        <!-- 书籍类别 -->
        <el-table-column
          prop="catname"
          align='center'
          :label="$t('book_manage.book_category')"
        >
        </el-table-column>

        <!-- 上架时间 -->
        <el-table-column
          prop="bookupperShelftime"
          align='center'
          :label="$t('book_manage.book_upper_Shelf_time')"
        >
        </el-table-column>

        <!-- 下架时间 -->
        <el-table-column
          prop="booklowerShelftime"
          align='center'
          :label="$t('book_manage.book_lower_Shelf_time')"
        >
        </el-table-column>

        <!-- 是否删除 -->
        <el-table-column
          prop="bookstate"
          align='center'
          :label="$t('book_manage.book_state')"
        >
        </el-table-column>

        <!-- 是否上下架 -->
        <el-table-column
          prop="book_shelf_start"
          align='center'
          :label="$t('book_manage.book_shelf_start')"
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
            >{{$t('el_table_operation.el_table_edit')}}</el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon='delete'
              size="mini"
            >{{$t('el_table_operation.el_table_delete')}}</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-row>
        <el-col :span="24">
          <div class="pagination_book_el_pagination">
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
<script src="../js/booklist.js">
</script>
<style src="../css/booklist.css">
</style>
