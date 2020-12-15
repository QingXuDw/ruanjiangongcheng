<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/touristWelcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/adminWelcome' }"
        >交易</el-breadcrumb-item
      >
      <el-breadcrumb-item>请求借款</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <!-- 带状态的模糊搜索 -->
        <el-col :span="1" class="center">
          <el-button type="text" disabled>状态：</el-button>
        </el-col>
        <el-col :span="12" style="margin-left: 10px">
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
              >被拒绝</el-button
            >
            <el-button type="primary" plain @click="getLoanList(4)"
              >逾期未还</el-button
            >
          </el-button-group>
        </el-col>
      </el-row>

      <el-table :data="loanList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="金额" prop="amount"></el-table-column>
        <el-table-column label="请求时间" prop="apply_time"></el-table-column>
        <el-table-column label="接受时间" prop="approve_time"></el-table-column>
        <el-table-column label="抵押资产" prop="asset"></el-table-column>
        <el-table-column label="担保人信息" prop="guarantee"></el-table-column>
        <el-table-column label="借款编号" prop="loan_id"></el-table-column>
        <el-table-column label="利率" prop="rate"></el-table-column>
        <el-table-column label="归还期限" prop="repay_time"></el-table-column>
        <el-table-column label="借款建议" prop="suggestion"></el-table-column>
        <el-table-column label="借款状态" prop="status"></el-table-column>
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
  </div>
</template>

<script>
export default {
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
        amount: 0,
        apply_time: "",
        approve_time:"",
        asset:"",
        guarantee:"",
        load_id:0,
        rate:0,
        repay_time:"",
        suggestion:"",
        status:0,
      },
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
          return "被拒绝";
          break;
        case 4:
          return "逾期未还";
          break;
        default:
          return "未定义"
          break;
      }
    },
    async getLoanList(status) {
      this.status = status;
      let response = await this.$axios
        .post(this.$api.companyGetHistoryByStatus, {
          page_num: this.pageNumber - 1,
          page_size: this.pageSize,
          status: status,
        })
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
        list[index].status_name = this.statusToStr(value.status);
        list[index].rate = `${value.rate / 100}%`;
        list[index].showRejectPop = false;
      });
      response = await this.$axios
        .post(this.$api.companyGetHistoryByStatusNum, {
          page_num: this.pageNumber - 1,
          page_size: this.pageSize,
          status: status,
        })
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
        .post(this.$api.companyGetLoanInfo, {
          Id: this.loanList[index].loanId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.childProp.loanInfo = response.data;
      this.childProp.id = this.loanList[index].loanId;
      this.$refs["child"].showDetailDialog();
    },
    showRejectPop(index) {
      this.loanList[index].rejectPopVisible = !this.loanList[index].rejectPopVisible;
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