<template>
  <el-dialog title="公司详情" :visible.sync="visible" width="60%" center>
    <el-form :model="this.detailForm" label-width="150px">
      <el-form-item label="公司名称:">
        <el-input
          v-model="this.detailForm.companyName"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址:">
        <el-input
          v-model="this.detailForm.address"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="资产报告:">
        <div v-html="this.detailForm.asset">{{this.detailForm.asset}}</div>
      </el-form-item>
      <el-form-item label="信用等级:">
        <el-input
          v-model="this.detailForm.creditRate"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="信用积分:">
        <el-input
          v-model="this.detailForm.creditScore"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="开户银行:">
        <el-input
          v-model="this.detailForm.depositBank"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="开户银行卡号:">
        <el-input
          v-model="this.detailForm.depositBankCardNumber"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司描述:"> 
        <div v-html="this.detailForm.description">{{this.detailForm.description}}</div>
      </el-form-item>
      <el-form-item label="电邮地址:">
        <el-input
          v-model="this.detailForm.email"
          style="width: 82%"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="电话:">
        <el-input
          v-model="this.detailForm.phone"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="logo:">
        <div>
          <img :src="this.detailForm.logo"/>
        </div>
      </el-form-item>
      <el-form-item label="在职人数:">
        <el-input
          v-model="this.detailForm.memberNumber"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-input
          v-model="status_name"
          readonly
          style="width: 82%"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- 取消按钮 -->
      <el-button @click="closeDetailDialog()">取 消</el-button>
      <!-- 通过按钮 -->
      <el-button
        v-if="this.status_name == '待审核'"
        type="success"
        @click="approve()"
        icon="el-icon-check"
        circle
      >
      </el-button>
      <!-- 拒绝按钮 -->
      <el-button
        v-if="this.status_name == '待审核'"
        type="danger"
        @click="reject()"
        icon="el-icon-close"
        circle
      >
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      //详情对话框显示状态
      visible: false,
    };
  },
  props: {
    id: "",
    detailForm: {},
  },
  computed: {
    status_name: function(){
      return this.statusToStr(this.detailForm.status);
    },
  },
  created() {},
  mounted() {},
  methods: {
    getCompanyDetail() {
      this.$emit("fresh");
    },
    showDetailDialog() {
      this.visible = true;
    },
    closeDetailDialog() {
      this.visible = false;
    },
    async approve() {
      let response = await this.$axios.post(
        this.$api.adminApproveCompany,
        {
          Id: this.id,
        }
      )
      .catch((error)=>{
        this.$message.error(error.msg);
        return;
      });
      this.getCompanyDetail();
    },
    async reject() {
      let response = await this.$axios.post(
        this.$api.adminRejectCompany,
        {
          Id: this.id,
        }
      )
      .catch((error)=>{
        this.$message.error(error.msg);
        return;
      });
      this.getCompanyDetail();
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
  },
};
</script>

<style scoped>
</style>