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
      <el-breadcrumb-item>公司管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <!-- 模糊搜索 -->
        <el-col :span="10">
          <el-input
            clearable
            @clear="getCompanyList(status, query)"
            placeholder="请输入内容"
            v-model="query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getCompanyList(status, query)"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 带状态的模糊搜索 -->
        <el-col :span="1" class="center">
          <el-button type="text" disabled>状态：</el-button>
        </el-col>
        <el-col :span="12" style="margin-left: 10px">
          <el-button-group>
            <el-button type="primary" plain @click="getCompanyList(-1, query)"
              >全部</el-button
            >
            <el-button type="primary" plain @click="getCompanyList(0, query)"
              >待审核</el-button
            >
            <el-button type="primary" plain @click="getCompanyList(1, query)"
              >已通过</el-button
            >
            <el-button type="primary" plain @click="getCompanyList(2, query)"
              >未通过</el-button
            >
          </el-button-group>
        </el-col>
      </el-row>

      <!-- 公司列表 -->
      <el-table :data="companyList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="公司名称" prop="companyName"></el-table-column>
        <el-table-column label="公司网址" prop="website">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.website != null"
              type="text"
              @click="jumpToUrl(scope.$index)"
            >
              公司官网
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="信用积分" prop="credit_score"></el-table-column>
        <el-table-column label="信用星级">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.credit_rate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
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
    <admin-company-detail
      v-bind="childProp"
      ref="child"
      @fresh="this.showDetailDialog()"
    ></admin-company-detail>
  </div>
</template>

<script>
import adminCompanyDetail from "./adminCompanyDetail.vue";
export default {
  components: { adminCompanyDetail },
  data() {
    return {
      //获取列表参数对象
      query: "",
      status: -1,
      //当前的页码
      pageNumber: 1,
      //每页显示的条数
      pageSize: 5,
      //查询到的当前页账户列表
      companyList: [],
      //总条数,用于分页的显示
      totalCount: 0,
      childProp: {
        id: "",
        companyInfo: {},
      },
    };
  },

  created() {},
  mounted() {
    this.getCompanyList(-1, "");
  },
  methods: {
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getCompanyList(this.status, this.query);
    },
    //监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.pageNumber = newPage;
      this.getCompanyList(this.status, this.query);
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
    async getCompanyList(status, query) {
      this.status = status;
      let response = await this.$axios
        .get(this.$api.adminGetCompanyList, {
          params:{
          condition: query,
          page_num: this.pageNumber - 1,
          page_size: this.pageSize,
          status: status,
        }})
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.companyList = response.data;
      this.companyList.forEach((value, index, list) => {
        list[index].credit_rate = value.credit_rate / 20;
      });
      response = await this.$axios
        .get(this.$api.adminGetCompanyListNum, {params:{
          condition: query,
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
        .put(this.$api.adminApproveCompany, {
          Id: this.companyList[index].companyId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.getCompanyList(0, this.query);
    },
    async reject(index) {
      let response = await this.$axios
        .put(this.$api.adminRejectCompany, {
          Id: this.companyList[index].companyId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.getCompanyList(0, this.query);
      this.print(response);
    },
    jumpToUrl(index) {
      var url = this.companyList[index].website;
      window.open(url);
    },
    async showDetailDialog(index) {
      let response = await this.$axios
        .get(this.$api.adminGetCompanyInfo, {params:{
          Id: this.companyList[index].companyId,
        }})
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.childProp.companyInfo = response.data;
      this.childProp.id = this.companyList[index].companyId;
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