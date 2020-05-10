

export default {
  name: 'updatehouse',
  props: {
    isupdateShow: Boolean,
    dialogupdateRow: Object,
  },
  components: {

  },
  data() {
    // eslint-disable-next-line camelcase,consistent-return
    const check_rhnumber_update = (rule, value, callback) => {
      if (!value) {
        // eslint-disable-next-line no-undef
        return callback(new Error('住宿编号不能为空'));
      }
      // eslint-disable-next-line camelcase
      const val_a = value.substring(0, 1);
      if (!(/^[A-Z][A-z0-9]*$/).test(val_a)) {
        // eslint-disable-next-line no-undef
        callback(new Error('房间编号必修以字母开头并且大写'));
      }

      const val = value.substring(1);
      console.log(` val = = =${val}`);

      // eslint-disable-next-line eqeqeq
      if (val.length === 0) {
        callback(new Error('请输入数字编号'));
      } else {
        const reg = /^[0-9]*$/;

        // eslint-disable-next-line camelcase

        if (reg.test(val)) {
          // eslint-disable-next-line eqeqeq
          if (val.length != 3) {
            callback(new Error('只能输入三位数字'));
          } else {
            callback();
          }
        } else {
          callback(new Error('请输入纯数字'));
        }
      }
    };
    // eslint-disable-next-line camelcase,consistent-return
    const check_rhprice_update = (rule, value, callback) => {
      if (!value) {
        // eslint-disable-next-line no-undef
        return callback(new Error('租金不能为空'));
      }
      const reg = /^[0-9]*$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('租金必须为纯数字'));
      }
    };

    return {
      isupVisible: this.isupdateShow,
      update_house: {
        update_house_rhid: this.dialogupdateRow.rhid, // 住宿ID
        update_house_updaterrhnumber: this.dialogupdateRow.rhnumber, // 修改后的住宿编号
        update_house_rhnumber: this.dialogupdateRow.rhnumber, // 住宿编号
        update_house_rhmode_id: this.dialogupdateRow.rhmode, // 方式
        update_house_rhprice: this.dialogupdateRow.rhprice, // 租金
        apartment_id: '',
        aid: this.dialogupdateRow.aid, // 户型
        update_house_rhorientation: this.dialogupdateRow.assation,
        update_house_rhreleasetime: this.dialogupdateRow.rhreleasetime,
        prid: this.dialogupdateRow.prid, // 所在省
        ciid: this.dialogupdateRow.ciid,
        arid: this.dialogupdateRow.arid,
        update_house_rhdetailedaddress: this.dialogupdateRow.rhdetailedaddress,
      },
      update_house_options_house_rhmode: [{
        update_house_rhmode_id: 0,
        update_house_rhmode_name: '整租',
      }, {
        update_house_rhmode_id: 1,
        update_house_rhmode_name: '合租',
      }],
      update_house_options_house_apartment: [],
      update_house_options_house_rhprovinceid: [], // 所在省的内容的值 rhprice
      update_house_options_house_rhciid: [],
      update_house_options_house_rharid: [],
      rules: {
        update_house_updaterrhnumber: [
          { validator: check_rhnumber_update, trigger: 'blur' },
        ],
        update_house_rhmode_id: [ // 住宿编号
          { required: true, message: '请选择方式', trigger: 'change' },
        ],
        update_house_rhprice: [ // 租金
          { validator: check_rhprice_update, trigger: 'blur' },
        ],
        aid: [ // 户型
          { required: true, message: '请选择户型', trigger: 'change' },
        ],
        update_house_rhreleasetime: [ // 发布时间
          { required: true, message: '请选择发布时间', trigger: 'change' },
        ],
        prid: [ // 所在省
          { required: true, message: '请选择所在省', trigger: 'change' },
        ],
        ciid: [ // 所在省
          { required: true, message: '请选择所在市', trigger: 'change' },
        ],
        arid: [ // 所在省
          { required: true, message: '请选择所在区', trigger: 'change' },
        ],
        update_house_rhdetailedaddress: [ // 详细地址
          { required: true, message: '请选择详细地址', trigger: 'change' },
        ],
      },
    };
  },
  watch: {

  },
  methods: {
    closeupdDialog() {
      this.$emit('closeupdDialog');
    },
    console_log_row() {
      console.log('住宿编号 = = = ');
      console.log(this.dialogupdateRow.rhnumber);
    },
    /* 查询户型 options_house_apartment */
    sel_update_house_apartment() {
      const url = `${this.HOME}/apartment/selApartmentAll`;
      this.axios.post(url, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);

        if (res.data != null) {
          console.log(' res.data.result = updatehouse.dialog 所在省 = = = ');
          console.log(res);
          this.update_house_options_house_apartment = res.data;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    set_house_assignment() {
      // eslint-disable-next-line no-unused-vars
      const rhor = this.dialogupdateRow.rhorientation;
    },
    sel_update_house_Rhprovinceid_category() {
      const url = `${this.HOME}/province/selProvinceAll`;
      this.axios.post(url, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);

        if (res.data != null) {
          console.log(' res.data.result = addhouse.dialog 所在省 = = = ');
          console.log(res);
          this.update_house_options_house_rhprovinceid = res.data;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },

    sel_updaet_CityByProvince_code_update() {
      const prid = this.dialogupdateRow.prid;
      this.selCiryBy_update_Province_code(prid);
    },
    update_options_update_house_rhciid() {
      this.update_house.ciid = '';
      this.update_house_options_house_rhciid = null;
    },
    sel_CityByProvince_code_update() {
      /* 所在省的change方法 */
      const prid = this.update_house.prid;
      // eslint-disable-next-line no-empty,eqeqeq
      if (prid != null && prid != '' && prid != undefined) {
        this.update_options_update_house_rhciid();
        this.selCiryBy_update_Province_code(prid);
      }
    },
    selCiryBy_update_Province_code(prid) {
      // eslint-disable-next-line no-unused-vars
      const Province = {
        prid,
      };
      const url = `${this.HOME}/corecity/coreselCityByProvinceid`;
      this.axios.post(url, Province, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);

        if (res.data != null) {
          console.log(' res.data.result = updatehouse.dialog 所在市 = = = ');
          console.log(res);
          this.update_house_options_house_rhciid = res.data.result;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    selAreaByCity_code_update() {
      // eslint-disable-next-line no-unused-vars
      const ciid = this.dialogupdateRow.ciid;
      this.selAreaByCityCode_update(ciid);
    },
    sel_update_AreaByCity_code_update() {
      // eslint-disable-next-line no-unused-vars
      const ciid = this.update_house.ciid;
      // eslint-disable-next-line eqeqeq,no-empty
      if (ciid != null && ciid != '' && ciid != undefined) {
        this.update_options_house_rharid_val();
        this.selAreaByCityCode_update(ciid);
      }
    },
    update_options_house_rharid_val() {
      this.update_house.arid = '';
      this.update_house_options_house_rharid = null;
    },

    selAreaByCityCode_update(ciid) {
      const Province = {
        ciid,
      };
      const url = `${this.HOME}/corearea/coreselAreaByProvinceid`;
      this.axios.post(url, Province, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);

        if (res.data != null) {
          console.log(' res.data.result = addhouse.dialog 所在区 = = = ');
          console.log(res);
          this.update_house_options_house_rharid = res.data.result;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    return_update_house() {
      const Rentinghouse = {
        rhid: this.update_house.update_house_rhid, // 住宿ID
        rhnumber: this.update_house.update_house_rhnumber, // 住宿编号(修改前)
        updaterrhnumber: this.update_house.update_house_updaterrhnumber, // 修改后的住宿编号
        rhmode: this.update_house.update_house_rhmode_id, // 方式(0:整租,1:合租)
        rhprice: this.update_house.update_house_rhprice, // 租金
        rhaid: this.update_house.aid, // 户型
        rhorientation: this.update_house.update_house_rhorientation, // 朝向
        rhreleasetime: this.update_house.update_house_rhreleasetime,
        rhprovinceid: this.update_house.prid, // 所在省
        rhcityid: this.update_house.ciid,
        rhareaid: this.update_house.arid,
        rhdetailedaddress: this.update_house.update_house_rhdetailedaddress,
      };
      return Rentinghouse;
    },
    // eslint-disable-next-line no-unused-vars
    update_house_button(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          const Rentinghouse = this.return_update_house();
          this.update_Renting_house(Rentinghouse);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    update_Renting_house(Rentinghouse) {
      const url = `${this.HOME}/corerentinghouse/coreupdatehouse`;
      this.axios.post(url, Rentinghouse, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);

        if (res.data != null) {
          console.log(' res.data.result = updatehouse.dialog= = ');
          console.log(res);
          if (res.data.st === 3) {
            if (res.data.flag === 'isAddHouseOk') {
              this.update_house_message();
            } else {
              this.$message.error(res.data.flag);
            }
          } else {
            this.$message.error(res.data.flag);
          }
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    update_house_message() {
      this.$message({
        // eslint-disable-next-line no-undef
        message: '修改成功',
        type: 'success',
      });
      this.$emit('get_queryData_Rentinghouseist_update');
      this.closeupdDialog();
    },
  },
  mounted() {
    this.console_log_row();
    this.sel_update_house_apartment();
    this.sel_update_house_Rhprovinceid_category();
    this.sel_updaet_CityByProvince_code_update();
    this.selAreaByCity_code_update();
  },
  create() {
    /* this.sel_updaet_CityByProvince_code_update(); */
  },
};
