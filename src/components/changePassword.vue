<template>
  <body id="poster">
    <el-container>
      <el-form
        ref="changeFormRef"
        :model="changeForm"
        :rules="changeFormRules"
        class="change-container"
        label-position="left"
        label-width="0px"
      >
        <h3 class="change_title">修改密码</h3>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="changeForm.password_o"
            auto-complete="off"
            placeholder="原密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="changeForm.password_a"
            auto-complete="off"
            placeholder="新密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="changeForm.password_b"
            auto-complete="off"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>

        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%; background: #505458; border: none"
            v-on:click="change()"
            >修改密码
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
      //登录表单数据绑定
      changeForm: {
        password_o: "",
        password_a: "",
        password_b: "",
      },
      show: true,
      //表单的验证规则
      changeFormRules: {
        //    验证密码是否合法
        password_o: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 50,
            message: "密码必须在6-50个字符之间",
            trigger: "blur",
          },
        ],
        password_a: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 50,
            message: "密码必须在6-50个字符之间",
            trigger: "blur",
          },
        ],
        password_b: [
          { required: true, message: "请输入密码", trigger: "blur" },
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
  //回车登录操作
  created() {
    //创建后挂载
    let _this = this;
  },
  methods: {
    async change() {
      //校验表单是否合理
      this.$refs.changeFormRef.validate(async (valid) => {
        if (!valid) return;
      });
      if (this.changeForm.password_a == this.changeForm.password_o) {
        this.$message.error("原密码与新密码不能为同一个");
        this.changeForm.password_a = "";
        this.changeFoem.password_b = "";
        return;
      }
      if (this.changeForm.password_a != this.changeForm.password_b) {
        this.$message.error("两次密码输入不一致，请重新输入");
        this.changeForm.password_a = "";
        this.changeFoem.password_b = "";
        return;
      }
      //发送请求
      let response = await this.$axios.post(
        this.$api.changePassword,
        {
          prePassword: this.$md5(this.changeForm.password_o),
          newPassword: this.$md5(this.changeForm.password_a),
        }
      )
      if(response.data.state == false){
        this.$message.error(response.data.msg);
      }
      else{
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
  background-color: hsl(0, 0%, 100%);
  /* background-image: url(../assets/img/star-bg.svg),
    linear-gradient(#191c20, #24292e 15%); */
  background-repeat: repeat-x;
  background-position: center 0, 0 0, 0 0;
}

.change-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 150px 140px;
  width: 300px;
  padding: 35px 35px 15px 35px;
  background: rgb(253, 253, 253);
  border: 1px solid #eaeaea;
}

.change_title {
  letter-spacing: 10px;
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>