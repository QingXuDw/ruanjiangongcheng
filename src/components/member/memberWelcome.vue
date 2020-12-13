<template>
  <div>
    <div id="main" style="width: 1000px; height: 1000px"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      option: {
        title: {
          text: "销售量",
        },
        tooltip: {},
        lengend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
  mounted() {
    this.drawLine();
    console.log("here");
  },
  methods: {
    drawLine: function () {
        var echarts = require('echarts');   
      let main = echarts.init(document.getElementById("main"));
      main.setOption(this.option);
    },
  },
  
};
</script>

