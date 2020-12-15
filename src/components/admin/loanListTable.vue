<template>
  <div>
    <h3>借贷列表</h3>
    <el-table :data="loan.loanList">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="金额" prop="amount"></el-table-column>
      <el-table-column label="月利率" prop="rate"></el-table-column>
      <el-table-column label="还款期限" prop="repayMonth"></el-table-column>
      <el-table-column label="审核">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status_name == '待审核'"
            type="success"
            @click="approve(scope.$index)"
            icon="el-icon-check"
            plain
            circle
          >
          </el-button>
          <el-button
            v-if="scope.row.status_name == '待审核'"
            type="danger"
            @click="reject(scope.$index)"
            icon="el-icon-close"
            plain
            circle
          >
          </el-button>
          <h4 v-if="scope.row.status_name != '待审核'">
            状态：{{ scope.row.status_name }}
          </h4>
        </template>
      </el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <el-button type="primary" @click="showDetailDialog(scope.$index)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
  </div>
</template>
<script>
import adminCompanyDetail from "./adminCompanyDetail.vue";
export default {
  components: { "admin-company-detail": adminCompanyDetail },
  data() {
    return {
      childProp: {
        id: "",
        detailForm: {},
      },
      rateClasses: ["el-icon-success", "el-icon-warning", "el-icon-error"],
      rateColors: ["#00FF7F", "#FFA500", "#DC143C"],
    };
  },
  props: {
    loan: {
      loanList: [],
    },
  },
  computed: {},
  methods: {
    //输出status的文字描述
    statusToStr(status_int) {
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
    async approve(index) {
      let response = await this.$axios
        .post(this.$api.adminApproveLoan, {
          Id: this.loan.loanList[index].loanId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.loan.loanList[index].status = 1;
    },
    async reject(index) {
      let response = await this.$axios
        .post(this.$api.adminRejectLoan, {
          Id: this.loan.loanList[index].loanId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.loan.loanList[index].status = 2;
    },
    async showDetailDialog(index) {
      let response = await this.$axios
        .post(this.$api.adminGetCompanyInfo, {
          Id: this.loan.loanList[index].companyId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.childProp.detailForm = response.data;
      this.childProp.id = this.loan.loanList[index].companyId;
      this.$refs["child"].showDetailDialog();
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
