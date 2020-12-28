<template>
  <div>
    <div>
      <el-steps :active="1" :align-center="true">
        <el-step title="步骤 1" icon="el-icon-edit"></el-step>
        <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      </el-steps>
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purole-dark">创建公司</div></el-col
        >
      </el-row>
    </div>
    <div class="demo-input-suffix">
      <p>公司地址</p>
      <el-input placeholder="请输入内容" v-model="form.address"> </el-input>
      <p>公司资产</p>
      <quill-editor
        ref="myTextEditor"
        v-model="form.asset"
        :options="editorOption"
        style="height: 400px"
      ></quill-editor>
      <p style="margin-top: 50px">公司名称</p>
      <el-input placeholder="请输入内容" v-model="form.companyName"> </el-input>
      <p>开户银行</p>
      <el-input placeholder="请输入内容" v-model="form.depositBank"> </el-input>
      <p>银行卡号</p>
      <el-input placeholder="请输入内容" v-model="form.depositBankCardNumber">
      </el-input>
      <p>公司简介</p>
      <quill-editor
        ref="myTextEditor"
        v-model="form.description"
        :options="editorOption"
        style="height: 400px"
      ></quill-editor>
      <p style="margin-top: 50px">公司邮箱</p>
      <el-input placeholder="请输入内容" v-model="form.email"> </el-input>
      <p>成员数量</p>
      <el-input
        type="number"
        placeholder="请输入内容"
        v-model="form.memberNumber"
      >
      </el-input>
      <P>公司电话</P>
      <el-input placeholder="请输入内容" v-model="form.phone"> </el-input>
      <p>公司网址</p>
      <el-input placeholder="请输入内容" v-model="form.website"> </el-input>
      <el-button type="primary" @click="onSubmit()">下一步</el-button>
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
      fileList: [
        // {
        //   name: "",
        //   url: ""
        // }
      ],
      fileParam: "",
      editorOption: {
        placeholder: "编辑内容",
      },
    };
  },
  methods: {
    async onSubmit() {
      let response = await this.$axios
        .post(this.$api.companyCreateCompany, {
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
      this.$router.push("/companyLogo");
    },
    async onCancel() {
      this.$message({
        message: "取消创建成功!",
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
</style>