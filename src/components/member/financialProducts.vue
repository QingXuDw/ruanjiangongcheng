<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/memberWelcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/memberWelcome' }"
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
            @clear="getProductList(query)"
            placeholder="请输入内容"
            v-model="query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getProductList(query)"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 理财产品列表 -->
      <el-table :data="productList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="产品名称" prop="productName"></el-table-column>
        <el-table-column label="产品编号" prop="productId"></el-table-column>
        <el-table-column label="产品日息" prop="dailyRate"></el-table-column>
        <el-table-column label="起投资金" prop="initialFund"></el-table-column>
        <el-table-column label="是否购买">
            <el-button type="primary" @click="goBuyProduct()">
            购买
            </el-button>
        </el-table-column>
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
    <company-product-detail
      v-if="showDetail"
      v-bind="childProp"
      ref="child"
      @close="closeDetailDialog()"
    ></company-product-detail>
    <company-buy-product
      v-if="buyProduct"
      v-bind="childProp"
      ref="child"
      @close="closeBuyProduct()"
    ></company-buy-product>
  </div>
</template>

<script>
import companyProductDetail from "./companyProductDetail.vue";
import companyBuyProduct from "./buyproduct.vue";
export default {
  components: { companyProductDetail,companyBuyProduct },
  data() {
    return {
      //获取列表参数对象
      query: "",
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
      showDetail: false,
      buyProduct: false,
    };
  },

  created() {},
  mounted() {
    this.getProductList("");
  },
  methods: {
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getProductList(this.query);
    },
    //监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.pageNumber = newPage;
      this.getSponsorList(this.query);
    },
    async getProductList(query) {
      let response = await this.$axios.get(this.$api.companyGetProductList, {params:{
        productName: query,
        page_num: this.pageNumber - 1,
        page_size: this.pageSize,
      }})
      .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.productList = response.data;
      response = await this.$axios
        .get(this.$api.companyGetProductListNum, {params:{
          productName: query,
          page_num: this.pageNumber - 1,
          page_size: this.pageSize,
        }})
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.totalCount = response.data;
    },
    async showDetailDialog(index) {
      let response = await this.$axios.get(this.$api.companyGetProductInfo, {params:{
        Id: this.productList[index].productId,
      }})
      .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.childProp.productInfo = response.data;
      this.childProp.id = this.productList[index].productId;
      this.showDetail = true;
    },
    async closeDetailDialog(){
      this.showDetail = false;
    },
    async goBuyProduct(){
       this.childProp.id="";
       this.childProp.productInfo={
         productId: 0,
         captial: 0,
       };
       this.buyProduct=true;
    },
    async closeBuyProduct(){
      this.buyProduct=false;
    }
  },
};
</script>

<style scoped>
.center {
  margin: auto 0;
  vertical-align: 50%;
}
</style>