// eslint-disable-next-line no-unused-vars,import/extensions
import addhouse from '../../addhouse/vue/addhouse.vue';

// eslint-disable-next-line no-unused-vars,import/extensions
import updatehouse from '../../updatehouse/vue/updatehouse.vue';


export default {
  components: {
    addhouse,
    updatehouse,
  },
  data() {
    return {
      houseloading: false,
      houselistData: [],
      total: 0, // 总数
      pageIndex: 1, // 当前位于哪页
      dataSize: 5, // 1页显示多少条
      pageSizes: [5, 8, 10], // 每页显示多少条
      layout: 'total, sizes, prev, pager, next, jumper', // 翻页属性
      addhouse: {
        addshow: false,
        adddialogRow: {},
      },
      updatehouse: {
        upshow: false,
        updialogRow: {},
      },
      bat_rhids: '',
    };
  },
  watch: {

  },
  methods: {
    addRentinghouse() {
      this.addhouse.addshow = true;
    },
    hideAddhouseDialog() {
      this.addhouse.addshow = false;
    },
    hideupdatehouseDialog() {
      this.updatehouse.upshow = false;
    },
    onEditMoneyHouse(row) {
      console.log(' houselist.js 一行的数据 row = = =');
      console.log(row);
      this.updatehouse.updialogRow = { ...row };
      this.showupdateHouseDialog();
    },
    showupdateHouseDialog() {
      this.updatehouse.upshow = true;
    },
    getRentinghouseList() {
      const tab = this.dataSize;
      console.log('tab = = =');
      console.log(tab);
      const url = `${this.HOME}/corerentinghouse/queryDataCoreRentinghouse`;
      const CoreSelFang = {
        fnumber: this.fang_funmber,
        fcid: this.cat_cid,
        minprice: this.fang_minprice,
        maxprice: this.fang_manprice,
        pageNumber: this.pageIndex,
        pageSize: this.dataSize,
      };

      this.axios.post(url, CoreSelFang, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);
        if (res.data != null) {
          console.log(' 住宿列表 res.data.result = = = ');
          console.log(res);
          this.houselistData = res.data.result;
          this.total = res.data.count;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },

    // 当用户手动勾选数据行的 Checkbox 时触发的事件 selecthouseAll
    // eslint-disable-next-line no-unused-vars
    selecthouseTable(val, row) {
      console.log('selecthouseTable = = = ');
      console.log(val);
      // eslint-disable-next-line eqeqeq
      if (val != null && val != [] && val != undefined) {
        this.setSearchBtn_house(val);
      }
    },
    // 用户全选checkbox时触发该事件
    selechousetAll(val) {
      console.log('selecthouseAll = = = ');
      console.log(val);
      // eslint-disable-next-line eqeqeq
      if (val != null && val != [] && val != undefined) {
        this.setSearchBtn_house(val);
      }
    },

    setSearchBtn_house(val) {
      console.log('122 val = = = ');
      console.log(val);
      let va = '';
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < val.length; i++) {
        va += `${val[i].rhid},`;
      }
      const vas = va.substring(0, va.length - 1);
      this.bat_rhids = vas;
      console.log('117 = = =');
      console.log(`this.bat_rhids = = =${this.bat_rhids}`);
    },

    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.dataSize = pageSize;
      this.getRentinghouseList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.pageIndex = page;
      this.getRentinghouseList();
    },

    // eslint-disable-next-line no-unused-vars
    delete_House_ByRhid(rhid) {
      console.log(` rhid = = =  ${rhid}`);
      this.$confirm('您确定删除此记录吗?', '是否删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.delete_House_by_Rhid(rhid);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    // eslint-disable-next-line no-unused-vars
    delete_House_by_Rhid(rhid) {
      const url = `${this.HOME}/corerentinghouse/delete_rentinghouse`;
      const Rentinghouse = {
        rhid,
      };
      this.axios.post(url, Rentinghouse, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        /*
        在 data中 返回的 信息
        st: 2 flag: "isdeletefang_byfid_isok"result: null count: 0
        */
        if (res.data.st === 2 && res.data.flag === 'isdeletehouse_byrhid_isok') {
          this.delete_house_message();
        }
        console.log('res = = = ');
        console.log(res);
      });
    },
    delete_house_rhids() {
      const rhids = this.bat_rhids;
      // eslint-disable-next-line eqeqeq
      if (rhids !== '' && rhids !== null && rhids !== undefined) {
        this.delete_house_Batch_deletion(rhids);
      } else {
        this.delete_house_rhids_isnull_message();
      }
    },

    delete_house_Batch_deletion(rhids) {
      this.$confirm('您确定删除此记录吗?', '是否删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.delete_house_bat(rhids);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },

    delete_house_bat(rhids) {
      const url = `${this.HOME}/corerentinghouse/delete_rentinghouse`;
      const Rentinghouse = {
        rhids,
      };
      this.axios.post(url, Rentinghouse, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        /*
        在 data中 返回的 信息
        st: 2 flag: "isdeletefang_byfid_isok"result: null count: 0
        */
        if (res.data.st === 2 && res.data.flag === 'isdeletehouse_byrhid_isok') {
          this.delete_house_message();
        }
        console.log('res = = = ');
        console.log(res);
      });
    },

    delete_house_message() {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
      this.getRentinghouseList();
    },

    delete_house_rhids_isnull_message() {
      this.$message({
        showClose: true,
        type: 'warning',
        message: '请选择要删除的住宿',
      });
    },
  },
  mounted() {
    this.getRentinghouseList();
  },
  create() {

  },
};

