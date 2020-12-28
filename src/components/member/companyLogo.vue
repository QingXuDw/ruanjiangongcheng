<template>
  <div>
    <el-steps :active="2" :align-center="true">
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-upload"></el-step>
    </el-steps>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purole-dark">创建公司</div></el-col
      >
    </el-row>
    <p>公司logo</p>
    <el-upload
      class="upload-demo"
      drag
      :action="this.$api.companyUploadLogo"
      name="file"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">不超过500kb</div>
    </el-upload>
    <el-button type="primary" @click="onSubmit()">完成</el-button>
  </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        async onSubmit(){
            this.$message("提交成功，等待审核!");
        }
    }
}
</script>