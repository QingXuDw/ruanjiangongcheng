<template>
    <div>
       adminInvestment_components
    </div>
</template>

<script>
export default {
  data() {
    return {
      //获取列表参数对象
      query: "",
      //当前的页码
      pageNumber: 1,
      //每页显示的条数
      pageSize: 5,
      //查询到的当前页账户列表
      companyList: [],
      //总条数,用于分页的显示
      totalCount: 0,
      //详情对话框显示状态
      detailDialogVisible: false,
    };
  },

  created() {},
  mounted() {},
  methods: {
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getCompanyList(0, this.query);
    },
    //监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.pageNumber = newPage;
      this.getSponsorList(0, this.query);
    },
    //输出status的文字描述
    statusToStr(status_int) {
      switch (status_int) {
        case 0:
          return "待审核";
          break;
        case 1:
          return "已通过";
          break;
        case 2:
          return "未通过";
          break;
        default:
          return "未定义";
          break;
      }
    },
    getCompanyList(status, query){},
    showDetailDialog(index) {},
    closeDetailDialog(index) {},
    approve(index) {},
    reject(index) {},
  },
};
</script>

<style scoped>

</style>