<template>
  <el-dialog title="购买产品" :visible.sync="visible" width="60%" center>
    <el-form :model="productForm" label-width="150px">
      <el-form-item label="产品编号：">
        <el-input
          v-model="this.productForm.productId"
          style="width: 82%"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="投入本金：">
        <el-input
          v-model="this.productForm.capitial"
          style="width: 82%"
          type="number"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="companybuyproduct()">购买</el-button>
      <el-button @click="onCancel()">放弃</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      productForm: {
        productId: 0,
        capitial: 0,
      },
    };
  },
  methods: {
    async companybuyproduct() {
      this.$message("购买成功！");
      let response = await this.$axios
        .post(this.$api.companybuyproduct, {
          productId: this.productForm.productId,
          capitial: this.productForm.capitial,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
    },
    async onCancel() {
      this.$message({
        message: "取消购买成功!",
        type: "warning",
      });
    },
  },
};
</script>