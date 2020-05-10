
export default {
// isupdShow  updialogRow
  name: 'fangupdate',
  props: {
    isupdShow: Boolean,
    dialogupdRow: Object,
  },
  data() {
    return {
      update_fang: {
        fid: this.dialogupdRow.fid,
        funmber: this.dialogupdRow.fnumber, // 房间编号
        cid: this.dialogupdRow.fcid, // 房间类型
        price: this.dialogupdRow.fprice, // 住宿单价
        // 房间设备
        network: false, // 网络
        Computer: false, // 电脑
        Desk: false, // 书桌
        television: false, // 电视
        value_start: this.dialogupdRow.fstate, // 房间状态
        equip: [],
        checkList: this.dialogupdRow.fequipment.split(','),
      },
      options_cat: [],
      options_start: [{
        value_start: 0,
        label_start: '空闲',
      }, {
        value_start: 1,
        label_start: '入住',
      }],
      isupVisible: this.isupdShow,
      rules: {// price check_funmber
        checkList: [
          { type: 'array', required: true, message: '请至少选择一个房间设备', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    closeupdDialog() {
      // 这里 对应 @closeupdDialog

      this.$emit('closeupdDialog');
    },
    console_log_updialogRow() {
      const updialog = this.dialogupdRow;
      console.log('dialogupdRow fangupdate = = =');
      console.log(updialog);
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
    update_fang_Room(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.update_fang_update();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    update_fang_update() {
      const feq = this.update_fang.checkList;
      let fequi = '';
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < feq.length; i++) {
        fequi += `${feq[i]},`;
      }
      const fequis = fequi.substring(0, fequi.length - 1);
      const fang = {
        fid: this.dialogupdRow.fid,
        fnumber: this.dialogupdRow.fnumber, // 房间编号
        fcid: this.dialogupdRow.fcid, // 房间类型
        fprice: this.dialogupdRow.fprice, // 住宿单价
        fstate: this.dialogupdRow.fstate, // 房间状态
        fequipment: fequis,
      };

      const url = `${this.HOME}/accom_fang/update_fang_room`;
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
          if (res.data.st === 3) {
            //                     isupdateOK
            if (res.data.flag === 'isupdateOK') {
              this.update_fang_message();
            } else {
              this.$message.error(res.data.flag);
            }
          }
        } else {
          this.$message.error('服务器出现异常请稍后再试！');
        }
      });
    },
    update_fang_message() {
      this.$message({
        // eslint-disable-next-line no-undef
        message: '修改成功',
        type: 'success',
      });
      this.$emit('update_getFang_RoomList');
      this.closeupdDialog();
    },
  },
  mounted() {
    this.console_log_updialogRow();
    this.sel_fang_Room_category();
  },
};
