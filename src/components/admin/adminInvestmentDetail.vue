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
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品日息:">
        <el-input
          v-model="detail_n.dailyRate"
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品描述:">
        <quill-editor
          ref="myTextEditor"
          v-model="detail_n.description"
          :options="editorOption"
          style="height: 400px"
        ></quill-editor>
      </el-form-item>
      <el-form-item style="margin: 120px 0" label="起投资金:">
        <el-input
          v-model="detail_n.initialFund"
          style="width: 82%"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <!-- 取消按钮 -->
      <el-button @click="closeDetailDialog()">返 回</el-button>
      <!-- 发布按钮 -->
      <el-button v-if="this.id == ''" type="primary" @click="publish()">
        发布
      </el-button>
      <!-- 修改按钮 -->
      <el-button v-else type="primary" @click="change()"> 修改 </el-button>
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
      editorOption: {
        placeholder: "编辑内容",
      },
    };
  },
  props: {
    id: "",
    investmentInfo: {},
  },
  computed: {},
  created() {},
  mounted() {
    this.detail_n = this.investmentInfo;
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
    async publish() {
      let response = await this.$axios.post(
        this.$api.adminCreateProduct,
        {
          dailyRate: this.detail_n.dailyRate,
          description: this.detail_n.description,
          initialFund: this.detail_n.initialFund,
          productName: this.detail_n.productName,
        }
      )
      this.closeDetailDialog();
    },
    async change() {
      let response = await this.$axios.put(
        this.$api.adminChangeProduct,
        this.detail_n
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