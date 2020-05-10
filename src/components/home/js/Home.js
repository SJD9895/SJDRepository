// eslint-disable-next-line no-unused-vars
import fa from 'element-ui/src/locale/lang/fa';


export default {
  name: 'Home.vue',
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleCollapse() {
      console.log(123456789);

      this.isCollapse = !this.isCollapse;
    },
    isCollapseBoolean() {
      // isCollapse
      if (this.isCollapse === true) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
    },
  },

};

