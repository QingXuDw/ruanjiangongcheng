<template>
  <el-card style="margin: 50px; width: 90%">
    <div>
      <div>
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purole-dark">创建公司</div></el-col
          >
        </el-row>
      </div>
      <div class="demo-input-suffix">
        <p>公司地址</p>
        <el-input placeholder="请输入内容" v-model="form.address"> </el-input>
        <p>公司资产</p>
        <quill-editor
          ref="myTextEditor"
          v-model="form.asset"
          :options="editorOption"
          style="height: 400px"
        ></quill-editor>
        <p style="margin-top: 50px">公司名称</p>
        <el-input placeholder="请输入内容" v-model="form.companyName">
        </el-input>
        <p>开户银行</p>
        <el-input placeholder="请输入内容" v-model="form.depositBank">
        </el-input>
        <p>银行卡号</p>
        <el-input placeholder="请输入内容" v-model="form.depositBankCardNumber">
        </el-input>
        <p>公司简介</p>
        <quill-editor
          ref="myTextEditor"
          v-model="form.description"
          :options="editorOption"
          style="height: 400px"
        ></quill-editor>
        <p style="margin-top: 50px">公司邮箱</p>
        <el-input placeholder="请输入内容" v-model="form.email"> </el-input>
        <p>成员数量</p>
        <el-input
          type="number"
          placeholder="请输入内容"
          v-model="form.memberNumber"
        >
        </el-input>
        <P>公司电话</P>
        <el-input placeholder="请输入内容" v-model="form.phone"> </el-input>
        <p>公司网址</p>
        <el-input placeholder="请输入内容" v-model="form.website"> </el-input>
        <p>公司logo</p>
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
          <el-button class="button" slot="trigger" size="small" type="primary"
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
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel()">放弃</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        address: "",
        asset: "",
        companyName: "",
        depositBank: "",
        depositBankCardNumber: "",
        description: "",
        email: "",
        memberNumber: 0,
        phone: "",
        website: "",
      },
       fileList: [
          // {
          //   name: "",
          //   url: ""
          // }
        ],
        fileParam: "",
      editorOption: {
        placeholder: "编辑内容",
      },
    };
  },
  methods: {
    async onSubmit() {
      this.$message("提交成功，等待审核!");
      let response = await this.$axios
        .post(this.$api.companyCreateCompany, {
          address: this.form.address,
          companyName: this.form.companyName,
          asset: this.form.asset,
          depositBank: this.form.depositBank,
          depositBankCardNumber: this.form.depositBankCardNumber,
          description: this.form.description,
          email: this.form.email,
          memberNumber: this.form.memberNumber,
          phone: this.form.phone,
          website: this.form.website,
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
    },
    async onCancel() {
      this.$message({
        message: "取消创建成功!",
        type: "warning",
      });
    },
    fileHandleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    fileBeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    fileUpload() {
      this.$refs.upload.submit();
    },
    indexOfUidInUploadFiles(uid) {
      var index;
      for (index = 0; index < this.$refs.upload.uploadFiles.length; index++) {
        if (this.$refs.upload.uploadFiles[index].uid == uid) {
          return index;
        }
      }
      return -1;
    },
    async fileUploadRequest(param) {
      var self = this;
      var file = param.file;
      var isImage = file.type.indexOf("image") != -1;
      var isExceed = file.size > 500 * 1024;
      var index = this.indexOfUidInUploadFiles(file.uid);
      var isSuccess = true;
      console.log(index);
      console.log(param);
      console.log(self.$refs.upload.uploadFiles);
      if (!isImage) {
        this.$message.error(`文件 ${file.name} 并非图片文件，上传失败`);
        return;
      }
      if (isExceed) {
        this.$message.error(
          `文件 ${file.name} 大小为 ${
            file.size / 1024
          }kb，大于500kb限制，文件上传失败`
        );
        return;
      }
      var formData = new FormData();
      formData.append(param.filename, file);
      self.$refs.upload.uploadFiles[index].percentage = 30;
      var response = await this.$axios
        .post(param.action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(function (error) {
          isSuccess = false;
          self.$message.error(
            `出现网络问题 ${error.code}，文件 ${file.name} 上传失败，请重试`
          );
          self.$refs.upload.uploadFiles[index].percentage = 0;
          return;
        });
      console.log(isSuccess);
      if (isSuccess) {
        this.imgUrl = response.data.url;
        self.$refs.upload.uploadFiles[index].percentage = 100;
        return;
      }
      return;
    },
  },
};
</script>

<style scoped>
.bg-purple-dark {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>