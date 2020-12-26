<template>
  <el-dialog
    title="借贷详情"
    :visible.sync="visible"
    :width="dialogWidth"
    center
  >
    <el-row class="col-height" type="flex" justify="center">
      <el-col :span="infoSpan">
        <companyLoanInfoForm :detail="loanInfo" ref="loanInfo"></companyLoanInfoForm>
      </el-col>
    </el-row>

    <span slot="footer">
      <!-- 取消按钮 -->
      <el-button @click="closeDetailDialog()">返 回</el-button>
      <el-button
        v-if="this.status_name == '正在进行'"
        type="success"
        @click="repay()"
      >还款
      </el-button>
      <el-button
        v-if="this.status_name == '已逾期'"
        type="danger"
        @click="repay()"
      >还款</el-button>
    </span>
  </el-dialog>
</template>

<script>
import companyLoanInfoForm from "./companyLoanInfoForm.vue";
export default {
  components: { companyLoanInfoForm },
  data() {
    return {
      //详情对话框显示状态
      visible: false,
      infoSpan: 20,
      dialogWidth: "60%",
      loanList: [],
    };
  },
  props: {
    id: "",
    loanInfo: {},
  },
  computed: {
    status_name: function () {
      return this.loanStatusToStr(this.loanInfo.status);
    },
  },
  created() {},
  mounted() {},
  methods: {
    showDetailDialog() {
      this.visible = true;
    },
    closeDetailDialog() {
      this.visible = false;
    },
    //输出status的文字描述
    async repay(){
      let response=await this.$axios
        .put(this.$api.companyRepayLoan,{
          Id:this.loanInfo.companyId,
          id:this.loanInfo.loanId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
    },
    loanStatusToStr(status_int) {
      switch (status_int) {
        case 0:
          return "待审核";
          break;
        case 1:
          return "正在进行";
          break;
        case 2:
          return "已完成";
          break;
        case 3:
          return "未通过";
          break;
        case 4:
          return "已逾期";
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
  height: 1050px;
}
</style>