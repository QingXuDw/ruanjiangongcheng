<template>
  <div>
    <h3>借贷信息</h3>
    <el-form class="col-height" :model="this.detail" label-width="150px">
      <el-form-item label="金额:">
        <el-input
          v-model="this.detail.amount"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="申请时间:">
        <el-input
          v-model="this.detail.applyTime"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="通过时间:">
        <el-input
          v-model="this.detail.approveTime"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="抵押资产:">
        <el-input
          v-model="this.detail.asset"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="担保信息:">
        <el-input
          v-model="this.detail.guarantee"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="月利率:">
        <el-input
          v-model="this.detail.rate"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="还款期限(月):">
        <el-input
          v-model="this.detail.repayMonth"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="还款时间:">
        <el-input
          v-model="this.detail.repayTime"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-input
          v-model="this.status_name"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    detail: {},
  },
  computed: {
    status_name: function () {
      return this.statusToStr(this.detail.status);
    },
  },
  methods: {
    statusToStr(status_int) {
      switch (status_int) {
        case 0:
          return "待审核";
          break;
        case 1:
          return "已通过";
          break;
        case 2:
          return "未通过";
          break;
        default:
          return "未定义";
          break;
      }
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