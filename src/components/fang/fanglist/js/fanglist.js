
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line import/extensions
import addfang from '../../addfang/vue/addfang.vue';
// eslint-disable-next-line no-unused-vars,import/extensions
import fangupdate from '../../fangupdate/vue/fangupdate.vue';
// eslint-disable-next-line import/first,no-unused-vars
import el from 'element-ui/src/locale/lang/el';

export default {
  components: {
    addfang,
    fangupdate,
  },
  data() {
    return {
      fanglistData: [],
      tableHeight: 0,
      loading: false,
      idFlag: false,
      isShow: false, // 是否显示资金modal,默认为false
      editid: '',
      rowIds: [],
      sortnum: 0,
      // 需要给分页组件传的信息

      total: 0, // 总数
      pageIndex: 1, // 当前位于哪页
      dataSize: 5, // 1页显示多少条
      pageSizes: [5, 8, 10], // 每页显示多少条
      layout: 'total, sizes, prev, pager, next, jumper', // 翻页属性
      // eslint-disable-next-line max-len
      // <updatefang v-if="updatefang.upshow" :isupdShow="updatefang.upshow" :dialogupdRow="updatefang.updialogRow"  @closeupdDialog="hideupdatefangfangDialog"></updatefang>
      addfang: {
        show: false,
        dialogRow: {},
      },
      fangupdate: {
        upshow: false,
        updialogRow: {},
      },
      /* fang_funmber,fang_minprice,fang_manprice */
      fang_funmber: '',
      fang_minprice: '',
      fang_manprice: '',
      options_cat: [],
      cat_cid: '',
      bat_fids: '',
    };
  },
  watch: {

  },
  methods: {
    sel_fang_Room_category() {
      const url = `${this.HOME}/categoryfang/selCategoryfangAll`;
      this.axios.post(url, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);

        if (res.data != null) {
          console.log(' res.data.result = addfang.dialog= = ');
          console.log(res);
          this.options_cat = res.data;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    return_CoreSelFang() {
      const CoreSelFang = {
        fnumber: this.fang_funmber,
        fcid: this.cat_cid,
        minprice: this.fang_minprice,
        maxprice: this.fang_manprice,
        pageNumber: this.pageIndex,
        pageSize: this.dataSize,
      };
      return CoreSelFang;
    },
    getFangList() {
      const tab = this.dataSize;
      console.log('tab = = =');
      console.log(tab);
      const url = `${this.HOME}/accom_fang/queryDataCoreFang`;
      const CoreSelFang = this.return_CoreSelFang();
      this.axios.post(url, CoreSelFang, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);

        if (res.data != null) {
          console.log(' res.data.result = = = ');
          console.log(res);
          this.fanglistData = res.data.result;
          this.total = res.data.count;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },

    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    // eslint-disable-next-line no-unused-vars
    selectTable(val, row) {
      console.log('fanglist selectTable = = = ');
      console.log(val);
      // eslint-disable-next-line eqeqeq
      if (val != null && val != [] && val != undefined) {
        this.setSearchBtn(val);
      }
    },
    // 用户全选checkbox时触发该事件
    selectAll(val) {
      /* val.forEach((item) => {
        this.rowIds.push(item.id)
      }); */
      // eslint-disable-next-line eqeqeq
      if (val != null && val != [] && val != undefined) {
        this.setSearchBtn(val);
      }
    },
    setSearchBtn(val) {
      console.log('122 val = = = ');
      console.log(val);
      let va = '';
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < val.length; i++) {
        va += `${val[i].fid},`;
      }
      const vas = va.substring(0, va.length - 1);
      this.bat_fids = vas;
      console.log('139 = = =');
      console.log(`this.bat_fids = = =${this.bat_fids}`);
    },
    delete_fang_fids() {
      const vals = this.bat_fids;
      // eslint-disable-next-line eqeqeq
      if (vals != '' && vals != null) {
        this.delete_fang_Batch_deletion(vals);
      } else {
        this.delete_fang_fids_isnull_message();
      }
    },
    delete_fang_Batch_deletion(vals) {
      this.$confirm('您确定删除此记录吗?', '是否删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.delete_fang_bat(vals);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },

    delete_fang_bat(vals) {
      const url = `${this.HOME}/accom_fang/delete_fang`;
      const fang = {
        fids: vals,
      };
      this.axios.post(url, fang, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        /*
        在 data中 返回的 信息
        st: 2 flag: "isdeletefang_byfid_isok"result: null count: 0
        */
        if (res.data.st === 2 && res.data.flag === 'isdeletefang_byfid_isok') {
          this.delete_fang_message();
        }
        console.log('res = = = ');
        console.log(res);
      });
    },

    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.dataSize = pageSize;
      this.getFangList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.pageIndex = page;
      this.getFangList();
    },
    addfangroom() {
      this.addfang.show = true;
    },
    hideAddfangDialog() {
      this.addfang.show = false;
    },
    // updatefang
    hideupdatefangfangDialog() {
      this.fangupdate.upshow = false;
    },
    onEditMoneyFang(row) {
      console.log(' fanglist.js 145 row = = =');
      console.log(row);
      this.fangupdate.updialogRow = { ...row };
      this.showupdatefangDialog();
    },
    // 编辑操作方法
    /* onEditMoney(row){
      this.addFundDialog.dialogRow = {...row};
      this.showAddFundDialog();
    }, */

    // 显示资金弹框
    showupdatefangDialog() {
      this.fangupdate.upshow = true;
    },

    deletefangbyFid(fid) {
      console.log(' fid = = = ? ');
      console.log(fid);
      this.$confirm('您确定删除此记录吗?', '是否删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.delete_fang_by_fid(fid);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    /* 根据 fid 单个单个删除 */
    delete_fang_by_fid(fid) {
      const url = `${this.HOME}/accom_fang/delete_fang`;
      const fang = {
        fid,
      };
      this.axios.post(url, fang, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        /*
        在 data中 返回的 信息
        st: 2 flag: "isdeletefang_byfid_isok"result: null count: 0
        */
        if (res.data.st === 2 && res.data.flag === 'isdeletefang_byfid_isok') {
          this.delete_fang_message();
        }
        console.log('res = = = ');
        console.log(res);
      });
    },
    delete_fang_message() {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
      this.getFangList();
    },
    delete_fang_fids_isnull_message() {
      this.$message({
        showClose: true,
        type: 'warning',
        message: '请选择要删除的房间',
      });
    },
  },
  mounted() {
    this.getFangList();
    this.sel_fang_Room_category();
  },
  create() {

  },
};
