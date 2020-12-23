<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/touristWelcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/adminWelcome' }"
        >管理员主页</el-breadcrumb-item
      >
      <el-breadcrumb-item>借贷审核</el-breadcrumb-item>
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
        <el-table-column label="月利率" prop="rate"></el-table-column>
        <el-table-column label="还款期限" prop="repayMonth"></el-table-column>

        <el-table-column label="风险等级">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.riskLevel"
              disabled
              :colors="rateColors"
              :icon-classes="rateClasses"
              disabled-void-icon-class="el-icon-remove-outline"
              show-score
              score-template="{value}级"
            >
            </el-rate>
          </template>
        </el-table-column>
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
            <el-popover
              v-if="scope.row.status_name == '待审核'"
              placement="top"
              width="600"
              trigger="manual"
              v-model="scope.row.rejectPopVisible"
            >
              <div style="text-align: right; margin: 0">
                <el-row>
                  <el-col :span="2">
                    <h4>建议：</h4>
                  </el-col>
                  <el-col :span="22">
                    <el-input
                      v-model="scope.row.suggestion"
                      type="textarea"
                      style="width: 84%"
                      :autosize="{ minRows: 3, maxRows: 10 }"
                      palceholder="请在此处输入您对于此次借贷的建议"
                      maxlength="2000"
                      show-word-limit
                    ></el-input>
                  </el-col>
                </el-row>
              </div>
              <!-- 取消按钮 -->
              <el-button type="info" @click="showRejectPop(scope.$index)"> 取消操作 </el-button>
              <!-- 确认按钮 -->
              <el-button type="danger" @click="reject(scope.$index)"> 确认拒绝 </el-button>
              
              <!-- 拒绝按钮 -->
              <el-button
                slot="reference"
                type="danger"
                @click="showRejectPop(scope.$index)"
                icon="el-icon-close"
                plain
                circle
              >
              </el-button>
            </el-popover>
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
    <admin-loan-detail v-bind="childProp" ref="child"></admin-loan-detail>
  </div>
</template>

<script>
import adminLoanDetail from "./adminLoanDetail.vue";
export default {
  components: { adminLoanDetail },
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
        .get(this.$api.adminGetLoanListByStatus, {params:{
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
        list[index].showRejectPop = false;
      });
      response = await this.$axios
        .get(this.$api.adminGetLoanListByStatusNum, {params:{
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
    async approve(index) {
      let response = await this.$axios
        .put(this.$api.adminApproveLoan, {
          Id: this.loanList[index].loanId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.getLoanList(0);
    },
    async reject(index) {
      let response = await this.$axios
        .put(this.$api.adminRejectLoan, {
          id: this.loanList[index].loanId,
          suggestion: this.loanList[index].suggestion,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.getLoanList(0);
    },
    jumpToUrl(index) {
      var url = this.loanList[index].website;
      window.open(url);
    },
    async showDetailDialog(index) {
      let response = await this.$axios
        .get(this.$api.adminGetLoanInfo, {params:{
          Id: this.loanList[index].loanId,
        }})
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