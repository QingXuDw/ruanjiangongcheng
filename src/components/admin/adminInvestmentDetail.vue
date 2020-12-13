<template>
  <el-dialog
    title="公司详情"
    :visible.sync="detailDialogVisible"
    width="60%"
    center
  >
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
    <span slot="footer" class="dialog-footer">
      <!-- 取消按钮 -->
      <el-button @click="closeReplyDialog()">取 消</el-button>
      <!-- 通过按钮 -->
      <el-button
        v-if="replyForm.status_name == '待审核'"
        type="success"
        @click="updateStatusAndRefresh(replyForm.sponsorshipId, 1, 1)"
        icon="el-icon-check"
        circle
      >
      </el-button>
      <!-- 拒绝按钮 -->
      <el-button
        v-if="replyForm.status_name == '待审核'"
        type="danger"
        @click="updateStatusAndRefresh(replyForm.sponsorshipId, 2, 1)"
        icon="el-icon-close"
        circle
      >
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      detailForm: {},
      //详情对话框显示状态
      detailDialogVisible: false,
    };
  },

  created() {},
  mounted() {},
  methods: {
    getCompanyDetail(id) {
      console.log(id);
    },
    showDetailDialog(index) {},
    closeDetailDialog(index) {},
    approve(){},
    reject(){},
  },
};
</script>

<style scoped>
</style>