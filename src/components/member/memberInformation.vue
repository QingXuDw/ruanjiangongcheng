<template>
  <div>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>企业信息</span>
            </div>
             <el-divider></el-divider>
            <div class="name-role">
              <span class="sender">企业地址: {{ dataForm.address }}</span>
            </div>
            <div class="registe-info">
              <span class="registe-info">企业资产:{{ dataForm.asset }}</span>
            </div>
            <div class="personal-relation">
              <div class="relation-item">
                企业名称：
                <div style="float: right; padding-right: 20px">
                  {{ dataForm.companyName }}
                </div>
              </div>
            </div>
            <div class="personal-relation">
              <div class="relation-item">
                信用率:
                <div style="float: right; padding-right: 20px">
                  {{ dataForm.credit_rate }}
                </div>
              </div>
            </div>
            <div>
              <span class="relation-item"
                >信用积分:{{ dataForm.credit_score }}</span
              >
            </div>
            <div>
              <span class="relation-item"
                >开户银行:{ dataForm.depositBank }}</span
              >
            </div>
            <div>
              <span class="relation-item"
                >企业简介:{{ dataForm.description }}</span
              >
            </div>
            <div>
              <span class="relation-item">企业邮箱:{{ dataForm.email }}</span>
            </div>
            <div>
              <span class="relation-item">企业图标:{{ dataForm.logo }}</span>
            </div>
            <div>
              <span class="relation-item"
                >用户编号:{{ dataForm.memberNumber }}</span
              >
            </div>
            <div>
              <span class="relation-item">公司电话:{{ dataForm.phone }}</span>
            </div>
            <div>
              <span class="relation-item">公司网址:{{ dataForm.website }}</span>
            </div>
            <el-button type="primary" @click="changeInfo()">修改信息</el-button>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataForm: {
        address: "",
        asset: "",
        companyName: "",
        credit_rate: "",
        credit_scope: "",
        depositBank: "",
        description: "",
        email: "",
        logo: "",
        memberNumber: 0,
        phone: "",
        website: "",
      },
    };
  },
  methods: {
    async changeInfo() {
      await this.$router.push({ path: "/memberchange" });
    },
  },
};
</script>
<style lang="scss" scoped>
//卡片样式
.box-card {
  width: 100%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
//文本样式区
.name-role {
  font-size: 16px;
  padding: 5px;
  text-align: center;
}
.registe-info {
  text-align: center;
  padding-top: 10px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
  width: 100%;
}
.relation-item {
  padding: 12px;
}
.sender {
  text-align: center;
}
//布局样式区
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
