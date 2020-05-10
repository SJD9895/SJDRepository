<template>
  <div class="div_login">
    <div class="note" :style="note">
      <el-row type="flex" justify="center" class="div_el_row">
        <div id="login-form">
          <h2 class="login-form-title">机房报修管理系统</h2>
          <el-form ref="loginForm" label-width="150px" class="login-form-container"
                   :rules="rules" :model="loginInfo">
            <el-form-item label="管理员手机号:" prop="adminPhoneNum" class="">
              <el-input v-model="loginInfo.adminPhoneNum" placeholder="请输入管理员手机号"></el-input>
            </el-form-item>

            <el-form-item label="管理员密码:" prop="adminPassword" class="">
              <el-input v-model="loginInfo.adminPassword"  placeholder="请输入管理员密码"></el-input>
              <!--<el-input placeholder="请输入密码" v-model="input" show-password></el-input>-->
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
              <el-button @click="resetForm('loginForm')">清空</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginInfo: {
        adminPhoneNum: '',
        adminPassword: '',
      },
      note: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        // eslint-disable-next-line global-require
        backgroundImage: `url(${require('../../assets/login_sjd_fang_Room.png')})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      },
      rules: {
        adminPhoneNum: [
          { required: true, message: '请输入管理员手机号' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
        ],
        adminPassword: { required: true, message: '请输入管理员密码' },
      },
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    submitForm(formName) {
      /*      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          // alert(this.loginInfo.adminPhoneNum)
          // alert(this.loginInfo.adminPassword)
          var qs = require('qs')
          this.axios.post('/api/admin/login', qs.stringify({
            adminPhoneNum: this.loginInfo.adminPhoneNum,
            adminPassword: this.loginInfo.adminPassword
          }), {
            headers: {
              'Accept': '*!/!*'
            }
          }).then(function (res) {
            // console.log(res)
            if (res.data.status === 200) {
              this.$message({
                message: '登陆成功！',
                type: 'success'
              })
              this.$store.state.adminInfo = res.data.data.adminInfo
              this.$router.push({
                name: 'Home'
              })
            } else {
              this.$message({
                message: '登陆失败!输入的管理员手机号或密码有误。',
                type: 'warning'
              })
            }
          }.bind(this)).catch(function (error) {
            console.log('EXCEPTION' + error)
            this.$message.error('服务器出现问题，请稍后重试！')
          })
        } else {
          this.$message.error('请按照提示正确输入登陆信息！')
          return false
        }
      }) */
      this.$router.push({
        name: 'home_index',
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>

  #login-form {
    background: hsla(0, 0%, 100%, .3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7);
    z-index: 100;
    width: 600px;
    height: 400px;
    margin-top: 15%;
    border-radius: 20px;
  }

  .login-form-container {
    margin-top: 40px;
    margin-left: 40px;
    width: 400px;
    height: 400px;

  }

  .login-form-title {
    text-align: center;
    color: #606266;
    margin-top: 50px;
  }

  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: '';
  }
  .div_login{
    /*background-color: cornsilk;*/
  }
  .div_el_row{
    /*background-color: azure;*/
  }
</style>
