<template>
  <el-dialog
    title="公司详情"
    :visible.sync="visible"
    :width="dialogWidth"
    center
  >
    <el-row class="col-height" type="flex" justify="center">
      <el-col :span="infoSpan">
        <company-info-form :detail="companyInfo" ref="info"></company-info-form>
      </el-col>
      <el-col class="col-height" v-if="showLoan" :span="1">
        <el-divider class="col-height" direction="vertical"></el-divider>
      </el-col>
      <el-col class="col-height" v-if="showLoan" :span="loanSpan"> </el-col>
    </el-row>

    <span slot="footer">
      <!-- 取消按钮 -->
      <el-button @click="closeDetailDialog()">返 回</el-button>
      <!-- 通过按钮 -->
      <el-button
        v-if="this.status_name == '待审核'"
        type="success"
        @click="approve()"
        icon="el-icon-check"
        plain
        circle
      >
      </el-button>
      <!-- 拒绝按钮 -->
      <el-button
        v-if="this.status_name == '待审核'"
        type="danger"
        @click="reject()"
        icon="el-icon-close"
        plain
        circle
      >
      </el-button>
      <!-- 借贷记录按钮 -->
      <el-button
        v-if="this.status_name == '已通过'"
        type="primary"
        @click="switchLoanDiv()"
      >
        借贷记录
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import companyInfoForm from './companyInfoForm.vue'
export default {
  components: { companyInfoForm },
  data() {
    return {
      //详情对话框显示状态
      visible: false,
      infoSpan: 20,
      dialogWidth: "60%",
      showLoan: false,
      loanSpan: 0,
    };
  },
  props: {
    id: "",
    companyInfo: {},
  },
  computed: {
    status_name: function () {
      return this.statusToStr(this.companyInfo.status);
    },
  },
  created() {},
  mounted() {},
  methods: {
    getCompanyDetail() {
      this.$emit("fresh");
    },
    showDetailDialog() {
      this.visible = true;
    },
    closeDetailDialog() {
      this.visible = false;
    },
    async approve() {
      let response = await this.$axios
        .post(this.$api.adminApproveCompany, {
          Id: this.id,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.getCompanyDetail();
    },
    async reject() {
      let response = await this.$axios
        .post(this.$api.adminRejectCompany, {
          Id: this.id,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.getCompanyDetail();
    },
    async switchLoanDiv() {
      if (!this.showLoan) {
        let result = this.getLoanList();
        if (result == null) {
          return;
        }
      }
      this.switchShowLoan();
    },
    async getLoanList() {},
    switchShowLoan() {
      if (this.showLoan) {
        this.showLoan = false;
        this.loanSpan = 0;
        this.infoSpan = 20;
        this.dialogWidth = "60%";
      } else {
        this.showLoan = true;
        this.loanSpan = 11;
        this.infoSpan = 11;
        this.dialogWidth = "95%";
      }
    },
    //输出status的文字描述
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
.col-height {
  height: 1100px;
}
</style>