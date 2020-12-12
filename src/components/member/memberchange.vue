<template>
  <div>
    <div>
       <el-row>
         <el-col :span="24"><div class="grid-content bg-purole-dark">修改个人信息</div></el-col>
       </el-row>
    </div>
    <div class="demo-input-suffix">
        <p>企业名称</p>
        <el-input placeholder="请输入内容" v-model="form.name">
        </el-input>
    </div>
    <div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">放弃</el-button>
      </el-form-item>
    </div>
  </div> 
</template>

<script>
export default {
    data(){
        return{
            form:{
                name:''
            }
        }
    },
    methods: {
    onSubmit() {
      this.$message('提交成功，等待审核!')
    },
    onCancel() {
      this.$message({
        message: '放弃借款成功!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.bg-purple-dark{
    background:#d3dce6;
}
.grid-content{
    border-radius: 4px;
    min-height: 36px;
}
.demo-input-suffix{
    background:#545454;
}
</style>