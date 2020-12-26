<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="loanform"
      label-width="120px"
      :rules="loanformRules"
    >
      <el-form-item label="借款数额">
        <el-input v-model="loanform.amount"></el-input>
      </el-form-item>
      <el-form-item label="抵押资产">
        <el-input v-model="loanform.asset"></el-input>
      </el-form-item>
      <el-form-item label="预计还款时间">
        <el-input v-model="loanform.repayTime"></el-input>
      </el-form-item>
      <el-form-item label="担保人信息描述">
        <el-input v-model="loanform.guarantee" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="利率">
        <el-input v-model="loanform.rate"></el-input>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="请完善担保人信息和抵押资产信息">
          <el-button type="primary" slot="reference" @click="onSubmit()"
            >提交</el-button
          >
        </el-popconfirm>
        <el-button @click="onCancel()">放弃</el-button>
      </el-form-item>
      <el-form-item label="担保人信息">
        <el-row :gutter="24" class="card-row3">
          <el-col :span="8">
            <el-card class="file-card">
              <div id="announce_head">
                <img
                  src="../../assets/img/string.png"
                  alt=""
                  style="vertical-align: middle"
                />
                <span> <label>图片上传</label></span>
              </div>
              <el-divider></el-divider>
              <el-input
                type="text"
                v-model="fileParam"
                auto-complete="off"
                placeholder="在此输入文件参数名"
              >
              </el-input>
              <el-upload
                ref="upload"
                :action="fullUrl"
                :before-remove="fileBeforeRemove"
                multiple
                :limit="10"
                :on-exceed="fileHandleExceed"
                :file-list="fileList"
                :name="fileParam"
                list-type="picture"
                :auto-upload="false"
                :http-request="fileUploadRequest"
              >
                <el-button
                  class="button"
                  slot="trigger"
                  size="small"
                  type="primary"
                  >选取文件</el-button
                >
                <el-button
                  class="button"
                  style="margin-left: 10px"
                  size="small"
                  type="success"
                  @click="fileUpload"
                  >上传到服务器</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，大小限制为500kb，总文件数不超过10
                </div>
              </el-upload>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="抵押资产信息">
        <el-row :gutter="24" class="card-row3">
          <el-col :span="8">
            <el-card class="file-card">
              <div id="announce_head">
                <img
                  src="../../assets/img/string.png"
                  alt=""
                  style="vertical-align: middle"
                />
                <span> <label>图片上传</label></span>
              </div>
              <el-divider></el-divider>
              <el-input
                type="text"
                v-model="fileParam"
                auto-complete="off"
                placeholder="在此输入文件参数名"
              >
              </el-input>
              <el-upload
                ref="upload"
                :action="fullUrl"
                :before-remove="fileBeforeRemove"
                multiple
                :limit="10"
                :on-exceed="fileHandleExceed"
                :file-list="fileList"
                :name="fileParam"
                list-type="picture"
                :auto-upload="false"
                :http-request="fileUploadRequest"
              >
                <el-button
                  class="button"
                  slot="trigger"
                  size="small"
                  type="primary"
                  >选取文件</el-button
                >
                <el-button
                  class="button"
                  style="margin-left: 10px"
                  size="small"
                  type="success"
                  @click="fileUpload"
                  >上传到服务器</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，大小限制为500kb，总文件数不超过10
                </div>
              </el-upload>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loanform: {
        amount: 0,
        asset: "",
        guarantee: "",
        repayTime: 0,
        rate: 0,
        filelist:[],
        fileParam: "",
      },
      show: true,
      loanformRules: {
        amount: [
          { required: true, message: "请输入借款数量", trigger: "blur" },
        ],
        asset: [
          { required: true, message: "请输入公司总资产", trigger: "blur" },
        ],
        repayTime: [
          { required: true, message: "请选择还款日期", trigger: "blur" },
        ],
        guarantee: [
          { required: true, message: "请输入担保人信息", trigger: "blur" },
        ],
        rate: [{ required: true, message: "请输入利率", trigger: "blur" }],
      },
    };
  },
  methods: {
    fileHandleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    fileBeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    fileUpload(){
      this.$refs.upload.submit();
    },
    indexOfUidInUploadFiles(uid){
      var index;
      for (index = 0; index < this.$refs.upload.uploadFiles.length; index++) {
        if (this.$refs.upload.uploadFiles[index].uid == uid){
          return index;
        }
      }
      return -1;
    },
    async fileUploadRequest(param){
      var self = this;
      var file = param.file;
      var isImage = (file.type.indexOf('image') != -1);
      var isExceed = (file.size > (500 * 1024));
      var index = this.indexOfUidInUploadFiles(file.uid);
      var isSuccess = true;
      console.log(index);
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
      self.$refs.upload.uploadFiles[index].percentage = 30;
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
        self.$refs.upload.uploadFiles[index].percentage = 0;
        return;
      });
      console.log(isSuccess);
      if (isSuccess){
        this.imgUrl = response.data.url;
        self.$refs.upload.uploadFiles[index].percentage = 100;
        return;
      }
      return;
      
    },
    async onSubmit() {
      this.$message("提交成功，等待审核!");
      let response = await this.$axios
        .post(this.$api.companycreateLoan, {
          amount: this.loanform.amount,
          asset: this.loanform.asset,
          guaratee: this.loanform.guaratee,
          repayTime: this.loanform.repayTime,
          rate: this.loanform.rate * 100,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
    },
    async onCancel() {
      this.$message({
        message: "放弃借款成功!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

