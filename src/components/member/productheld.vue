"amountHeld": 0,
    "buyId": 0,
    "capitial": 0,
    "productId": 0,
    "productName": "string"
<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/touristWelcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/memberWelcome' }"
        >购买</el-breadcrumb-item
      >
      <el-breadcrumb-item>拥有理财</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-table :data="BuyProductList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="持有资金" prop="amountHeld"></el-table-column>
        <el-table-column label="购买单号" prop="buyId"></el-table-column>
        <el-table-column label="本金数额" prop="capitial"></el-table-column>
        <el-table-column label="产品编号" prop="productId"></el-table-column>
        <el-table-column label="产品名称" prop="productName"></el-table-column>
        <el-table-column label="是否提现" >
        <template slot-scope="scope">
            <el-button type="primary" @click="takeBackProfit(scope.$index)">
              提现
            </el-button>
          </template></el-table-column>
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
      BuyProductList: [],
      //总条数,用于分页的显示
      totalCount: 0,
      childProp: {
        id:"",
        BuyProductList:{},
      },
    };
  },

  created() {},
  mounted() {
    this.getBuyProductList(0);
  },
  methods: {
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getBuyProductList(this.status);
    },
    //监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.pageNumber = newPage;
      this.getBuyProductList(this.status);
    },
    //输出status的文字描述
    async getBuyProductList(status) {
      this.status = status;
      response = await this.$axios
        .post(this.$api.companyGetHistoryNum, {
          page_num: this.pageNumber - 1,
          page_size: this.pageSize,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.totalCount = response.data;
    },
    },
    async showDetailDialog(index) {
      let response = await this.$axios
        .post(this.$api.companyGetBuyProductList, {
          Id: this.BuyProductList[index].productId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.childProp.BuyProductInfo = response.data;
      this.childProp.id = this.BuyProductList[index].prodcuctId;
      this.$refs["child"].showDetailDialog();
    },
    showRejectPop(index) {
      this.BuyProductList[index].rejectPopVisible = !this.BuyProductList[index].rejectPopVisible;
    },
    async takeBackProfit(){
        let response=await this.$axios.post(this.$api.companyTakeBackProfit,{
            Id:this.BuyProductList.buyId,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
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