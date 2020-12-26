<template>
  <el-dialog
    title="理财产品详情"
    :visible="true"
    :width="dialogWidth"
    @close="forceClose()"
    center
  >
    <el-form :model="detail_n" label-width="150px">
      <el-form-item label="产品名称:">
        <el-input
          v-model="detail_n.productName"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品日息:">
        <el-input
          v-model="detail_n.dailyRate"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品描述:">
        <quill-editor
          v-model="detail_n.description"
          readonly
          style="height: 400px"
        ></quill-editor>
      </el-form-item>
      <el-form-item style="margin: 120px 0" label="起投资金:">
        <el-input
          v-model="detail_n.initialFund"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <!-- 取消按钮 -->
      <el-button @click="closeDetailDialog()">返 回</el-button>
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