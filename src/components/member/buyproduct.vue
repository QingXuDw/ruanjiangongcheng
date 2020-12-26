<template>
  <el-dialog
    title="购买理财产品"
    :visible="true"
    :width="dialogWidth"
    @close="forceClose()"
    center
  >
    <el-form :model="detail_n" label-width="150px">
      <el-form-item label="产品编号">
        <el-input
          v-model="detail_n.productId"
          style="width: 82%"
          ></el-input>
      </el-form-item>
      <el-form-item label="投资金额:">
        <el-input
          v-model="detail_n.capital"
          style="width: 82%"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <!-- 取消按钮 -->
      <el-button @click="closeDetailDialog()">返 回</el-button>
      <!-- 发布按钮 -->
      <!-- 修改按钮 -->
      <el-button type="primary" @click="buyProduct()"> 购买 </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      //详情对话框显示状态
      visible: false,
      dialogWidth: "80%",
      detail_n: {},
    };
  },
  props: {
    id: "",
    productInfo: {},
  },
  computed: {},
  created() {},
  mounted() {
    this.detail_n = this.productInfo;
  },
  methods: {
    showDetailDialog() {
    },
    closeDetailDialog() {
      this.$emit('close');
    },
    forceClose(){
      this.$emit('close');
    },
    async buyProduct() {
       let response=await this.$axios.post(
        this.$api.companyBuyProduct,
        {
          productId: this.detail_n.productId,
          capital: this.detail_n.capital,
        }
      )
      this.closeDetailDialog();
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
  height: 1000px;
}
</style>