<template>
  <el-form :model="this.detailForm" label-width="150px">
    <el-form-item label="社团名称:">
      <el-input
        v-model="this.detailForm.clubName"
        readonly
        style="width: 82%"
      ></el-input>
    </el-form-item>
    <el-form-item label="赞助商:">
      <el-input
        v-model="this.detailForm.sponsor"
        readonly
        style="width: 82%"
      ></el-input>
    </el-form-item>
    <el-form-item label="赞助金额:">
      <el-input
        v-model="this.detailForm.amount"
        readonly
        style="width: 82%"
      ></el-input>
    </el-form-item>
    <el-form-item label="提交时间:">
      <el-date-picker
        type="date"
        v-model="this.detailForm.applyDate"
        style="width: 82%"
        readonly
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="审核状态:">
      <el-input
        v-model="this.detailForm.status_name"
        readonly
        style="width: 82%"
      ></el-input>
    </el-form-item>
    <el-form-item label="赞助商需求:">
      <el-input
        v-model="detailForm.requirement"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 8 }"
        readonly
        style="width: 82%"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="建议:">
      <el-input
        v-model="detailForm.suggestion"
        type="textarea"
        style="width: 82%"
        :autosize="{ minRows: 3, maxRows: 10 }"
        palceholder="请在此处输入您对这项赞助的建议"
        maxlength="2000"
        show-word-limit
      >
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      detailForm: {},
    };
  },

  created() {},
  mounted() {},
  methods: {
    getLoanDetail(id) {},
  },
};
</script>

<style scoped>
</style>