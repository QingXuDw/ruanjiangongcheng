<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="输入关键字" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
export default {

  data() {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: '2018年',
        children: [{
          id: 4,
          label: '3月',
          children: [{
            id: 9,
            label: '10日：向平台借款50万元'
          }, {
            id: 10,
            label: '20日：向平台借款30万元'
          }]
        }]
      }, {
        id: 2,
        label: '2019年',
        children: [{
          id: 5,
          label: '5月',
          children:[{
            id:11,
            label:'3日，向平台借款20万元'
          }]
        }, {
          id: 6,
          label: '10月',
          children:[{
            id:12,
            label:'27日，向平台借款66万元'
          }]
        }]
      }, {
        id: 3,
        label: '2020年',
        children: [{
          id: 7,
          label: '7月',
          children:[{
            id:13,
            label:'14日，向平台借款22万元'
          }]
        }, {
          id: 8,
          label: '11月',
          children:[{
            id:14,
            label:'12日，向平台借款10万元'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

