

export default {
  name: 'houselist',
  props: {
    isaddShow: Boolean,
    dialogRow: Object,
  },
  components: {

  },
  data() {
    // eslint-disable-next-line camelcase,consistent-return
    const check_rhnumber = (rule, value, callback) => {
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
    const check_rhprice = (rule, value, callback) => {
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
      isVisible: this.isaddShow,
      add_house: {
        rhnumber: '', // 住宿编号
        rhmode_id: '', // 方式
        rhprice: '', // 租金
        apartment_id: '',
        aid: '', // 户型
        rhorientation: 1,
        rhreleasetime: '',
        prid: '', // 所在省
        ciid: '',
        arid: '',
        rhdetailedaddress: '',
      },
      options_house_rhmode: [{
        rhmode_id: '0',
        rhmode_name: '整租',
      }, {
        rhmode_id: '1',
        rhmode_name: '合租',
      }],
      options_house_apartment: [],
      options_house_rhprovinceid: [], // 所在省的内容的值 rhprice
      options_house_rhciid: [],
      options_house_rharid: [],
      rules: {
        rhnumber: [
          { validator: check_rhnumber, trigger: 'blur' },
        ],
        rhmode_id: [ // 住宿编号
          { required: true, message: '请选择方式', trigger: 'change' },
        ],
        rhprice: [ // 租金
          { validator: check_rhprice, trigger: 'blur' },
        ],
        aid: [ // 户型
          { required: true, message: '请选择户型', trigger: 'change' },
        ],
        rhreleasetime: [ // 发布时间
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
        rhdetailedaddress: [ // 详细地址
          { required: true, message: '请选择详细地址', trigger: 'change' },
        ],
      },
    };
  },
  watch: {

  },
  methods: {
    closeaddDialog() {
      this.$emit('closeaddDialog');
    },
    /* 查询户型 options_house_apartment */
    sel_house_apartment() {
      const url = `${this.HOME}/apartment/selApartmentAll`;
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
          this.options_house_apartment = res.data;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    sel_house_Rhprovinceid_category() {
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
          this.options_house_rhprovinceid = res.data;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    selCityByProvince_code_add() {
      // eslint-disable-next-line no-unused-vars
      const prid = this.add_house.prid;
      // eslint-disable-next-line no-empty,eqeqeq
      if (prid != null && prid != '' && prid != undefined) {
        this.update_options_house_rhciid();
        this.selCiryBy_Province_code(prid);
      }
    },

    update_options_house_rhciid() {
      this.add_house.ciid = '';
      this.options_house_rhciid = null;
    },

    // eslint-disable-next-line no-unused-vars
    selCiryBy_Province_code(prid) {
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
          console.log(' res.data.result = addhouse.dialog 所在市 = = = ');
          console.log(res);
          this.options_house_rhciid = res.data.result;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    selAreaByCity_code_add() {
      // eslint-disable-next-line no-unused-vars
      const ciid = this.add_house.ciid;
      // eslint-disable-next-line eqeqeq,no-empty
      if (ciid != null && ciid != '' && ciid != undefined) {
        this.update_options_house_rharid_val();
        this.selAreaByCityCode(ciid);
      }
    },
    update_options_house_rharid_val() {
      this.add_house.arid = '';
      this.options_house_rharid = null;
    },
    // eslint-disable-next-line no-unused-vars
    selAreaByCityCode(ciid) {
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
          this.options_house_rharid = res.data.result;
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    return_add_house() {
      // eslint-disable-next-line no-unused-vars
      const Rentinghouse = {
        rhnumber: this.add_house.rhnumber, // 住宿编号
        rhmode: this.add_house.rhmode_id, // 方式(0:整租,1:合租)
        rhprice: this.add_house.rhprice, // 租金
        rhaid: this.add_house.aid, // 户型
        rhorientation: this.add_house.rhorientation, // 朝向
        rhreleasetime: this.add_house.rhreleasetime,
        rhprovinceid: this.add_house.prid, // 所在省
        rhcityid: this.add_house.ciid,
        rhareaid: this.add_house.arid,
        rhdetailedaddress: this.add_house.rhdetailedaddress,
      };
      return Rentinghouse;
    },
    // eslint-disable-next-line no-unused-vars
    add_Renting_house_button(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* alert('submit!'); */
          // eslint-disable-next-line no-unused-vars
          const Rentinghouse = this.return_add_house();
          this.add_Renting_house(Rentinghouse);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    add_Renting_house(Rentinghouse) {
      const url = `${this.HOME}/corerentinghouse/coreaddhouse`;
      this.axios.post(url, Rentinghouse, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);

        if (res.data != null) {
          console.log(' res.data.result = addhouse.dialog= = ');
          console.log(res);
          if (res.data.st === 1) {
            if (res.data.flag === 'isAddHouseOk') {
              this.add_house_message();
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
    add_house_message() {
      this.$message({
        // eslint-disable-next-line no-undef
        message: '添加成功',
        type: 'success',
      });
      this.$emit('get_queryData_Rentinghouseist');
      this.closeaddDialog();
    },
  },
  mounted() {
    this.sel_house_apartment();
    this.sel_house_Rhprovinceid_category();
  },
  create() {

  },
};

