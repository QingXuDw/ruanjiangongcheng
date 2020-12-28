<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="graphic-card">
          <div id="announce_head">
            <img
              src="../../assets/img/string.png"
              alt=""
              style="vertical-align: middle"
            />
            <span> <label>借款统计</label></span>
          </div>
          <el-divider></el-divider>
          <div id="main" style="width: 500px; height: 500px ;margin: auto"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="graphic-card">
          <div id="announce_head">
            <img
              src="../../assets/img/string.png"
              alt=""
              style="vertical-align: middle"
            />
            <span> <label>资金统计</label></span>
          </div>
          <el-divider></el-divider>
          <div id="main2" style="width: 500px; height: 500px; margin: auto"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript" >
export default {
  data() {
    return {
      form: {},
    };
  },
  create() {},
  async mounted() {
    await this.GetNum();
    this.drawLine();
    this.drawline2();
    console.log("here");
  },
  methods: {
    drawLine: function () {
      var echarts = require("echarts");
      let main = echarts.init(document.getElementById("main"));
      main.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: [
            "申请借款数量",
            "正在借款数量",
            "逾期借款数量",
            "成功借款数量",
            "退回借款数量",
          ],
        },
        series: [
          {
            name: "借款数量",
            type: "pie",
            radius: ["38%", "52%"],
            avoidLabelOverlap: false,
            emphasis: {
              label: {
                show: true,
                fontWeight: "bold",
              },
            },
            data: [
              { value: this.form.ApplyLoanNum, name: "申请借款数量" },
              { value: this.form.OnLoanNum, name: "正在借款数量" },
              { value: this.form.OverDueLoanNum, name: "逾期借款数量" },
              { value: this.form.SuccessLoanNum, name: "成功借款数量" },
              { value: this.form.backLoanNum, name: "退回借款数量" },
              console.log(this.form.ApplyLoanNum),
            ],
          },
        ],
      });
    },
    drawline2: function () {
      var echarts = require("echarts");
      let main2 = echarts.init(document.getElementById("main2"));
      main2.setOption({
        xAxis: {
          type: "category",
          data: ["正在借款金额", "已逾期金额", "拥有理财金额", "成功借款金额"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              this.form.OnLoanAmount,
              this.form.OverDueLoanAmount,
              this.form.ProductAmount,
              this.form.SuccessLoanAmount,
            ],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      });
    },
    async GetNum() {
      let response = await this.$axios
        .get(this.$api.companyGetInfo, {
          params: {},
        })
        .catch((error) => {
          this.$message.error(error.msg);
          return;
        });
      this.form = response.data;
    },
  },
};
</script>

