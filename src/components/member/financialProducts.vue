<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/touristWelcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/memberWelcome' }"
        >用户主页</el-breadcrumb-item
      >
      <el-breadcrumb-item>理财产品购买</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <!-- 模糊搜索 -->
        <el-col :span="10">
          <el-input
            clearable
            @clear="getProductList(0, query)"
            placeholder="请输入内容"
            v-model="query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getProductList(0, query)"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 社团列表 -->
      <el-table :data="productList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="日利率" prop="dailyRate"></el-table-column>
        <el-table-column label="产品介绍" prop="description">
        </el-table-column>
        <el-table-column label="起始资金" prop="initialFund"></el-table-column>
        <el-table-column label="产品编号" prop="productId">
        </el-table-column>
        <el-table-column label="产品名称" prop="productName"></el-table-column>
        <el-table-column label="是否购买">
          <template slot-scope="scope">
            <el-button type="primary" @click="buyproduct(scope.$index)">
              购买
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
     <buy-product
      v-bind="childProp"
      ref="child"
      @fresh="this.buyproduct()"
    ></buy-product>
  </div>
</template>

<script>
import buyproduct from "./buyproduct.vue";
export default {
  components: { "buy-product":buyproduct },
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
      productList: [],
      //总条数,用于分页的显示
      totalCount: 0,
      childProp: {
        id: "",
        productInfo: {},
      },
    };
  },

  created() {},
  mounted() {
    this.getproductList(-1, "");
  },
  methods: {
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getproductList(this.status, this.query);
    },
    //监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.pageNumber = newPage;
      this.getSponsorList(this.status, this.query);
    },
    async getproductList(status, query) {
      this.status=status;
      let response = await this.$axios
        .post(this.$api.companyGetProductList, {
          page_num: this.pageNumber - 1,
          page_size: this.pageSize,
          productName:this.productList.productName,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      console.log(response);
      this.productList = response.data;
      response = await this.$axios
        .post(this.$api.companyGetProductListNum, {
          page_num: this.pageNumber - 1,
          page_size: this.pageSize,
          productName:this.productList.productName,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
        this.totalCount = response.data;
        response = await this.$axios
        .post(this.$api.companyGetProductById, {
          Id: this.productList.productId,
        });
      this.productList = response.data;
    },
    },
    async buyproduct(index) {
      let response = await this.$axios
        .post(this.$api.buyproduct, {
          Id: this.productInfo[index].productId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.childProp.productInfo = response.data;
      this.childProp.id = this.productInfo[index].productId;
      this.$refs["child"].buyproduct();
    },
  };
</script>

<style scoped>
.center {
  margin: auto 0;
  vertical-align: 50%;
}
</style>