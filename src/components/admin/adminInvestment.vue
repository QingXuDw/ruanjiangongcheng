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
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <!-- 模糊搜索 -->
        <el-col :span="10">
          <el-input
            clearable
            @clear="getInvestmentList(query)"
            placeholder="请输入内容"
            v-model="query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getInvestmentList(query)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button
            type="success"
            @click="createInvestment()"
            icon="el-icon-files"
            >发布理财产品</el-button
          >
        </el-col>
      </el-row>

      <!-- 理财产品列表 -->
      <el-table :data="investmentList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="产品名称" prop="productName"></el-table-column>
        <el-table-column label="产品日息" prop="dailyRate"></el-table-column>
        <el-table-column label="起投资金" prop="initialFund"></el-table-column>
        <el-table-column label="产品详情">
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
    <admin-investment-detail
      v-if="showDetail"
      v-bind="childProp"
      ref="child"
      @close="closeDetailDialog()"
    ></admin-investment-detail>
  </div>
</template>

<script>
import adminInvestmentDetail from "./adminInvestmentDetail.vue";
export default {
  components: { adminInvestmentDetail },
  data() {
    return {
      //获取列表参数对象
      query: "",
      //当前的页码
      pageNumber: 1,
      //每页显示的条数
      pageSize: 5,
      //查询到的当前页账户列表
      investmentList: [],
      //总条数,用于分页的显示
      totalCount: 0,
      childProp: {
        id: "",
        investmentInfo: {},
      },
      showDetail: false,
    };
  },

  created() {},
  mounted() {
    this.getInvestmentList("");
  },
  methods: {
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getInvestmentList(this.query);
    },
    //监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.pageNumber = newPage;
      this.getSponsorList(this.query);
    },
    async getInvestmentList(query) {
      let response = await this.$axios.get(this.$api.adminGetInvestmentList, {params:{
        productName: query,
        page_num: this.pageNumber - 1,
        page_size: this.pageSize,
      }});
      this.investmentList = response.data;
      response = await this.$axios
        .get(this.$api.adminGetInvestmentListNum, {params:{
          productName: query,
          page_num: this.pageNumber - 1,
          page_size: this.pageSize,
        }})
      this.totalCount = response.data;
    },
    async showDetailDialog(index) {
      let response = await this.$axios.get(this.$api.adminGetInvestmentInfo, {params:{
        Id: this.investmentList[index].productId,
      }});
      this.childProp.investmentInfo = response.data;
      this.childProp.id = this.investmentList[index].productId;
      this.showDetail = true;
    },
    async closeDetailDialog(){
      this.showDetail = false;
    },
    async createInvestment() {
      this.childProp.id = "";
      this.childProp.investmentInfo = {
        dailyRate: 0,
        description: "",
        initialFund: 0,
        productName: "",
        productId: "",
      };
      this.showDetail = true;
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