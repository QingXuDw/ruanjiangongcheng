<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="loanform"
      label-width="120px"
      :rules="loanformRules"
    >
      <el-form-item label="借款数额">
        <el-input v-model="loanform.amount"></el-input>
      </el-form-item>
      <el-form-item label="抵押资产">
        <el-input v-model="loanform.asset"></el-input>
      </el-form-item>
      <el-form-item label="预计还款时间">
        <el-input v-model="loanform.repayTime"></el-input>
      </el-form-item>
      <el-form-item label="担保人信息描述">
        <el-input v-model="loanform.guarantee" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="利率">
        <el-input v-model="loanform.rate"></el-input>
      </el-form-item>
      <el-form-item label="担保人信息">
        <el-upload
           drag
           action=""
           multiple>
           <i class="el-icon-upload"></i>
           <div class="el-upload_text">将文件拖到此处，或<em>点击上传</em></div>
           <div class="el-upload_tip" slot="tip">只能上传不超过200MB的文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="抵押资产信息">
        <el-upload
           drag
           action=""
           multiple>
           <i class="el-icon-upload"></i>
           <div class="el-uoload_text">将文件拖到此处，或<em>点击上传</em></div>
           <div class="el-upload_tip" slot="tip">只能上传不超过200MB的文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel()">放弃</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loanform: {
        amount: 0,
        asset: "",
        guarantee: "",
        repayTime: 0,
        rate: 0,
      },
      show: true,
      loanformRules: {
        amount: [
          { required: true, message: "请输入借款数量", trigger: "blur" },
        ],
        asset: [
          { required: true, message: "请输入公司总资产", trigger: "blur" },
        ],
        repayTime: [
          { required: true, message: "请选择还款日期", trigger: "blur" },
        ],
        guarantee: [
          { required: true, message: "请输入担保人信息", trigger: "blur" },
        ],
        rate: [{ required: true, message: "请输入利率", trigger: "blur" }],
      },
    };
  },
  methods: {
    async onSubmit() {
      this.$message("提交成功，等待审核!");
      let response = await this.$axios
        .post(this.$api.companycreateLoan, {
          amount: this.loanform.amount,
          asset: this.loanform.asset,
          guaratee: this.loanform.guaratee,
          repayTime: this.loanform.repayTime,
          rate: this.loanform.rate*100,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
    },
    async onCancel() {
      this.$message({
        message: "放弃借款成功!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

