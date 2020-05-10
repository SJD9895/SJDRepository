
let paramfile;

export default {

  name: 'addbook',
  props: {
    isShow: Boolean,
    addbookRow: Object
  },
  data () {
    return {
      add_book: {
        bookname: '',//书籍姓名
        bookauthor: '',//书籍价格
        bookprice: '',//书籍价格
        catid: '',
        bookupperShelftime: '',
        fileList: [],
        logo: ''
      },
      options_cat: [],
      isVisible: this.isShow,
      auto_upload: false,
      rules: {// price check_funmber

      }
    }
  },
  methods: {

    onBeforeUploadImage(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
      }
      return isIMAGE && isLt1M
    },
    setbookfuzhi () {
      let bookname = this.add_book.bookname;
      let bookauthor = this.add_book.bookauthor;
      let bookprice = this.add_book.bookprice;
      let catid = this.add_book.catid;
      let bookupperShelftime = this.add_book.bookupperShelftime;

      // eslint-disable-next-line no-unused-vars
      let addbook = {
        bookname:bookname,
        bookauthor:bookauthor,
        bookprice:bookprice,
        catid:catid,
        bookupperShelftime:bookupperShelftime,
      };
      return addbook;
    },
    UploadImage(param){
      let addbook = this.setbookfuzhi();
      const formData = new FormData();
      formData.append('file', param.file);
      console.log("44 行 formData = = = ");

      console.log(formData);
      var url = this.HOME + '/corebook/addbookpic';
      this.axios.post(url, formData, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        console.log(res);
        if (res.data != null) {
          console.log(' res.data.result = addfang.dialog= = ');
          console.log(res);
          if (res.data.st === 1) {
            if (res.data.flag === 'isAddOK') {
              this.add_book_message()
            } else {
              this.$message.error(res.data.flag)
            }
          }
        } else {
          this.$message.error('服务器出现异常请稍后再试！')
        }
      }.bind(this));

      var url2 = this.HOME + '/corebook/addbook';

      this.axios.post(url2, addbook, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        console.log(res);
        if (res.data != null) {
          console.log(' res.data.result = addfang.dialog= = ');
          console.log(res);
          if (res.data.st === 1) {
            if (res.data.flag === 'isAddOK') {
              this.add_book_message()
            } else {
              this.$message.error(res.data.flag)
            }
          }
        } else {
          this.$message.error('服务器出现异常请稍后再试！')
        }
      }.bind(this))
    },
    fileChange(file){
      this.$refs.upload.clearFiles() //清除文件对象
      this.logo = file.raw // 取出上传文件的对象，在其它地方也可以使用
      this.add_book.fileList = [{name: file.name, url: file.url}] // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
      return this.add_book.fileList;
    },
    closeDialog () {
      this.$emit('closeDialog')
    },
    handleRemove(file, fileList) {
      console.log("file, fileList 中的 值是");
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log("file = = =");
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    sel_book_Room_category () {
      var url = this.HOME + '/core_category/selCategoryAll';
      this.axios.post(url, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        console.log(res)

        if (res.data != null) {
          console.log(' res.data.result = addfang.dialog= = ');
          console.log(res)
          this.options_cat = res.data
        } else {
          this.$message.error('服务器出现异常请稍后再试！')
        }
      }.bind(this))
    },
    add_manage_books (formName) {
      this.addbookManage();
    },
    addbookManage () {
      const formData = new FormData();
      console.log(" addbookManage === > formData ");
      console.log(formData);
      let bookname = this.add_book.bookname;
      let bookauthor = this.add_book.bookauthor;
      let bookprice = this.add_book.bookprice;
      let catid = this.add_book.catid;
      let bookupperShelftime = this.add_book.bookupperShelftime;

      // eslint-disable-next-line no-unused-vars
      let addbook = {
        bookname:bookname,
        bookauthor:bookauthor,
        bookprice:bookprice,
        catid:catid,
        bookupperShelftime:bookupperShelftime,

      };
      console.log("添加书籍 = = =");
      console.log(addbook);
      var url = this.HOME + '/corebook/addbook';
      this.$refs.upload.submit();
      console.log(" 执行到 this.$refs.upload.submit();");
      /* 由于是文件上传所以 headers 设置 multipart/form-data */
      /*this.axios.post(url, addbook, {
        headers: {
          'Accept': '*!/!*',
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        console.log(res)
        if (res.data != null) {
          console.log(' res.data.result = addfang.dialog= = ');
          console.log(res)
          if (res.data.st === 1) {
            if (res.data.flag === 'isAddOK') {
              this.add_book_message()
            } else {
              this.$message.error(res.data.flag)
            }
          }
        } else {
          this.$message.error('服务器出现异常请稍后再试！')
        }
      }.bind(this))*/
    },
    add_book_message () {
      this.$message({
        // eslint-disable-next-line no-undef
        message: '添加成功',
        type: 'success'
      })
      this.$emit('getFang_RoomList')
      this.closeDialog()
    }
  },
  mounted () {
    this.sel_book_Room_category()
  }
}
