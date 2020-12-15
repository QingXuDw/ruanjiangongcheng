<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="name"
      ><el-input v-model="ruleForm.username"></el-input
    ></el-form-item>
    <el-form-item label="密码" prop="pass"
      ><el-input
        type="password"
        v-model="ruleForm.password"
        auto-complete="off"
      ></el-input
    ></el-form-item>
    <el-form-item label="确认密码" prop="checkPass"
      ><el-input
        type="password"
        v-model="ruleForm.checkPass"
        auto-complete="off"
      ></el-input
    ></el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      show:true,
      rules: {
        username: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message:"请输入您的密码", trigger: "blur" },
          {
            min: 6,
            max: 50,
            message: "密码必须在6-50个字符之间",
            trigger: "blur",
          },
        ],
        checkPass: [
          { required: true, message:"请确认您的密码", trigger: "blur" },
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
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
      });
      if (this.ruleForm.password != this.ruleForm.checkPass) {
        this.$message.error("两次密码输入不一致，请重新输入");
        this.ruleForm.password = "";
        this.ruleFoem.checkPass = "";
        return;
      }
      //发送请求
      let response = await this.$axios.post(
        this.$api.userRegister,
        {
          password: this.$md5(this.ruleForm.password),
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