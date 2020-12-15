<template>
  <body id="poster">
    <el-container>
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        class="change-container"
        label-position="left"
        label-width="0px"
      >
        <h3 class="change_title">注册</h3>

        <el-form-item prop="text">
          <el-input
            v-model="registerForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="registerForm.checkPass"
            auto-complete="off"
            placeholder="确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%; background: #505458; border: none"
            v-on:click="submitForm()"
            >注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </body>
</template>
<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      show: true,
      registerFormRules: {
        username: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
          {
            min: 6,
            max: 50,
            message: "密码必须在6-50个字符之间",
            trigger: "blur",
          },
        ],
        checkPass: [
          { required: true, message: "请确认您的密码", trigger: "blur" },
          {
            min: 6,
            max: 50,
            message: "密码必须在6-50个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async submitForm() {
      //校验表单是否合理
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) return;
      });
      if (this.registerForm.password != this.registerForm.checkPass) {
        this.$message.error("两次密码输入不一致，请重新输入");
        this.registerForm.password = "";
        this.registerForm.checkPass = "";
        return;
      }
      //发送请求
      let response = await this.$axios.post(this.$api.userRegister, {
        username: this.registerForm.username,
        password: this.$md5(this.registerForm.password),
      });
      if (response.data.state == false) {
        this.$message.error(response.data.msg);
      } else {
        this.$message.success(response.data.msg);
        window.sessionStorage.clear();
        this.$router.push("/login");
      }
    },
  },
};
</script>
<style scoped>
#poster {
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  color: rgba(255, 255, 255, 0.65);
  background-color: #24292e;
  background-image: url(../../assets/img/star-bg.svg),
    linear-gradient(#191c20, #24292e 15%);
  background-repeat: repeat-x;
  background-position: center 0, 0 0, 0 0;
}

.change-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 150px auto;
  width: 300px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
}

.change_title {
  letter-spacing: 10px;
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>