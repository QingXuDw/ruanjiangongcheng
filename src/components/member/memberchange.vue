<template>
  <div>
    <div>
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purole-dark">修改企业信息</div></el-col
        >
      </el-row>
    </div>
    <div class="demo-input-suffix">
      <p>公司地址</p>
      <el-input placeholder="请输入内容" v-model="form.address"> </el-input>
      <p>公司资产</p>
      <el-input placeholder="请输入内容" v-model="form.asset"> </el-input>
      <p>公司名称</p>
      <el-input placeholder="请输入内容" v-model="form.companyName"> </el-input>
      <p>开户银行</p>
      <el-input placeholder="请输入内容" v-model="form.depositBank"> </el-input>
      <p>银行卡号</p>
      <el-input placeholder="请输入内容" v-model="form.depositBankCardNumber">
      </el-input>
      <p>公司简介</p>
      <el-input placeholder="请输入内容" v-model="form.description"> </el-input>
      <p>公司邮箱</p>
      <el-input placeholder="请输入内容" v-model="form.email"> </el-input>
      <p>公司编号</p>
      <el-input placeholder="请输入内容" v-model="form.memberNumber">
      </el-input>
      <P>公司电话</P>
      <el-input placeholder="请输入内容" v-model="form.phone"> </el-input>
      <p>公司网址</p>
      <el-input placeholder="请输入内容" v-model="form.website"> </el-input>
      <el-button type="primary" @click="onSubmit()">提交</el-button>
      <el-button @click="onCancel()">放弃</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        address: "",
        asset: "",
        companyName: "",
        depositBank: "",
        depositBankCardNumber: "",
        description: "",
        email: "",
        memberNumber: 0,
        phone: "",
        website: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      this.$message("提交成功，等待审核!");
      let response = await this.$axios
        .post(this.$api.companyChangeCompanyInfo, {
          address: this.form.address,
          companyName: this.form.companyName,
          asset: this.form.asset,
          depositBank: this.form.depositBank,
          depositBankCardNumber: this.form.depositBankCardNumber,
          description: this.form.description,
          email: this.form.email,
          memberNumber: this.form.memberNumber,
          phone: this.form.phone,
          website: this.form.website,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
    },
    async onCancel() {
      this.$message({
        message: "取消修改成功!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.bg-purple-dark {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.demo-input-suffix {
  background: #cfb53b;
}
</style>