<template>
  <el-dialog
    title="借贷详情"
    :visible.sync="visible"
    :width="dialogWidth"
    center
  >
    <el-row class="col-height" type="flex" justify="center">
      <el-col :span="infoSpan">
        <loan-info-form :detail="loanInfo" ref="loanInfo"></loan-info-form>
      </el-col>
      <el-col class="col-height" v-if="showCompany" :span="1">
        <el-divider class="col-height" direction="vertical"></el-divider>
      </el-col>
      <el-col class="col-height" v-if="showCompany" :span="companySpan">
        <company-info-form
          :detail="companyInfo"
          ref="companyInfo"
        ></company-info-form>
      </el-col>
    </el-row>

    <span slot="footer">
      <!-- 取消按钮 -->
      <el-button @click="closeDetailDialog()">返 回</el-button>
      <!-- 公司详情按钮 -->
      <el-button type="primary" @click="switchCompanyDiv()">
        公司详情
      </el-button>
      <!-- 通过按钮 -->
      <el-button
        v-if="this.status_name == '待审核'"
        type="success"
        @click="approve()"
        icon="el-icon-check"
        plain
        circle
      >
      </el-button>
      <el-popover
        v-if="this.status_name == '待审核'"
        placement="top"
        width="600"
        trigger="manual"
        v-model="rejectPopVisible"
      >
        <div style="text-align: right; margin: 0">
          <el-row>
            <el-col :span="2">
              <h4>建议：</h4>
            </el-col>
            <el-col :span="22">
              <el-input
                v-model="suggestion"
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
        <el-button type="info" @click="showRejectPop()"> 取消操作 </el-button>
        <!-- 确认按钮 -->
        <el-button type="danger" @click="reject()"> 确认拒绝 </el-button>
        <!-- 拒绝按钮 -->
        <el-button
          slot="reference"
          type="danger"
          @click="showRejectPop()"
          icon="el-icon-close"
          plain
          circle
        >
        </el-button>
      </el-popover>
    </span>
  </el-dialog>
</template>

<script>
import loanInfoForm from "./loanInfoForm.vue";
import companyInfoForm from "./companyInfoForm.vue";
export default {
  components: { loanInfoForm, companyInfoForm },
  data() {
    return {
      //详情对话框显示状态
      visible: false,
      infoSpan: 20,
      dialogWidth: "60%",
      showCompany: false,
      companySpan: 0,
      companyInfo: {},
      suggestion: "",
      rejectPopVisible: false,
    };
  },
  props: {
    id: "",
    loanInfo: {},
  },
  computed: {
    status_name: function () {
      return this.companyStatusToStr(this.loanInfo.status);
    },
  },
  created() {},
  mounted() {},
  methods: {
    showDetailDialog() {
      this.visible = true;
    },
    closeDetailDialog() {
      this.visible = false;
    },
    async approve() {
      let response = await this.$axios
        .put(this.$api.adminApproveLoan, {
          Id: this.id,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
    },
    async reject() {
      let response = await this.$axios
        .put(this.$api.adminRejectLoan, {
          id: this.id,
          suggestion: this.suggestion,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.rejectPopVisible = false;
      this.visible = false;
    },
    async switchCompanyDiv() {
      if (!this.showCompany) {
        let result = this.getCompanyInfo();
        if (result == null) {
          return;
        }
      }
      this.switchShowCompany();
    },
    async getCompanyInfo() {
      let response = await this.$axios
        .get(this.$api.adminGetCompanyInfo, {params:{
          Id: this.loanInfo.companyId,
        }})
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.companyInfo = response.data;
    },
    switchShowCompany() {
      if (this.showCompany) {
        this.showCompany = false;
        this.companySpan = 0;
        this.infoSpan = 20;
        this.dialogWidth = "60%";
      } else {
        this.showCompany = true;
        this.companySpan = 11;
        this.infoSpan = 11;
        this.dialogWidth = "95%";
      }
    },
    //输出status的文字描述
    companyStatusToStr(status_int) {
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
    showRejectPop() {
      this.suggestion = this.loanInfo.suggestion;
      this.rejectPopVisible = !this.rejectPopVisible;
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
  height: 1050px;
}
</style>