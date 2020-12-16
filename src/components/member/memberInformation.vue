<template>
  <div>
    <h3>公司信息</h3>
    <el-form class="col-height" :model="this.detail" label-width="150px">
      <el-form-item label="公司名称:">
        <el-input
          v-model="this.detail.companyName"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址:">
        <el-input
          v-model="this.detail.address"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="资产报告:">
        <quill-view-pop :content="this.detail.asset"></quill-view-pop>
      </el-form-item>
      <el-form-item label="信用等级:">
        <el-rate
          v-model="this.detail.credit_rate"
          :disabled="this.disableRate"
          show-score
          text-color="#ff9900"
          score-template="{value}"
        >
        </el-rate>
      </el-form-item>
      <el-form-item label="信用积分:">
        <el-input
          v-model="this.detail.creditScore"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="开户银行:">
        <el-input
          v-model="this.detail.depositBank"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="开户银行卡号:">
        <el-input
          v-model="this.detail.depositBankCardNumber"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司描述:">
        <memberquill-view-pop :content="this.detail.description"></memberquill-view-pop>
      </el-form-item>
      <el-form-item label="电邮地址:">
        <el-input
          v-model="this.detail.email"
          style="width: 82%"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="电话:">
        <el-input
          v-model="this.detail.phone"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="logo:">
        <el-avatar
          shape="square"
          :size="200"
          fit="cover"
          :src="this.detail.logo"
        ></el-avatar>
      </el-form-item>
      <el-form-item label="在职人数:">
        <el-input
          v-model="this.detail.memberNumber"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司网址">
        <el-input
          v-model="this.detail.website"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeInfo()">修改信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import quillViewPop from "./memberquillViewPop.vue";
export default {
  components: { quillViewPop },
  data() {
    return {};
  },
  props: {
    id: "",
    detail: {},
  },
  create() {},
  methods: {
    async getmemberInfo() {
      let response = await this.$axios
        .post(this.$api.memberGetCompanyInfo, {
          Id: this.id,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.detail = response.data;
    },
    async changeInfo() {
      await this.$router.push({ path: "/memberchange" }).catch((err) => {});
    },
  },
};
</script>
<style scoped>
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
