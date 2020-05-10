

export default {

  name: 'adddoctor',
  props: {
    adddoctor_show: Boolean,
    adddoctor_dialogRow: Object,
  },
  data() {
    // eslint-disable-next-line no-unused-vars,camelcase,consistent-return
    const check_funmber = (rule, value, callback) => {
      if (!value) {
        // eslint-disable-next-line no-undef
        return callback(new Error('房间编号不能为空'));
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

      /* //a变量你就自己获取，我这儿为你方便你理解我就直接写上了
var a = 'Ajjfioewjfoieji';
if(!(/^[A-Z][A-z0-9]*$/).test(a)){
    alert('请首字母大写');
} */
    };

    return {
      add_fang: {
        funmber: '', // 房间编号
        cid: '', // 房间类型
        price: null, // 住宿单价
        // 房间设备
        network: false, // 网络
        Computer: false, // 电脑
        Desk: false, // 书桌
        television: false, // 电视
        value_start: '0', // 房间状态
        equip: [],
        checkList: [],
      },
      options_cat: [],
      options_start: [{
        value_start: '0',
        label_start: '空闲',
      }, {
        value_start: '1',
        label_start: '入住',
      }],
      add_doctor_isVisible: this.adddoctor_show,
      rules: {// price check_funmber
        checkList: [
          { type: 'array', required: true, message: '请至少选择一个房间设备', trigger: 'change' },
        ],
        cid: [
          { required: true, message: '请选择房间类型', trigger: 'change' },
        ],
        price: [
          { required: true, message: '请选择房间类型', trigger: 'change' },
        ],
        funmber: [
          { validator: check_funmber, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    closeadd_doctorDialog() {
      this.$emit('closeadd_doctorDialog');
    },
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
    Change_set_price(cid) {
      console.log('cid = = =');
      console.log(cid);
      if (cid === 4) {
        this.add_fang.price = 100;
      } else if (cid === 5) {
        this.add_fang.price = 80;
      } else {
        this.add_fang.price = 150;
      }
    },
    add_fang_Room(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* alert('submit!') */
          this.sel_fangRoom_category();
          this.addfangRoom();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    sel_fangRoom_category() {
      // eslint-disable-next-line no-unused-expressions
      const list = this.add_fang.checkList;
      console.log('list = = =');
      console.log(list);
    },
    addfangRoom() {
      const fnumber = this.add_fang.funmber; // 房间编号
      const cid = this.add_fang.cid; // 房间类型
      const price = this.add_fang.price; // 住宿单价
      const start = this.add_fang.value_start; // 房间状态
      const checkList = this.add_fang.checkList; // 房间设备
      console.log(' 房间设备是 = = = ');
      console.log(checkList);
      /*
  * private Integer fid;// 主键
    private String fnumber;// 房间编号
    private Integer fcid;// 房建类型（对应房间类型表中的主键）
    private Double fprice;// 住宿单价
    private String fequipment;// 房间设备
    private Integer fstate;// 房间状态 0:空闲 1:入住
      */
      // eslint-disable-next-line no-unused-vars
      let eq = '';
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < checkList.length; i++) {
        eq += `${checkList[i]},`;
      }
      const eqs = eq.substring(0, eq.length - 1);

      // eslint-disable-next-line no-unused-vars
      const fang = {
        fnumber,
        fcid: cid,
        fprice: price,
        fequipment: eqs,
        fstate: start,
      };
      const url = `${this.HOME}/accom_fang/addfang_room`;
      this.axios.post(url, fang, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);
        if (res.data != null) {
          console.log(' res.data.result = addfang.dialog= = ');
          console.log(res);
          if (res.data.st === 1) {
            if (res.data.flag === 'isAddOK') {
              this.add_fang_message();
            } else {
              console.log(`res.data.flag = = = ${res.data.flag}`);
              // this.$message.error(res.data.flag);
              this.$message({
                showClose: true,
                message: res.data.flag,
                type: 'error',
              });
            }
          } else {
            this.$message.error(res.data.flag);
          }
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    add_fang_message() {
      this.$message({
        // eslint-disable-next-line no-undef
        showClose: true,
        message: '添加成功',
        type: 'success',
      });
      this.$emit('getFang_RoomList');
      this.closeadd_doctorDialog();
    },
  },
  mounted() {
    // this.sel_fang_Room_category();
  },
};
