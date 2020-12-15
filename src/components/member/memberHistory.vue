    "amount": 0,
    "apply_time": "string",
    "approve_time": "string",
    "asset": "string",
    "guarantee": "string",
    "loan_id": 0,
    "rate": 0,
    "repay_time": "string",
    "suggestion": "string"
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="amount" label="借款数额" width="180">
      </el-table-column>
      <el-table-column prop="apply_time" label="请求时间" width="180">
      </el-table-column>
      <el-table-column prop="approve_time" label="接受时间"> </el-table-column>
      <el-table-column prop="asset" label="公司资产"> </el-table-column>
      <el-table-column prop="guarantee" label="担保人"> </el-table-column>
      <el-table-column prop="loan_id" label="借款编号"> </el-table-column>
      <el-table-column prop="rate" label="借款利率"> </el-table-column>
      <el-table-column prop="repay_time" label="还款时间"> </el-table-column>
      <el-table-column prop="suggestion" label="借款建议"> </el-table-column>
    </el-table>
    <el-pagination background layout="prev,pager,next" :total="1000">
    </el-pagination>
  </div>
</template>
<style scoped>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
<script>
export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  },
  data() {
    return {
      tableData: [
        {
          date: "",
          name: "",
          address: "",
        },
         {
          date: "",
          name: "",
          address: "",
        },
        {
          date: "",
          name: "",
          address: "",
        },
        {
          date: "",
          name: "",
          address: "",
        },
      ],
    };
  },
};
</script>>