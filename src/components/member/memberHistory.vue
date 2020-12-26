<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/memberWelcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/memberWelcome' }"
        >借款</el-breadcrumb-item
      >
      <el-breadcrumb-item>借款记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <!-- 带状态的模糊搜索 -->
        <el-col :span="1" class="center">
          <el-button type="text" disabled>状态：</el-button>
        </el-col>
        <el-col :span="16" style="margin-left: 10px">
          <el-button-group>
            <el-button type="primary" plain @click="getLoanList(-1)"
              >全部</el-button
            >
            <el-button type="primary" plain @click="getLoanList(0)"
              >待审核</el-button
            >
            <el-button type="primary" plain @click="getLoanList(1)"
              >正在进行</el-button
            >
            <el-button type="primary" plain @click="getLoanList(2)"
              >已完成</el-button
            >
            <el-button type="primary" plain @click="getLoanList(3)"
              >未通过</el-button
            >
            <el-button type="primary" plain @click="getLoanList(4)"
              >已逾期</el-button
            >
          </el-button-group>
        </el-col>
      </el-row>

      <el-table :data="loanList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="金额" prop="amount"></el-table-column>
        <el-table-column label="申请时间" prop="apply_time"></el-table-column>
        <el-table-column label="同意时间" prop="approve_time"></el-table-column>
        <el-table-column label="抵押资产" prop="asset"></el-table-column>
        <el-table-column label="担保人信息" prop="guarantee"></el-table-column>
        <el-table-column label="借款编号" prop="loan_id"></el-table-column>
        <el-table-column label="借款利率" prop="rate"></el-table-column>
        <el-table-column label="归还期限" prop="repay_time"></el-table-column>
        <el-table-column label="借款状态" prop="status"></el-table-column>
        <el-table-column label="借款建议" prop="suggestion"></el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-button type="primary" @click="showDetailDialog(scope.$index)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
    <company-loan-detail v-bind="childProp" ref="child"></company-loan-detail>
  </div>
</template>

<script>
import companyLoanDetail from "./companyLoanDetail.vue";
export default {
  components: { companyLoanDetail },
  data() {
    return {
      status: 0,
      //当前的页码
      pageNumber: 1,
      //每页显示的条数
      pageSize: 5,
      //查询到的当前页账户列表
      loanList: [],
      //总条数,用于分页的显示
      totalCount: 0,
      childProp: {
        id: "",
        loanInfo: {},
      },
      rateClasses: ["el-icon-success", "el-icon-warning", "el-icon-error"],
      rateColors: ["#00FF7F", "#FFA500", "#DC143C"],
    };
  },

  created() {},
  mounted() {
    this.getLoanList(0);
  },
  methods: {
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getLoanList(this.status);
    },
    //监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.pageNumber = newPage;
      this.getLoanList(this.status);
    },
    //输出status的文字描述
    //输出status的文字描述
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
    async getLoanList(status) {
      this.status = status;
      let response = await this.$axios
        .get(this.$api.companyGetLoanListByStatus, {params:{
          page_num: this.pageNumber - 1,
          page_size: this.pageSize,
          status: status,
        }})
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.loanList = response.data;
      var level_temp;
      this.loanList.forEach((value, index, list) => {
        level_temp = value.riskLevel / 20;
        if (level_temp > 5) {
          level_temp = 5;
        } else if (level_temp < 0) {
          level_temp = 0;
        }
        list[index].riskLevel = level_temp;
        list[index].status_name = this.loanStatusToStr(value.status);
        list[index].rate = `${value.rate / 100}%`;
      });
      response = await this.$axios
        .get(this.$api.companyGetLoanListByStatusNum, {params:{
          page_num: this.pageNumber - 1,
          page_size: this.pageSize,
          status: status,
        }})
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.totalCount = response.data;
    },
    jumpToUrl(index) {
      var url = this.loanList[index].website;
      window.open(url);
    },
    async showDetailDialog(index) {
      let response = await this.$axios
        .get(this.$api.companyGetLoanInfo, {params:{
          Id: this.loanList[index].loan_id,
        }})
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.childProp.loanInfo = response.data;
      this.childProp.id = this.loanList[index].loanId;
      this.$refs["child"].showDetailDialog();
    },
  },
};
</script>

<style scoped>
.center {
  margin: auto 0;
  vertical-align: 50%;
}
</style>