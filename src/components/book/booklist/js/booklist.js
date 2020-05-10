
import addbook from '../../addbook/vue/addbook.vue';

export default {
  components: {
    addbook,
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

      addbook: {
        show: false,
        addbookRow: {},
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
    Add_books() {
      this.addbook.show = true;
    },
    hideAddbookDialog() {
      this.addbook.show = false;
    },
    getFangList() {
      const tab = this.dataSize;
      console.log('tab = = =');
      console.log(tab);
      const url = `${this.HOME}/corebook/queryDataCoreBook`;
      const CoreSelBook = {

        minprice: this.fang_minprice,
        maxprice: this.fang_manprice,
        pageNumber: this.pageIndex,
        pageSize: this.dataSize,
      };

      this.axios.post(url, CoreSelBook, {
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
  },
  mounted() {

  },
  create() {

  },
};
