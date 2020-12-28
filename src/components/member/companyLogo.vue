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
      ref="upload"
      drag
      :action="this.$api.companyUploadLogo"
      name="file"
      list-type="picture"
      :http-request="logoUploadRequest"
    >
      <i class="el-icon-upload"></i>
      <div class="el-uplaod_text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-button type="primary" @click="onSubmit()">完成</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    async onSubmit() {
      this.$message("提交成功，等待审核!");
    },
    async logoUploadRequest(param){
      var self = this;
      var file = param.file;
      var isImage = (file.type.indexOf('image') != -1);
      var isExceed = (file.size > (500 * 1024));
      var isSuccess = true;
      console.log(param);
      console.log(self.$refs.upload.uploadFiles);
      if(!isImage){
        this.$message.error(`文件 ${file.name} 并非图片文件，上传失败`);
        return;
      }
      if(isExceed){
        this.$message.error(`文件 ${file.name} 大小为 ${file.size / 1024}kb，大于500kb限制，文件上传失败`);
        return;
      }
      var formData = new FormData();
      formData.append(param.filename, file);
      var response = await this.$axios.post(
        param.action, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .catch(function(error){
        isSuccess = false;
        self.$message.error(`出现网络问题 ${error.code}，文件 ${file.name} 上传失败，请重试`);
        return;
      });
      if (isSuccess){
        this.imgUrl = response.data.url;
        return;
      }
      return;    
    }
  },
};
</script>