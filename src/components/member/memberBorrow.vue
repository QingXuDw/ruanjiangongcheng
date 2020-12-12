<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="企业名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="企业类别">
        <el-select v-model="form.region" placeholder="请选择你的企业类别">
          <el-option label="有限责任公司" value="shanghai" />
          <el-option label="股份有限公司" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="企业借款时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="预计还款时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date3" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="抵押资产类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="不动产抵押" name="type" />
          <el-checkbox label="动产抵押" name="type" />
          <el-checkbox label="权力抵押" name="type" />
          <el-checkbox label="财团抵押" name="type" />
          <el-checkbox label="共同抵押" name="type" />
          <el-checkbox label="最高额抵押" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="抵押资产具体说明">
        <el-input v-model="form.desc1" type="textarea" />
      </el-form-item>
      <el-form-item label="担保人信息描述">
        <el-input v-model="form.desc2" type="textarea" />
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="借款原因描述">
        <el-input v-model="form.desc3" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">放弃</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        date3: '',
        delivery: false,
        type: [],
        desc1: '',
        desc2: '',
        resource: '',
        desc3: ''
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
.line{
  text-align: center;
}
</style>

