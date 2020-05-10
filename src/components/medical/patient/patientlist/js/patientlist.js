// eslint-disable-next-line import/extensions
import addpatient from '../../addpatient/vue/addpatient.vue';


export default {
  components: {
    // eslint-disable-next-line no-undef
    addpatient,
  },
  data() {
    return {
      patientlistData: [],
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
      addpatient: {
        addpatient_show: false,
        addpatient_dialogRow: {},
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
      bat_patids: '',
    };
  },
  watch: {

  },
  methods: {
    addPatient() {
      this.addpatient.addpatient_show = true;
    },
    hideAddPatientDialog() {
      this.addpatient.addpatient_show = false;
    },
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
      this.bat_patids = vas;
      console.log('139 = = =');
      console.log(`this.bat_patids = = =${this.bat_patids}`);
    },

    /*
    * 查询 就诊
    * */
    getPatientList() {
      const tab = this.dataSize;
      console.log('tab = = =');
      console.log(tab);
      const url = `${this.HOME}/cors_doctor/queryDataCorsDoctor`;
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
          this.patientlistData = res.data.result;
          this.total = res.data.count;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },

    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.dataSize = pageSize;
      this.getDoctorList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.pageIndex = page;
      this.getDoctorList();
    },

    delete_patient_ids() {

    },

    onEditMoneyPatient(row) {
      console.log(' 修改时打印的数据');
      console.log(row);
    },

    // eslint-disable-next-line no-unused-vars
    deletePatientbyid(fid) {

    },
  },
  mounted() {

  },
  create() {

  },
};
